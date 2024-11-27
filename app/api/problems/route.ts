import { NextResponse } from 'next/server'
import { getProblemsAndCategories } from '@/lib/problems'

export async function GET() {
  const data = await getProblemsAndCategories()
  return NextResponse.json(data)
}
