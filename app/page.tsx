import { Suspense } from 'react'
import { getProblemsAndCategories } from '@/lib/problems'
import CategoryTabs from '@/components/category-tabs'
import DynamicSearch from '@/components/dynamic-search'
import DynamicSearchResults from '@/components/dynamic-search-results'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'First Principles Directory',
  description:
    'A curated directory of problems solved through first principles thinking',
}

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string; q?: string }
}) {
  const { problems, categories } = await getProblemsAndCategories()
  const category = searchParams?.category || 'All'
  const searchTerm = searchParams?.q || ''

  return (
    <div className="space-y-6">
      <p className="text-left text-muted-foreground">
        A curated directory of problems solved through first principles
        thinking.
      </p>
      <div className="rounded-md border bg-card text-card-foreground shadow">
        <div className="p-6 space-y-6">
          <DynamicSearch initialSearchTerm={searchTerm} />
          <CategoryTabs problems={problems} categories={categories} />
          <Suspense fallback={<div>Loading problems...</div>}>
            <DynamicSearchResults
              problems={problems}
              initialCategory={category}
              initialSearchTerm={searchTerm}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
