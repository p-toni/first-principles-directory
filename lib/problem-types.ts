// Types and utilities that can be used on both client and server
export interface ProblemMetadata {
  domain: string
  complexity: string
  solvingApproach: string
  yearSolved: number
}

export interface Problem {
  title: string
  slug: string
  summary: string
  categories: string[]
  metadata: ProblemMetadata
  chronologicalFlow: string[]
  content: string
}

export function filterProblems(
  problems: Problem[],
  category?: string,
  searchTerm?: string
): Problem[] {
  return problems.filter((problem) => {
    const matchesCategory = !category || problem.categories.includes(category)
    const matchesSearch =
      !searchTerm ||
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })
}
