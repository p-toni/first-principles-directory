/// <reference types="@types/node" />

'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { InfinityIcon } from 'lucide-react'

interface MathStep {
  symbol: string
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  completed: boolean
}

const CORNER_SYMBOLS = [
  { symbol: '∇', position: 'top-left' },
  { symbol: '∮', position: 'top-right' },
  { symbol: '∑', position: 'bottom-left' },
  { symbol: '√', position: 'bottom-right' },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [position, setPosition] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)
  const [mathSteps, setMathSteps] = React.useState<MathStep[]>([])
  const [showEasterEgg, setShowEasterEgg] = React.useState(false)
  const lastSwitchTime = React.useRef<number>(0)
  const stepTimeouts = React.useRef<ReturnType<typeof setTimeout>[]>([])

  // HSL to RGB conversion
  const hslToRgb = (h: number, s: number, l: number): string => {
    s /= 100
    l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return `rgb(${Math.round(255 * f(0))}, ${Math.round(
      255 * f(8)
    )}, ${Math.round(255 * f(4))})`
  }

  // Memoize the math color to prevent unnecessary recalculations
  const mathColor = React.useMemo(() => hslToRgb(226, 100, 50), [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    // Initialize position based on current theme
    switch (theme) {
      case 'light':
        setPosition(0)
        break
      case 'dark':
        setPosition(1)
        break
      case 'math':
        setPosition(2)
        break
      default:
        setPosition(0)
    }
  }, [theme])

  // Cleanup timeouts on unmount
  React.useEffect(() => {
    return () => {
      stepTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  const addMathStep = (stepIndex: number) => {
    const { symbol, position } = CORNER_SYMBOLS[stepIndex]
    setMathSteps((prev) => [...prev, { symbol, position, completed: false }])
  }

  const clearMathSteps = () => {
    stepTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    stepTimeouts.current = []
    setMathSteps([])
    setShowEasterEgg(false)
  }

  const handleThemeChange = () => {
    const currentTime = Date.now()
    const timeSinceLastSwitch = currentTime - lastSwitchTime.current
    lastSwitchTime.current = currentTime

    // If we're in math mode, go back to light mode
    if (theme === 'math') {
      setPosition(0)
      setTheme('light')
      clearMathSteps()
      return
    }

    // Regular theme switching between light and dark
    const newPosition = position === 0 ? 1 : 0
    setPosition(newPosition)
    const themes = ['light', 'dark']
    setTheme(themes[newPosition])

    // Handle math progression
    if (timeSinceLastSwitch < 1000) {
      // If switch happened within 1 second
      const currentSteps = mathSteps.length

      if (currentSteps < 4) {
        addMathStep(currentSteps)

        // Clear any existing timeouts
        stepTimeouts.current.forEach((timeout) => clearTimeout(timeout))
        stepTimeouts.current = []

        if (currentSteps === 3) {
          // Show easter egg immediately when all symbols are collected
          setShowEasterEgg(true)
          // Set a single timeout to clear everything
          const timeout = setTimeout(clearMathSteps, 5000)
          stepTimeouts.current.push(timeout)
        } else {
          // Set timeout for clearing if not completed
          const timeout = setTimeout(clearMathSteps, 3000)
          stepTimeouts.current.push(timeout)
        }
      }
    } else if (mathSteps.length > 0) {
      clearMathSteps()
    }
  }

  const activateMathTheme = () => {
    setTheme('math')
    setPosition(2)
    clearMathSteps()
    // Clear any existing timeouts when activating math theme
    stepTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    stepTimeouts.current = []
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const getCornerStyle = (position: MathStep['position']) => {
    const base = 'fixed pointer-events-none animate-fade-in math-symbols'
    switch (position) {
      case 'top-left':
        return `${base} top-4 left-4`
      case 'top-right':
        return `${base} top-4 right-4`
      case 'bottom-left':
        return `${base} bottom-4 left-4`
      case 'bottom-right':
        return `${base} bottom-4 right-4`
    }
  }

  return (
    <div className="relative flex items-center gap-4">
      {showEasterEgg && (
        <button
          onClick={activateMathTheme}
          className="flex items-center justify-center w-8 h-8 rounded-full opacity-50 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
          title="Calculate infinity"
        >
          <InfinityIcon
            size={24}
            strokeWidth={1.5}
            style={{ color: mathColor }}
          />
        </button>
      )}
      <div className="flex items-center gap-2">
        <Switch
          id="theme-switch"
          checked={position > 0}
          onCheckedChange={handleThemeChange}
        />
        <Label htmlFor="theme-switch" className="select-none font-mono">
          {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'ℝ'}
        </Label>
      </div>
      {/* Mathematical symbols in corners */}
      {mathSteps.map((step, index) => (
        <div
          key={index}
          className={getCornerStyle(step.position)}
          style={{ color: mathColor }}
        >
          {step.symbol}
        </div>
      ))}
    </div>
  )
}
