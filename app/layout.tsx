import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Aditya Patel | Backend & Cloud Developer',
  description: 'Minimal portfolio showcasing backend and cloud work',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
