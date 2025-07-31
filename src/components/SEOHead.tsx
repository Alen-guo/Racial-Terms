import Head from 'next/head'
import { Term } from '@/types'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  term?: Term
  breadcrumbs?: Array<{ name: string; url: string }>
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  term,
  breadcrumbs
}: SEOHeadProps) {
  const baseUrl = 'https://racialterms.com'
  const defaultTitle = 'Racial Discrimination Terms - Educational Resource'
  const defaultDescription = 'Comprehensive educational resource explaining racial discrimination terms, their history, context, and impact. Learn to identify and understand racial discrimination in modern society.'
  const defaultKeywords = 'racial discrimination, anti-racism, education, social justice, diversity, inclusion, racial terms, microaggressions'

  const pageTitle = title || defaultTitle
  const pageDescription = description || defaultDescription
  const pageKeywords = keywords || defaultKeywords
  const pageCanonical = canonical || baseUrl
  const pageOgImage = `${baseUrl}${ogImage}`

  return (
    <Head>
      {/* 基础Meta标签 */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Racial Education Team" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:site_name" content="Racial Discrimination Terms" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />
      <meta name="twitter:site" content="@racialterms" />

      {/* 词汇页面特殊Meta标签 */}
      {term && (
        <>
          <meta property="article:published_time" content={term.createdAt} />
          <meta property="article:modified_time" content={term.updatedAt} />
          <meta property="article:section" content="Education" />
          <meta property="article:tag" content={term.tags?.join(', ')} />
        </>
      )}

      {/* 结构化数据 - 面包屑导航 */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: `${baseUrl}${item.url}`
              }))
            })
          }}
        />
      )}

      {/* 预连接优化 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS预取 */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#f27522" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Racial Terms" />
      
      {/* 图标 */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
} 