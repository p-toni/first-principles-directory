import { NextResponse } from 'next/server'
import { getProblemsAndCategories, filterProblems } from '@/lib/problems'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  try {
    const { problems } = await getProblemsAndCategories()
    const filteredProblems = filterProblems(problems, category, query)
    return NextResponse.json({ problems: filteredProblems })
  } catch {
    return NextResponse.json({ problems: [] }, { status: 500 })
  }
}
