import { readFile, readdir } from 'node:fs/promises'
import { join } from 'path'
import { Problem, ProblemMetadata } from './problem-types'

// Mark as server-side only
export const dynamic = 'force-dynamic'
export const revalidate = 3600 // revalidate every hour

const PROBLEMS_DIR = join(process.cwd(), 'problems')

async function parseProblemFile(
  content: string,
  slug: string
): Promise<Problem> {
  const lines = content.split('\n')
  let currentSection = ''
  let title = ''
  const metadata: Partial<ProblemMetadata> = {
    domain: '',
    complexity: '',
    solvingApproach: '',
    yearSolved: 0,
  }
  const categories: string[] = []
  const chronologicalFlow: string[] = []
  const contentSections: { [key: string]: string[] } = {}
  let currentContentSection = ''
  let summary = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith('# ')) {
      title = trimmedLine.slice(2).trim()
      continue
    }

    if (trimmedLine.startsWith('> ')) {
      summary = trimmedLine
      continue
    }

    if (trimmedLine.startsWith('## ')) {
      currentSection = trimmedLine.slice(3).toLowerCase().trim()
      if (
        !['metadata', 'categories', 'chronological flow'].includes(
          currentSection
        )
      ) {
        currentContentSection = trimmedLine
        contentSections[currentContentSection] = []
      }
      continue
    }

    switch (currentSection) {
      case 'metadata':
        if (trimmedLine.startsWith('- ')) {
          const [key, ...valueParts] = trimmedLine
            .slice(2)
            .split(':')
            .map((s) => s.trim())
          const value = valueParts.join(':').trim()
          const normalizedKey = key.toLowerCase().replace(/-/g, '')

          switch (normalizedKey) {
            case 'yearsolved':
              metadata.yearSolved = parseInt(value) || 0
              break
            case 'domain':
              metadata.domain = value
              break
            case 'complexity':
              metadata.complexity = value
              break
            case 'solvingapproach':
              metadata.solvingApproach = value
              break
          }
        }
        break

      case 'categories':
        if (trimmedLine.startsWith('- ')) {
          categories.push(trimmedLine.slice(2).trim())
        }
        break

      case 'chronological flow':
        chronologicalFlow.push(line)
        break

      default:
        if (
          currentContentSection &&
          !['metadata', 'categories'].includes(currentSection)
        ) {
          contentSections[currentContentSection].push(line)
        }
    }
  }

  if (!title) throw new Error(`No title found in problem file: ${slug}`)
  if (!summary) throw new Error(`No summary found in problem file: ${slug}`)

  // Format content as markdown
  const formattedContent = [
    `# ${title}`,
    '',
    summary,
    '',
    '## Chronological Flow',
    ...chronologicalFlow,
    '',
    ...Object.entries(contentSections).map(([section, lines]) => {
      return `${section}\n${lines.join('\n')}`
    }),
  ].join('\n')

  return {
    title,
    slug,
    summary: summary.slice(2), // Remove '> ' from summary
    categories,
    metadata: {
      domain: metadata.domain || '',
      complexity: metadata.complexity || '',
      solvingApproach: metadata.solvingApproach || '',
      yearSolved: metadata.yearSolved || 0,
    },
    chronologicalFlow,
    content: formattedContent,
  }
}

export async function getProblemsAndCategories(): Promise<{
  problems: Problem[]
  categories: string[]
}> {
  try {
    const files = await readdir(PROBLEMS_DIR)
    const problemFiles = files.filter((file) => file.endsWith('.txt'))

    const problemsPromises = problemFiles.map(async (file) => {
      const content = await readFile(join(PROBLEMS_DIR, file), 'utf-8')
      const slug = file.replace(/\.txt$/, '')
      return parseProblemFile(content, slug)
    })

    const problems = await Promise.all(problemsPromises)
    const categories = Array.from(
      new Set(problems.flatMap((p) => p.categories))
    ).sort()

    return { problems, categories }
  } catch {
    return { problems: [], categories: [] }
  }
}

export async function getProblem(slug: string): Promise<Problem | null> {
  try {
    const content = await readFile(join(PROBLEMS_DIR, `${slug}.txt`), 'utf-8')
    return await parseProblemFile(content, slug)
  } catch {
    return null
  }
}

export function filterProblems(
  problems: Problem[],
  category: string,
  query: string
): Problem[] {
  return problems.filter((problem) => {
    const matchesCategory = !category || problem.categories.includes(category)
    const matchesQuery =
      !query ||
      problem.title.toLowerCase().includes(query.toLowerCase()) ||
      problem.summary.toLowerCase().includes(query.toLowerCase()) ||
      problem.categories.some((cat) =>
        cat.toLowerCase().includes(query.toLowerCase())
      )

    return matchesCategory && matchesQuery
  })
}
