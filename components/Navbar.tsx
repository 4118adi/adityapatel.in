'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-800">
      <h1 className="text-xl font-bold tracking-tight">Aditya Patel</h1>
      <div className="flex space-x-6 text-sm">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'transition hover:text-blue-400',
              pathname === href ? 'text-blue-500 font-semibold' : 'text-gray-400'
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
