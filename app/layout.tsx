import React from 'react'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/footer'
import { MathAnimation } from '@/components/math-animation'
import { MathDecorations } from '@/components/math-decorations'

export const metadata: Metadata = {
  title: '/first-principles directory',
  description:
    'A curated directory of problems solved through first principles thinking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col items-center relative">
            <div className="fixed bottom-0 right-0 z-0">
              <MathAnimation />
            </div>
            <MathDecorations />
            <div className="w-full max-w-[1000px] flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 relative z-10">
              <header className="w-full border-b">
                <div className="flex h-16 items-center justify-between">
                  <h1 className="text-2xl font-bold">
                    /first-principles directory
                  </h1>
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1 w-full">
                <div className="py-6 md:py-8">{children}</div>
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
