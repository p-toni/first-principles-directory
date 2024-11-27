'use client'

import React, { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import type { Element } from 'react-markdown/lib/ast-to-react'

interface CodeProps {
  node?: Element
  inline?: boolean
  className?: string
  children: React.ReactNode
}

interface MarkdownRendererProps {
  content: string
}

const CodeBlock = memo(
  ({ inline, className, children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''

    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
)

CodeBlock.displayName = 'CodeBlock'

const h1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
)

const h2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
)

const h3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>
)

const ul = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
)

const ol = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
)

const li = ({ children }: { children: React.ReactNode }) => <li>{children}</li>

const p = ({
  children,
  ...props
}: {
  children: React.ReactNode
  [key: string]: unknown
}) => {
  // Check if the paragraph contains only an image
  const hasOnlyImage =
    React.Children.count(children) === 1 &&
    React.isValidElement(children) &&
    children.type === 'img'

  return hasOnlyImage ? (
    <div className="my-8">{children}</div>
  ) : (
    <p className="my-4 leading-7" {...props}>
      {children}
    </p>
  )
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
          h1,
          h2,
          h3,
          ul,
          ol,
          li,
          p,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
