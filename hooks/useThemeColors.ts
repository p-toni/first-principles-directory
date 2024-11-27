import { useTheme } from 'next-themes'
import type { ThemeColors } from '../types/animation'
import { hslToRgb, interpolateColor } from '../utils/colorUtils'

export const useThemeColors = () => {
  const { theme } = useTheme()

  const getThemeColors = (): ThemeColors => {
    switch (theme) {
      case 'dark':
        return {
          bg: hslToRgb(180, 3, 7),
          stroke: [255, 255, 255],
        }
      case 'math':
        const deepBlue = hslToRgb(226, 100, 50)
        const gold = hslToRgb(45, 100, 50)
        return {
          bg: hslToRgb(225, 30, 12),
          stroke: (x: number, y: number) => {
            const factor = (Math.sin(x / 100 + y / 50) + 1) / 2
            return interpolateColor(deepBlue, gold, factor)
          },
        }
      default:
        return {
          bg: [255, 255, 255],
          stroke: [0, 0, 0],
        }
    }
  }

  return getThemeColors()
}
