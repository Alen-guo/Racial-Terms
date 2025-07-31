import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, BookOpen, Users, AlertTriangle } from 'lucide-react'
import termsData from '@/data/terms.json'
import { Term } from '@/types'

interface TermPageProps {
  params: {
    slug: string
  }
}

// 生成动态元数据
export async function generateMetadata({ params }: TermPageProps): Promise<Metadata> {
  const term = (termsData as Term[]).find(t => t.slug === params.slug)
  
  if (!term) {
    return {
      title: 'Term Not Found',
    }
  }

  return {
    title: `${term.term} - Racial Discrimination Terms`,
    description: term.definition,
    keywords: [...term.tags, 'racial discrimination', 'education'],
    openGraph: {
      title: `${term.term} - Racial Discrimination Terms`,
      description: term.definition,
      type: 'article',
    },
  }
}

// 生成静态路径
export async function generateStaticParams() {
  const terms = termsData as Term[]
  return terms.map((term) => ({
    slug: term.slug,
  }))
}

export default function TermPage({ params }: TermPageProps) {
  const term = (termsData as Term[]).find(t => t.slug === params.slug)
  
  if (!term) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 面包屑导航 */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container-responsive py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-neutral-500 hover:text-neutral-700">
              Home
            </Link>
            <span className="text-neutral-400">/</span>
            <Link href="/terms" className="text-neutral-500 hover:text-neutral-700">
              Terms
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-900 font-medium">{term.term}</span>
          </nav>
        </div>
      </section>

      {/* 词汇头部信息 */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container-responsive py-8">
          <div className="max-w-4xl">
            <Link 
              href="/terms" 
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Terms
            </Link>
            
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
                  {term.term}
                </h1>
                {term.pronunciation && (
                  <p className="text-lg text-neutral-600 font-mono">
                    {term.pronunciation}
                  </p>
                )}
              </div>
              <span className={`tag tag-${term.category} text-sm`}>
                {term.category}
              </span>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {term.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Updated: {new Date(term.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>Context: {term.usageContext.join(', ')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Period: {term.historicalPeriod}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主要内容 */}
      <section className="py-12">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* 主要内容区域 */}
              <div className="lg:col-span-2 space-y-8">
                {/* 定义 */}
                <div className="card">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Definition</h2>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    {term.definition}
                  </p>
                </div>

                {/* 历史背景 */}
                <div className="card">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Historical Background</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {term.history}
                  </p>
                </div>

                {/* 使用场景 */}
                <div className="card">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Usage Context</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {term.context}
                  </p>
                </div>

                {/* 社会影响 */}
                <div className="card">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Social Impact</h2>
                  <p className="text-neutral-700 leading-relaxed">
                    {term.impact}
                  </p>
                </div>

                {/* 示例 */}
                {term.examples && term.examples.length > 0 && (
                  <div className="card">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">Examples</h2>
                    <ul className="space-y-3">
                      {term.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-neutral-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 教育笔记 */}
                {term.educationalNotes && (
                  <div className="card bg-blue-50 border-blue-200">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-4">Educational Notes</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      {term.educationalNotes}
                    </p>
                  </div>
                )}
              </div>

              {/* 侧边栏 */}
              <div className="space-y-6">
                {/* 替代表达 */}
                {term.alternatives && term.alternatives.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Alternative Expressions</h3>
                    <ul className="space-y-2">
                      {term.alternatives.map((alternative, index) => (
                        <li key={index} className="text-neutral-700">
                          • {alternative}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 相关词汇 */}
                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">Related Terms</h3>
                    <ul className="space-y-2">
                      {term.relatedTerms.map((relatedTerm) => (
                        <li key={relatedTerm}>
                          <Link
                            href={`/terms/${relatedTerm}`}
                            className="text-primary-600 hover:text-primary-700 hover:underline"
                          >
                            {relatedTerm}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 免责声明 */}
                <div className="card bg-yellow-50 border-yellow-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-900 mb-2">Educational Purpose</h3>
                      <p className="text-sm text-neutral-700">
                        This content is provided for educational purposes only to promote 
                        understanding and awareness of racial discrimination issues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 导航到其他词汇 */}
      <section className="py-12 bg-white border-t border-neutral-200">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Explore More Terms</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/terms" className="btn-primary">
                Browse All Terms
              </Link>
              <Link href="/categories" className="btn-outline">
                View by Category
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 