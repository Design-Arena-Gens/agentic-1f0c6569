import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logic Circuit Simulator',
  description: 'Interactive AND, OR, NOT gate simulator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
