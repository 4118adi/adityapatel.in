'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-800">
      <div className="text-lg font-bold">Aditya Patel</div>

      <div className="bg-gray-900 border border-gray-700 rounded-full px-6 py-2 flex gap-4 text-sm">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'transition hover:text-blue-400',
              pathname === href ? 'text-blue-500 font-medium' : 'text-gray-300'
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      <div>
        {/* Dark mode toggle will be slotted here */}
        <ThemeToggle />
      </div>
    </nav>
  )
}
