'use client'

import React from 'react'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type { P5CanvasInstance } from '@p5-wrapper/react'
import type { AnimationProps } from '../types/animation'
import { calculatePoint } from '../utils/mathUtils'
import { useThemeColors } from '../hooks/useThemeColors'

// Dynamically import ReactP5Wrapper with ssr disabled
const ReactP5WrapperComponent = dynamic(
  () => import('@p5-wrapper/react').then((mod) => mod.ReactP5Wrapper),
  {
    ssr: false,
  }
)

export const MathAnimation: React.FC<AnimationProps> = ({
  width = 400,
  height = 400,
}) => {
  const p5Instance = useRef<P5CanvasInstance>()
  const colors = useThemeColors()
  let t = 0

  useEffect(() => {
    if (p5Instance.current) {
      const [r, g, b] = colors.bg
      p5Instance.current.background(r, g, b)
    }
  }, [colors])

  const sketch = (p5: P5CanvasInstance) => {
    p5.setup = () => {
      p5Instance.current = p5
      p5.createCanvas(width, height)
      const [r, g, b] = colors.bg
      p5.background(r, g, b)
    }

    p5.draw = () => {
      const [r, g, b] = colors.bg
      const bgAlpha = 25
      const strokeAlpha = 96

      p5.background(r, g, b, bgAlpha)
      p5.strokeWeight(0.5)

      for (let y = 99; y < 300; y += 5) {
        for (let x = 99; x < 300; x++) {
          const mathFactor = 1
          const [px, py] = calculatePoint(p5, x, y, t, mathFactor)

          const strokeColor =
            typeof colors.stroke === 'function'
              ? colors.stroke(px, py)
              : colors.stroke

          p5.stroke(strokeColor[0], strokeColor[1], strokeColor[2], strokeAlpha)
          p5.point(px, py)
        }
      }

      t += p5.PI / 60
    }
  }

  return (
    <div className="relative w-full h-full">
      <ReactP5WrapperComponent sketch={sketch} />
    </div>
  )
}
