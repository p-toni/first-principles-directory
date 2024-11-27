import fs from 'fs/promises'
import path from 'path'
import { Problem } from './problem-types'

function sanitizeMarkdown(text: string): string {
  return text
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/\[|\]/g, '\\$&') // Escape markdown brackets
}

export async function generateMarkdownPages(problems: Problem[]) {
  const publicDir = path.join(process.cwd(), 'public')
  const problemDir = path.join(publicDir, 'problem')

  // Ensure directories exist
  await fs.mkdir(problemDir, { recursive: true })

  // Generate problem pages
  await Promise.all(
    problems.map(async (problem) => {
      const markdown = `# ${sanitizeMarkdown(problem.title)}

> ${sanitizeMarkdown(problem.summary)}

## Categories
${problem.categories
  .map((category: string) => `- ${sanitizeMarkdown(category)}`)
  .join('\n')}

${problem.content}
`

      const filePath = path.join(problemDir, `${problem.slug}.md`)
      await fs.writeFile(filePath, markdown, 'utf-8')
    })
  )

  // Generate index page
  const indexMarkdown = `# First Principles Problems

${problems
  .map(
    (problem) =>
      `- [${sanitizeMarkdown(problem.title)}](/problem/${problem.slug})`
  )
  .join('\n')}
`

  await fs.writeFile(path.join(publicDir, 'index.md'), indexMarkdown, 'utf-8')
}
