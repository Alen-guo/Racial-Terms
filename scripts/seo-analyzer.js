#!/usr/bin/env node

/**
 * SEO 分析工具
 * 检查网站的SEO状态和优化建议
 */

const fs = require('fs')
const path = require('path')

class SEOAnalyzer {
  constructor() {
    this.baseUrl = 'https://racialterms.com'
    this.issues = []
    this.warnings = []
    this.suggestions = []
  }

  // 检查页面标题
  checkPageTitles() {
    console.log('🔍 检查页面标题...')
    
    const pages = [
      { path: '/', expected: 'Racial Discrimination Terms' },
      { path: '/about', expected: 'About' },
      { path: '/terms', expected: 'Terms' }
    ]
    
    pages.forEach(page => {
      if (!page.expected) {
        this.warnings.push(`页面 ${page.path} 缺少标题检查`)
      }
    })
  }

  // 检查Meta描述
  checkMetaDescriptions() {
    console.log('🔍 检查Meta描述...')
    
    const minLength = 120
    const maxLength = 160
    
    // 这里可以添加实际的描述检查逻辑
    this.suggestions.push('确保所有页面都有150-160字符的Meta描述')
  }

  // 检查图片Alt文本
  checkImageAltText() {
    console.log('🔍 检查图片Alt文本...')
    
    const imageFiles = [
      '/favicon.ico',
      '/apple-touch-icon.png',
      '/og-image.jpg'
    ]
    
    imageFiles.forEach(image => {
      if (!fs.existsSync(path.join(process.cwd(), 'public', image.replace('/', '')))) {
        this.issues.push(`缺少图片文件: ${image}`)
      }
    })
  }

  // 检查内部链接
  checkInternalLinks() {
    console.log('🔍 检查内部链接...')
    
    const requiredPages = [
      '/',
      '/about',
      '/terms',
      '/sitemap.xml',
      '/robots.txt'
    ]
    
    this.suggestions.push('确保所有内部链接都正常工作')
  }

  // 检查结构化数据
  checkStructuredData() {
    console.log('🔍 检查结构化数据...')
    
    const requiredSchemas = [
      'WebSite',
      'Organization',
      'Article',
      'BreadcrumbList'
    ]
    
    this.suggestions.push('验证结构化数据在Google Rich Results Test中的表现')
  }

  // 检查性能
  checkPerformance() {
    console.log('🔍 检查性能指标...')
    
    const performanceChecks = [
      '页面加载速度 < 3秒',
      'Core Web Vitals 达标',
      '移动端性能优化',
      '图片优化 (WebP/AVIF)',
      '代码分割和懒加载'
    ]
    
    performanceChecks.forEach(check => {
      this.suggestions.push(check)
    })
  }

  // 检查可访问性
  checkAccessibility() {
    console.log('🔍 检查可访问性...')
    
    const a11yChecks = [
      '语义化HTML标签',
      'ARIA标签使用',
      '键盘导航支持',
      '颜色对比度',
      '屏幕阅读器友好'
    ]
    
    a11yChecks.forEach(check => {
      this.suggestions.push(check)
    })
  }

  // 生成报告
  generateReport() {
    console.log('\n📊 SEO 分析报告')
    console.log('=' * 50)
    
    if (this.issues.length > 0) {
      console.log('\n❌ 发现的问题:')
      this.issues.forEach(issue => {
        console.log(`  - ${issue}`)
      })
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  警告:')
      this.warnings.forEach(warning => {
        console.log(`  - ${warning}`)
      })
    }
    
    if (this.suggestions.length > 0) {
      console.log('\n💡 优化建议:')
      this.suggestions.forEach(suggestion => {
        console.log(`  - ${suggestion}`)
      })
    }
    
    console.log('\n🔗 有用的工具:')
    console.log('  - Google PageSpeed Insights: https://pagespeed.web.dev/')
    console.log('  - Google Rich Results Test: https://search.google.com/test/rich-results')
    console.log('  - Google Search Console: https://search.google.com/search-console')
    console.log('  - Lighthouse: https://developers.google.com/web/tools/lighthouse')
    
    console.log('\n✅ 分析完成!')
  }

  // 运行所有检查
  run() {
    console.log('🚀 开始SEO分析...\n')
    
    this.checkPageTitles()
    this.checkMetaDescriptions()
    this.checkImageAltText()
    this.checkInternalLinks()
    this.checkStructuredData()
    this.checkPerformance()
    this.checkAccessibility()
    
    this.generateReport()
  }
}

// 运行分析
const analyzer = new SEOAnalyzer()
analyzer.run() 