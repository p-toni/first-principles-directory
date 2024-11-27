export type RGB = [number, number, number]

export type ThemeColors = {
  bg: RGB
  stroke: RGB | ((x: number, y: number) => RGB)
}

export interface AnimationProps {
  width?: number
  height?: number
  theme?: 'light' | 'dark' | 'math'
}

export type AnimationType = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'

export type AnimationDirection =
  | 'normal'
  | 'reverse'
  | 'alternate'
  | 'alternate-reverse'

export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both'

export type AnimationIterationCount = number | 'infinite'

export type AnimationTimingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step-start'
  | 'step-end'
