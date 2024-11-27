import type P5 from 'p5'

export const magnitude = (x: number, y: number): number => {
  return Math.sqrt(x * x + y * y)
}

export const calculatePoint = (
  p5: P5,
  x: number,
  y: number,
  t: number,
  mathFactor = 1
): [number, number] => {
  const k = x / 8 - 25
  const e = y / 8 - 25
  const d = Math.pow(magnitude(k, e), 2) / 99

  const q = x / 3 + ((k * 0.5) / p5.cos(y * 5 * mathFactor)) * p5.sin(d * d - t)
  const c = d / 2 - t / (mathFactor === 1.5 ? 12 : 8)

  const xPos = q * p5.sin(c) + e * p5.sin(d + k - t) + 200
  const yPos = (q + y / 8 + d * 9) * p5.cos(c) + 200

  return [xPos, yPos]
}
