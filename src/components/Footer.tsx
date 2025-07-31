import Link from 'next/link'
import { BookOpen, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Resources': [
      { name: 'Search Terms', href: '/' },
      { name: 'About', href: '/about' },
    ],
    'Learn': [
      { name: 'Understanding Racism', href: '/about' },
      { name: 'Historical Context', href: '/about' },
      { name: 'Impact & Effects', href: '/about' },
      { name: 'Educational Resources', href: '/about' },
    ],
    'Support': [
      { name: 'Contact Us', href: '/about' },
      { name: 'Feedback', href: '/about' },
      { name: 'Report Issues', href: '/about' },
      { name: 'Contribute', href: '/about' },
    ],
  }

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-responsive py-12">
        {/* 主要内容区域 */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo和描述 */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Racial Terms</span>
            </Link>
            <p className="text-neutral-400 mb-4">
              A comprehensive educational resource dedicated to understanding 
              racial discrimination terms and promoting inclusive communication.
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for education</span>
            </div>
          </div>

          {/* 链接组 */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* 版权信息 */}
            <div className="text-neutral-400 text-sm">
              © {currentYear} Racial Terms Educational Resource. All rights reserved.
            </div>

            {/* 法律链接 */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/about"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/about"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/about"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>

          {/* 免责声明 */}
          <div className="mt-6 text-xs text-neutral-500 text-center">
            This resource is for educational purposes only. The content is designed to promote 
            understanding and awareness of racial discrimination issues. We strive to present 
            information objectively and respectfully.
          </div>
        </div>
      </div>
    </footer>
  )
} 