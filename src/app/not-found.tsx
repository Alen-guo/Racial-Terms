import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404图标 */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-primary-600">404</span>
          </div>
        </div>

        {/* 标题和描述 */}
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* 操作按钮 */}
        <div className="space-y-4">
          <Link
            href="/"
            className="btn-primary w-full inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <Link
            href="/terms"
            className="btn-outline w-full inline-flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Browse All Terms
          </Link>
        </div>

        {/* 帮助文本 */}
        <div className="mt-8 p-4 bg-neutral-100 rounded-lg">
          <p className="text-sm text-neutral-600">
            If you believe this is an error, please check the URL or try navigating 
            from our homepage.
          </p>
        </div>
      </div>
    </div>
  )
} 