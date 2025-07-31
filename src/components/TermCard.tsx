import Link from 'next/link'
import { Clock, Tag, ArrowRight } from 'lucide-react'
import { Term } from '@/types'

interface TermCardProps {
  term: Term
  showCategory?: boolean
  showTags?: boolean
  showDate?: boolean
}

export default function TermCard({ 
  term, 
  showCategory = true, 
  showTags = true, 
  showDate = false 
}: TermCardProps) {
  return (
    <div className="card card-hover group">
      {/* 头部区域 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
            {term.term}
          </h3>
          {term.pronunciation && (
            <p className="text-sm text-neutral-500 font-mono">
              {term.pronunciation}
            </p>
          )}
        </div>
        {showCategory && (
          <span className={`tag tag-${term.category} ml-2`}>
            {term.category}
          </span>
        )}
      </div>

      {/* 定义 */}
      <p className="text-neutral-600 mb-4 line-clamp-3">
        {term.definition}
      </p>

      {/* 标签 */}
      {showTags && term.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {term.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {term.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700">
              +{term.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* 底部信息 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          {showDate && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(term.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span>Context:</span>
            <span className="font-medium">{term.usageContext[0]}</span>
          </div>
        </div>
        
        <Link
          href={`/terms/${term.slug}`}
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:gap-2 transition-all"
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
} 