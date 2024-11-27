'use client'

import React from 'react'
import { useTheme } from 'next-themes'

const MATH_SYMBOLS = ['∑', '∫', '∂', '∇', 'ℝ', '∞', '∏', 'ℕ', '∀', '∃']

export function MathDecorations() {
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || theme !== 'math') return null

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <div className="absolute inset-0 math-pattern" />
      {MATH_SYMBOLS.map((symbol, index) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const rotation = Math.random() * 360
        const size = Math.random() * 1.5 + 0.8 // Slightly reduced size range

        return (
          <div
            key={index}
            className="math-accent absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `rotate(${rotation}deg) scale(${size})`,
              fontSize: `${size * 1.5}rem`, // Slightly reduced font size
            }}
          >
            {symbol}
          </div>
        )
      })}
    </div>
  )
}
