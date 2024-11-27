'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Problem } from '@/lib/problem-types'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExternalLink } from 'lucide-react'

const ITEMS_PER_PAGE = 10

export default function ProblemList({ problems }: { problems: Problem[] }) {
  const [displayedProblems, setDisplayedProblems] = useState<Problem[]>([])
  const [page, setPage] = useState(1)
  const { ref, inView } = useInView()

  useEffect(() => {
    setDisplayedProblems(problems.slice(0, page * ITEMS_PER_PAGE))
  }, [problems, page])

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [inView])

  if (problems.length === 0) {
    return (
      <Alert>
        <AlertTitle>No results found</AlertTitle>
        <AlertDescription>
          {`Can't find any problems matching your search criteria.`}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <ul className="space-y-4">
        {displayedProblems.map((problem) => (
          <li
            key={problem.slug}
            className="flex flex-col border-b pb-4 last:border-b-0 last:pb-0 relative"
          >
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <Link
                  href={`/problem/${problem.slug}`}
                  className="text-xl font-bold hover:underline"
                >
                  {problem.title}
                </Link>
              </div>
              <p className="mt-2 text-[0.9rem] text-muted-foreground/80">
                {problem.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {problem.categories.map((category, index) => (
                  <span
                    key={`${problem.slug}-${category}-${index}`}
                    className="text-xs font-medium bg-secondary/50 text-secondary-foreground px-2.5 py-1 rounded-md"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs text-muted-foreground/70 flex justify-between items-center">
                <span>
                  {problem.metadata.domain &&
                    `domain: ${problem.metadata.domain}`}
                  {problem.metadata.complexity &&
                    ` | complexity: ${problem.metadata.complexity}`}
                  {problem.metadata.yearSolved > 0 &&
                    ` | year solved: ${problem.metadata.yearSolved}`}
                </span>
                <a
                  href={`https://raw.githubusercontent.com/p-toni/first-principles-directory/main/problems/${problem.slug}.txt`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground/60 hover:text-foreground ml-4"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {problem.slug}.txt
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {displayedProblems.length < problems.length && (
        <div ref={ref} className="py-4 text-center text-muted-foreground">
          Loading more...
        </div>
      )}
    </>
  )
}
