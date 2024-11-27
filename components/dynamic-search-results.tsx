'use client'

import { Problem, filterProblems } from '@/lib/problem-types'
import ProblemList from '@/components/problem-list'

interface DynamicSearchResultsProps {
  problems: Problem[]
  initialCategory: string
  initialSearchTerm: string
}

export default function DynamicSearchResults({
  problems,
  initialCategory,
  initialSearchTerm,
}: DynamicSearchResultsProps) {
  const category = initialCategory === 'All' ? undefined : initialCategory
  const searchTerm = initialSearchTerm || undefined

  const filteredProblems = filterProblems(problems, category, searchTerm)

  return <ProblemList problems={filteredProblems} />
}
