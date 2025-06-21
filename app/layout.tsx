import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Aditya Patel',
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
