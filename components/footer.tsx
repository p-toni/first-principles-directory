import * as React from 'react'

export function Footer() {
  const links = [
    { href: 'https://v0.dev', text: 'v0.dev' },
    { href: 'https://ui.shadcn.com', text: 'shadcn/ui' },
    { href: 'https://x.com/yuruyurau', text: 'by @yuruyurau' },
  ]

  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="flex flex-col items-center gap-4 md:h-24 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{' '}
            <a
              href="https://x.com/ape_toni"
              className="font-medium underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ape_toni
            </a>{' '}
            with{' '}
            {links.map((link, index) => (
              <React.Fragment key={link.href}>
                <a
                  href={link.href}
                  className="font-medium underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text}
                </a>
                {index < links.length - 1 && ', '}
                {index === links.length - 2 && 'art '}
              </React.Fragment>
            ))}
            .
          </p>
        </div>
        <div className="flex items-center">
          <a
            href="https://github.com/p-toni/fp-website"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contribute on GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
