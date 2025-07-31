'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, BookOpen } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Racial Terms - Home">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">
              Racial Terms
            </span>
          </Link>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
                aria-label={`Navigate to ${item.name} page`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 搜索按钮 */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/"
              className="btn-primary"
            >
              Search Terms
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 搜索栏 */}
        {isSearchOpen && (
          <div className="py-4 border-t border-neutral-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search terms..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Link
                  href="/"
                  className="btn-primary w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Search Terms
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 