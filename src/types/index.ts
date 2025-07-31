// 词汇严重程度枚举
export enum SeverityLevel {
  MILD = 'mild',
  MODERATE = 'moderate',
  SEVERE = 'severe'
}

// 使用场景枚举
export enum UsageContext {
  EVERYDAY = 'everyday',
  MEDIA = 'media',
  WORKPLACE = 'workplace',
  EDUCATION = 'education',
  HISTORICAL = 'historical',
  ONLINE = 'online'
}

// 历史时期枚举
export enum HistoricalPeriod {
  ANCIENT = 'ancient',
  MEDIEVAL = 'medieval',
  COLONIAL = 'colonial',
  MODERN = 'modern',
  CONTEMPORARY = 'contemporary'
}

// 词汇数据接口
export interface Term {
  id: string;
  slug: string;
  term: string;
  pronunciation?: string;
  definition: string;
  history: string;
  context: string;
  impact: string;
  alternatives?: string[];
  category: SeverityLevel;
  tags: string[];
  usageContext: UsageContext[];
  historicalPeriod: HistoricalPeriod;
  relatedTerms: string[];
  examples?: string[];
  educationalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// 搜索过滤器接口
export interface SearchFilters {
  category?: SeverityLevel;
  usageContext?: UsageContext;
  historicalPeriod?: HistoricalPeriod;
  tags?: string[];
}

// 搜索结果接口
export interface SearchResult {
  term: Term;
  score: number;
  matchedFields: string[];
}

// 分类数据接口
export interface Category {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

// 页面元数据接口
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
}

// 导航菜单项接口
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

// 面包屑导航接口
export interface Breadcrumb {
  label: string;
  href: string;
  current?: boolean;
} 