# 内容管理指南

## 概述

本指南说明如何管理和更新网站中的词汇内容。所有内容都存储在 `src/data/terms.json` 文件中。

## 词汇数据结构

每个词汇包含以下字段：

```json
{
  "id": "唯一标识符",
  "slug": "URL友好的标识",
  "term": "词汇名称",
  "pronunciation": "发音（可选）",
  "definition": "定义解释",
  "history": "历史背景",
  "context": "使用场景",
  "impact": "社会影响",
  "alternatives": ["替代表达1", "替代表达2"],
  "category": "严重程度（severe/moderate/mild）",
  "tags": ["标签1", "标签2"],
  "usageContext": ["使用场景1", "使用场景2"],
  "historicalPeriod": "历史时期",
  "relatedTerms": ["相关词汇1", "相关词汇2"],
  "examples": ["示例1", "示例2"],
  "educationalNotes": "教育笔记",
  "createdAt": "创建时间",
  "updatedAt": "更新时间"
}
```

## 添加新词汇

### 1. 准备内容

在添加新词汇之前，请确保：

- 内容准确、客观
- 包含完整的历史背景
- 提供具体的使用场景
- 说明社会影响
- 包含教育价值

### 2. 编辑 JSON 文件

1. 打开 `src/data/terms.json`
2. 在数组末尾添加新的词汇对象
3. 确保 JSON 格式正确

### 3. 示例

```json
{
  "id": "term-4",
  "slug": "example-term",
  "term": "Example Term",
  "pronunciation": "/ɪɡˈzæmpəl tɜːm/",
  "definition": "A clear and concise definition of the term.",
  "history": "Historical background and origin of the term.",
  "context": "How and where the term is used in modern society.",
  "impact": "The social and psychological impact of this term.",
  "alternatives": [
    "Alternative expression 1",
    "Alternative expression 2"
  ],
  "category": "moderate",
  "tags": ["tag1", "tag2", "tag3"],
  "usageContext": ["everyday", "media"],
  "historicalPeriod": "contemporary",
  "relatedTerms": ["related-term-1", "related-term-2"],
  "examples": [
    "Example usage 1",
    "Example usage 2"
  ],
  "educationalNotes": "Important educational notes about this term.",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## 内容标准

### 严重程度分类

- **severe**: 高度冒犯性和有害的词汇
- **moderate**: 中等影响的词汇
- **mild**: 轻微或历史背景的词汇

### 使用场景

- **everyday**: 日常用语
- **media**: 媒体和娱乐
- **workplace**: 职场
- **education**: 教育环境
- **historical**: 历史背景
- **online**: 网络和社交媒体

### 历史时期

- **ancient**: 古代
- **medieval**: 中世纪
- **colonial**: 殖民时期
- **modern**: 现代
- **contemporary**: 当代

## 内容审核

### 审核清单

- [ ] 定义准确且清晰
- [ ] 历史背景完整
- [ ] 使用场景具体
- [ ] 社会影响分析到位
- [ ] 替代表达实用
- [ ] 示例恰当
- [ ] 教育价值明确
- [ ] 语言客观中立

### 敏感内容处理

- 避免煽动性语言
- 保持教育性目的
- 考虑不同文化背景
- 尊重所有群体

## 更新现有内容

### 1. 找到要更新的词汇

在 `src/data/terms.json` 中找到对应的词汇对象。

### 2. 更新字段

修改需要更新的字段，同时更新 `updatedAt` 时间戳。

### 3. 验证格式

确保 JSON 格式正确，可以使用在线 JSON 验证工具。

## 批量操作

### 添加多个词汇

1. 准备所有词汇的 JSON 数据
2. 一次性添加到 `terms.json` 文件
3. 确保 ID 不重复
4. 验证所有 slug 唯一

### 更新多个词汇

1. 使用文本编辑器的查找替换功能
2. 批量更新 `updatedAt` 时间戳
3. 验证 JSON 格式

## 版本控制

### Git 工作流

1. 创建新分支进行内容更新
2. 提交更改并添加描述性信息
3. 创建 Pull Request
4. 代码审查后合并

### 备份策略

- 定期备份 `terms.json` 文件
- 使用 Git 标签标记重要版本
- 保持多个版本的历史记录

## 自动化工具

### 内容验证

可以创建脚本来自动验证：

- JSON 格式正确性
- 必需字段完整性
- ID 和 slug 唯一性
- 日期格式正确性

### 批量导入

对于大量内容，可以创建导入脚本：

```javascript
// 示例：批量导入脚本
const fs = require('fs');
const terms = require('./new-terms.json');

// 验证和转换数据
const validatedTerms = terms.map(term => ({
  ...term,
  id: `term-${Date.now()}-${Math.random()}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));

// 写入文件
fs.writeFileSync('./src/data/terms.json', JSON.stringify(validatedTerms, null, 2));
```

## 常见问题

### Q: 如何确保内容质量？
A: 建立内容审核流程，包括多轮审查和专家咨询。

### Q: 如何处理争议性内容？
A: 保持客观中立，提供多角度信息，明确教育目的。

### Q: 如何管理大量内容？
A: 使用内容管理系统或数据库，建立分类和标签体系。

### Q: 如何确保 SEO 优化？
A: 使用相关关键词，优化 meta 描述，保持内容更新。

## 联系支持

如有内容相关问题，请联系项目维护者或提交 Issue。 