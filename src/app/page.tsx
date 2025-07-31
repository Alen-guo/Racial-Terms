'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Users, Shield, ArrowRight, Star, Filter, X } from 'lucide-react'
import termsData from '@/data/terms.json'
import { Term, SeverityLevel, UsageContext, HistoricalPeriod } from '@/types'
import TermsTable from '@/components/TermsTable'

// 获取所有词汇数据
const allTerms: Term[] = termsData as Term[]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedContext, setSelectedContext] = useState<string>('all')
  const [showAllTerms, setShowAllTerms] = useState(false)

  // 搜索和筛选逻辑
  const filteredTerms = useMemo(() => {
    let filtered = allTerms

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory)
    }

    // 按使用场景筛选
    if (selectedContext !== 'all') {
      const contextMap: Record<string, UsageContext> = {
        'everyday': UsageContext.EVERYDAY,
        'media': UsageContext.MEDIA,
        'workplace': UsageContext.WORKPLACE,
        'education': UsageContext.EDUCATION,
        'online': UsageContext.ONLINE,
        'historical': UsageContext.HISTORICAL
      }
      const context = contextMap[selectedContext]
      if (context) {
        filtered = filtered.filter(term => term.usageContext.includes(context))
      }
    }

    // 按搜索词筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        term.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedContext])

  // 显示词汇（搜索时显示所有结果，否则显示前6个）
  const displayTerms = showAllTerms || searchQuery || selectedCategory !== 'all' || selectedContext !== 'all' 
    ? filteredTerms 
    : filteredTerms.slice(0, 6)

  // 分类选项
  const categories = [
    { id: 'all', name: 'All Categories', count: allTerms.length },
    { id: 'severe', name: 'Severe', count: allTerms.filter(t => t.category === 'severe').length },
    { id: 'moderate', name: 'Moderate', count: allTerms.filter(t => t.category === 'moderate').length },
    { id: 'mild', name: 'Mild', count: allTerms.filter(t => t.category === 'mild').length },
  ]

  // 使用场景选项
  const contexts = [
    { id: 'all', name: 'All Contexts', count: allTerms.length },
    { id: 'everyday', name: 'Everyday Language', count: allTerms.filter(t => t.usageContext.includes(UsageContext.EVERYDAY)).length },
    { id: 'media', name: 'Media & Entertainment', count: allTerms.filter(t => t.usageContext.includes(UsageContext.MEDIA)).length },
    { id: 'workplace', name: 'Workplace', count: allTerms.filter(t => t.usageContext.includes(UsageContext.WORKPLACE)).length },
    { id: 'education', name: 'Education', count: allTerms.filter(t => t.usageContext.includes(UsageContext.EDUCATION)).length },
    { id: 'online', name: 'Online & Social Media', count: allTerms.filter(t => t.usageContext.includes(UsageContext.ONLINE)).length },
  ]

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedContext('all')
    setShowAllTerms(false)
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedContext !== 'all'

  return (
    <div className="min-h-screen">
      {/* 英雄区域 */}
      <section className="gradient-bg py-20 px-4">
        <div className="container-responsive text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Understanding Racial Discrimination Terms
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 mb-6 max-w-3xl mx-auto">
            Search and explore 132+ racial discrimination terms with comprehensive explanations, 
            historical context, and educational insights.
          </p>
          
          {/* 教育性文字 */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Why This Matters
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                Racial discrimination is not just harmful—it reveals a narrow-minded perspective that limits our understanding of the world. 
                When we discriminate based on race, we show ourselves to be ignorant and lacking in basic human decency.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                True wisdom comes from embracing diversity with an open heart and mind. 
                We should approach every person and situation with compassion, understanding, and respect for our shared humanity.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                This resource helps us recognize and avoid harmful language, promoting a more inclusive and respectful world 
                where everyone can feel valued and understood.
              </p>
            </div>
            
            {/* 醒目的温暖文字 */}
            <div className="text-center mt-6">
              <p className="text-2xl md:text-3xl font-semibold text-gradient bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                "May all beings and things be treated with the world's gentle embrace"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 词汇表格区域 - 主要展示内容 */}
      <TermsTable />

      {/* 词汇展示区域 - 详细卡片展示 */}
      <section className="py-16 px-4 bg-white">
        <div className="container-responsive">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              {hasActiveFilters ? 'Search Results' : 'Featured Terms'}
            </h2>
            {!hasActiveFilters && (
              <button
                onClick={() => setShowAllTerms(!showAllTerms)}
                className="btn-outline inline-flex items-center gap-2"
              >
                {showAllTerms ? 'Show Less' : 'View All Terms'}
                <ArrowRight className={`w-4 h-4 transition-transform ${showAllTerms ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          {/* 搜索和筛选 */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {/* 搜索框 */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search terms by name, definition, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* 分类筛选 */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* 使用场景筛选 */}
              <div className="relative">
                <select
                  value={selectedContext}
                  onChange={(e) => setSelectedContext(e.target.value)}
                  className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {contexts.map(context => (
                    <option key={context.id} value={context.id}>
                      {context.name} ({context.count})
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* 清除筛选 */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* 搜索结果统计 */}
          {hasActiveFilters && (
            <div className="text-center mb-8">
              <div className="text-neutral-600">
                Found {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}

          {/* 词汇网格 */}
          {displayTerms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTerms.map((term) => (
                <div key={term.id} className="card card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-neutral-900">{term.term}</h3>
                    <span className={`tag tag-${term.category}`}>
                      {term.category}
                    </span>
                  </div>
                  
                  {term.pronunciation && (
                    <p className="text-sm text-neutral-500 font-mono mb-2">
                      {term.pronunciation}
                    </p>
                  )}
                  
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {term.definition}
                  </p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {term.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {term.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700">
                        +{term.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* 使用场景 */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-neutral-500">
                    <span>Context:</span>
                    <span className="font-medium">{term.usageContext[0]}</span>
                  </div>

                  {/* 历史背景预览 */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-1">Historical Background</h4>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {term.history}
                    </p>
                  </div>

                  {/* 社会影响预览 */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-1">Social Impact</h4>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {term.impact}
                    </p>
                  </div>

                  {/* 替代表达 */}
                  {term.alternatives && term.alternatives.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-neutral-900 mb-1">Alternative Expressions</h4>
                      <ul className="text-sm text-neutral-600">
                        {term.alternatives.slice(0, 2).map((alternative, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="w-1 h-1 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{alternative}</span>
                          </li>
                        ))}
                        {term.alternatives.length > 2 && (
                          <li className="text-xs text-neutral-500">
                            +{term.alternatives.length - 2} more alternatives
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                      <Star className="w-4 h-4" />
                      <span>{term.historicalPeriod}</span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Updated: {new Date(term.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">No terms found</h3>
              <p className="text-neutral-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* 加载更多按钮 */}
          {!hasActiveFilters && !showAllTerms && filteredTerms.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllTerms(true)}
                className="btn-outline inline-flex items-center gap-2"
              >
                Load More Terms ({filteredTerms.length - 6} remaining)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 统计信息区域 */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container-responsive">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">132+</div>
              <div className="text-neutral-600">Terms Explained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-600 mb-2">23</div>
              <div className="text-neutral-600">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">19</div>
              <div className="text-neutral-600">Main Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10</div>
              <div className="text-neutral-600">Usage Contexts</div>
            </div>
          </div>
        </div>
      </section>

      {/* 特色功能区域 */}
      <section className="py-16 px-4 bg-white">
        <div className="container-responsive">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-900">
            Why This Resource Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Educational</h3>
              <p className="text-neutral-600">
                Comprehensive explanations of racial discrimination terms with historical context 
                and real-world examples to promote understanding and awareness.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Inclusive</h3>
              <p className="text-neutral-600">
                Designed to help everyone understand the impact of language and promote 
                more inclusive, respectful communication in all aspects of life.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Safe Learning</h3>
              <p className="text-neutral-600">
                A safe space to learn about sensitive topics with objective, 
                well-researched information that encourages thoughtful discussion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 行动号召区域 */}
      <section className="py-16 px-4 bg-primary-600">
        <div className="container-responsive text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are working to create more inclusive 
            and understanding communities through education.
          </p>
          <Link 
            href="/about" 
            className="bg-white text-primary-600 hover:bg-neutral-100 font-semibold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Learn More About Our Mission
          </Link>
        </div>
      </section>
    </div>
  )
} 