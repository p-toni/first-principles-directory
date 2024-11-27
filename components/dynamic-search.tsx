'use client'

import React, { useState, useCallback, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Problem } from '@/lib/problem-types'
import ProblemList from '@/components/problem-list'
import debounce from 'lodash.debounce'

interface DynamicSearchProps {
  initialSearchTerm: string
}

interface DynamicSearchResultsProps {
  problems: Problem[]
  initialCategory?: string
  initialSearchTerm?: string
}

const DynamicSearch = ({ initialSearchTerm }: DynamicSearchProps) => {
  const router = useRouter()
  const params = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [, startTransition] = useTransition()

  const handleSearch = useCallback(
    (term: string) => {
      const debouncedSearch = debounce(() => {
        const searchParams = new URLSearchParams(params?.toString() || '')
        if (term) {
          searchParams.set('q', term)
        } else {
          searchParams.delete('q')
        }
        startTransition(() => {
          router.push(`/?${searchParams.toString()}`)
        })
      }, 300)
      debouncedSearch()
    },
    [params, router]
  )

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search problems..."
        className="pl-9"
        value={searchTerm}
        onChange={(e) => {
          const newTerm = e.target.value
          setSearchTerm(newTerm)
          handleSearch(newTerm)
        }}
      />
    </div>
  )
}

const Results = ({ problems }: DynamicSearchResultsProps) => {
  return <ProblemList problems={problems} />
}

DynamicSearch.Results = Results

export default DynamicSearch
