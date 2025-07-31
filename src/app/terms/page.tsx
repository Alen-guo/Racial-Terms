import { Metadata } from 'next'
import TermCard from '@/components/TermCard'
import termsData from '@/data/terms.json'
import { Term, SeverityLevel, UsageContext, HistoricalPeriod } from '@/types'

export const metadata: Metadata = {
  title: 'All Terms - Racial Discrimination Terms',
  description: 'Browse and search through our comprehensive collection of racial discrimination terms. Learn about their history, context, and impact.',
  keywords: ['racial terms', 'discrimination', 'education', 'search', 'browse'],
}

// 分类数据
const categories = [
  { id: 'severe', name: 'Severe', description: 'Highly offensive and harmful terms', count: 0, color: 'red' },
  { id: 'moderate', name: 'Moderate', description: 'Terms with moderate impact', count: 0, color: 'yellow' },
  { id: 'mild', name: 'Mild', description: 'Terms with subtle or historical context', count: 0, color: 'green' },
]

const usageContexts = [
  { id: 'everyday', name: 'Everyday Language', count: 0 },
  { id: 'media', name: 'Media & Entertainment', count: 0 },
  { id: 'workplace', name: 'Workplace', count: 0 },
  { id: 'education', name: 'Education', count: 0 },
  { id: 'historical', name: 'Historical Context', count: 0 },
  { id: 'online', name: 'Online & Social Media', count: 0 },
]

const historicalPeriods = [
  { id: 'ancient', name: 'Ancient', count: 0 },
  { id: 'medieval', name: 'Medieval', count: 0 },
  { id: 'colonial', name: 'Colonial Era', count: 0 },
  { id: 'modern', name: 'Modern Era', count: 0 },
  { id: 'contemporary', name: 'Contemporary', count: 0 },
]

// 计算统计数据
const allTerms: Term[] = termsData as Term[]

// 更新分类计数
categories.forEach(category => {
  category.count = allTerms.filter(term => term.category === category.id).length
})

usageContexts.forEach(context => {
  context.count = allTerms.filter(term => term.usageContext.includes(context.id as UsageContext)).length
})

historicalPeriods.forEach(period => {
  period.count = allTerms.filter(term => term.historicalPeriod === period.id).length
})

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 页面头部 */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container-responsive py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Browse All Terms
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Explore our comprehensive collection of {allTerms.length} racial discrimination terms. 
              Each term includes detailed explanations, historical context, and real-world impact.
            </p>
            
            {/* 统计信息 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{allTerms.length}</div>
                <div className="text-sm text-neutral-600">Total Terms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">{categories.length}</div>
                <div className="text-sm text-neutral-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{usageContexts.length}</div>
                <div className="text-sm text-neutral-600">Usage Contexts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{historicalPeriods.length}</div>
                <div className="text-sm text-neutral-600">Historical Periods</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 筛选和搜索区域 */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container-responsive">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 搜索框 */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search terms by name, definition, or tags..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* 筛选按钮 */}
            <div className="flex gap-2">
              <button className="btn-outline">
                Filter by Category
              </button>
              <button className="btn-outline">
                Filter by Context
              </button>
              <button className="btn-outline">
                Filter by Period
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 分类概览 */}
      <section className="py-8 bg-white">
        <div className="container-responsive">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-neutral-900">{category.name}</h3>
                  <span className={`tag tag-${category.id}`}>
                    {category.count}
                  </span>
                </div>
                <p className="text-neutral-600 text-sm mb-4">{category.description}</p>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View {category.name} Terms →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 词汇列表 */}
      <section className="py-12">
        <div className="container-responsive">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              All Terms ({allTerms.length})
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600">Sort by:</span>
              <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="date">Date Added</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTerms.map((term) => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>

          {/* 分页 */}
          <div className="flex items-center justify-center mt-12">
            <nav className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-primary-600 text-white rounded-lg">
                1
              </button>
              <button className="px-3 py-2 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50">
                2
              </button>
              <button className="px-3 py-2 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50">
                3
              </button>
              <button className="px-3 py-2 text-sm border border-neutral-300 rounded-lg hover:bg-neutral-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </section>
    </div>
  )
} 