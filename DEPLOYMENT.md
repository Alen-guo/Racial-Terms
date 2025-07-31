# 部署指南

## 部署到 Vercel

### 1. 准备工作

确保你的项目已经推送到 GitHub 仓库。

### 2. 部署步骤

1. **访问 Vercel**
   - 打开 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测到这是一个 Next.js 项目

3. **配置项目**
   - **Framework Preset**: Next.js (自动检测)
   - **Root Directory**: `./` (默认)
   - **Build Command**: `npm run build` (默认)
   - **Output Directory**: `.next` (默认)
   - **Install Command**: `npm install` (默认)

4. **环境变量**
   - 目前项目不需要特殊的环境变量
   - 如果需要，可以在项目设置中添加

5. **部署**
   - 点击 "Deploy"
   - Vercel 会自动构建和部署你的项目

### 3. 自定义域名

1. 在项目仪表板中，点击 "Settings"
2. 选择 "Domains"
3. 添加你的自定义域名
4. 按照指示配置 DNS 记录

### 4. 自动部署

- 每次推送到 `main` 分支时，Vercel 会自动重新部署
- 可以在项目设置中配置部署规则

## 本地开发

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 性能优化

### 已实现的优化
- ✅ 静态生成 (SSG)
- ✅ 图片优化
- ✅ 代码分割
- ✅ SEO 优化
- ✅ 响应式设计
- ✅ 压缩和缓存

### 进一步优化建议
1. **CDN**: Vercel 自动提供全球 CDN
2. **缓存**: 利用 Next.js 的缓存机制
3. **监控**: 使用 Vercel Analytics 监控性能
4. **图片**: 使用 Next.js Image 组件优化图片

## 维护

### 更新内容
1. 修改 `src/data/terms.json` 文件
2. 推送到 GitHub
3. Vercel 自动重新部署

### 监控
- 使用 Vercel 仪表板监控部署状态
- 设置错误通知
- 定期检查性能指标

## 故障排除

### 常见问题

1. **构建失败**
   - 检查控制台错误信息
   - 确保所有依赖已安装
   - 验证 TypeScript 类型

2. **页面加载慢**
   - 检查图片大小
   - 优化代码分割
   - 使用性能监控工具

3. **SEO 问题**
   - 验证 meta 标签
   - 检查站点地图
   - 测试结构化数据

### 联系支持
- Vercel 支持: [vercel.com/support](https://vercel.com/support)
- Next.js 文档: [nextjs.org/docs](https://nextjs.org/docs) 