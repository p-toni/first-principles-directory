import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getProblem } from '@/lib/problems'
import { ArrowLeft } from 'lucide-react'
import MarkdownRenderer from '@/components/markdown-renderer'

export default async function ProblemPage({
  params,
}: {
  params: { slug: string }
}) {
  const problem = await getProblem(params.slug)

  if (!problem) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center mb-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to problems
      </Link>
      <h1 className="text-4xl font-bold mb-4">{problem.title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {problem.categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none">
        <MarkdownRenderer content={problem.content} />
      </div>
    </div>
  )
}
