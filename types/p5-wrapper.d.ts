// Suppress specific TypeScript warning in @p5-wrapper/react
declare module '@p5-wrapper/react/dist/component/react.js' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function compareObjects(a: any, b: any): boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any
  export = content
}

// Add missing type declarations for @p5-wrapper/react
declare module '@p5-wrapper/react' {
  import React from 'react'
  import p5 from 'p5'

  export interface P5CanvasInstance extends p5 {}

  export interface ReactP5WrapperProps {
    sketch: (p5: P5CanvasInstance) => void
    width?: number
    height?: number
  }

  export const ReactP5Wrapper: React.ComponentType<ReactP5WrapperProps>
}
