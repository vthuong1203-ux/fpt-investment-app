'use client'

import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Cơ hội đầu tư', href: '/co-hoi-dau-tu' },
    { label: 'Tin tức', href: '/tin-tuc' },
    { label: 'Khoá học', href: '/khoa-hoc' },
    { label: 'Chatbot AI', href: '/chatbot' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-accent to-secondary p-0.5">
              <div className="w-full h-full bg-white dark:bg-card rounded-md flex items-center justify-center">
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">FPT</span>
              </div>
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:inline">FPT Investment</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                prefetch
                className="text-sm font-medium text-foreground/70 transition-colors duration-200 ease-out hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:block flex-shrink-0">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
            >
              Mở tài khoản
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                prefetch
                onClick={() => setIsOpen(false)}
                className="block py-2 text-sm font-medium text-foreground/70 transition-colors duration-200 ease-out hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
            >
              Mở tài khoản
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
