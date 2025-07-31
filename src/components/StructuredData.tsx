import { Term } from '@/types'

interface StructuredDataProps {
  type: 'website' | 'article' | 'organization' | 'breadcrumb'
  data?: any
  terms?: Term[]
}

export default function StructuredData({ type, data, terms }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseUrl = 'https://racialterms.com'
    
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Racial Discrimination Terms - Educational Resource',
          description: 'Comprehensive educational resource explaining racial discrimination terms, their history, context, and impact.',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/terms?search={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Racial Education Team',
            url: baseUrl
          }
        }
      
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Racial Education Team',
          url: baseUrl,
          logo: `${baseUrl}/icon-512x512.png`,
          description: 'Educational organization dedicated to promoting understanding of racial discrimination terms and fostering inclusive communication.',
          sameAs: [
            'https://racialterms.com'
          ]
        }
      
      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data?.breadcrumbs?.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          })) || []
        }
      
      case 'article':
        if (data?.term) {
          return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.term.term,
            description: data.term.definition,
            author: {
              '@type': 'Organization',
              name: 'Racial Education Team'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Racial Education Team',
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/icon-512x512.png`
              }
            },
            datePublished: data.term.createdAt,
            dateModified: data.term.updatedAt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${baseUrl}/terms/${data.term.slug}`
            },
            keywords: data.term.tags?.join(', ') || '',
            articleSection: 'Education',
            about: {
              '@type': 'Thing',
              name: 'Racial Discrimination Education'
            }
          }
        }
        return null
      
      default:
        return null
    }
  }

  const structuredData = generateStructuredData()
  
  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
} 