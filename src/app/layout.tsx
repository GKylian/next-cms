import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next-cms',
  description: 'Default Next CMS website. Edit metadata in the page.tsx files or the block editor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {children}
    </html>
  )
}
