'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Problem } from '@/lib/problem-types'
import { cn } from '@/lib/utils'

interface CategoryTabsProps {
  problems: Problem[]
  categories: string[]
}

function getCategoryFrequency(
  problems: Problem[],
  categories: string[]
): Map<string, number> {
  const frequency = new Map<string, number>()
  categories.forEach((category) => {
    const count = problems.filter((problem) =>
      problem.categories.includes(category)
    ).length
    frequency.set(category, count)
  })
  return frequency
}

function getTopCategories(
  problems: Problem[],
  categories: string[],
  count: number = 5
): string[] {
  const frequency = getCategoryFrequency(problems, categories)
  return [
    'All',
    ...Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([category]) => category),
  ]
}

export default function CategoryTabs({
  problems,
  categories,
}: CategoryTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams?.get('category') || 'All'

  const topCategories = getTopCategories(problems, categories)

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : ''
    )
    if (category === 'All') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {topCategories.map((category) => (
        <button
          key={category}
          className={cn(
            'px-3 py-1 text-sm rounded-full transition-colors duration-200',
            currentCategory === category
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
