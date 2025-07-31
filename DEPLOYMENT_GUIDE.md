# 🚀 部署指南 - Racial Terms Education

## 📋 部署前准备

### 1. 域名配置
- ✅ 已购买域名：`racialterms.com`
- ✅ 环境变量已配置为使用新域名

### 2. 图标文件
已为您创建了专业的网站图标，基于网站导航栏设计：
- 📚 **开放书本**：象征教育和知识传播
- ⚪ **白色背景**：干净简洁，易于识别
- 🟠 **橙色边框**：与网站主题色保持一致
- 📖 **书页线条**：体现教育内容的丰富性
- 🔴 **装饰圆点**：增加视觉平衡和精致感

### 3. 需要生成的图标文件

#### 方法一：使用在线工具（推荐）
1. 访问 [favicon.io](https://favicon.io/) 或 [realfavicongenerator.net](https://realfavicongenerator.net/)
2. 上传 `public/icon.svg` 文件
3. 生成所有格式的图标文件
4. 下载并替换 `public/` 目录中的文件

#### 方法二：使用脚本（需要安装依赖）
```bash
# 安装 sharp 库
npm install sharp

# 运行图标生成脚本
node scripts/generate-icons.js
```

### 4. 环境变量配置
创建 `.env.local` 文件：
```bash
# 网站配置
NEXT_PUBLIC_SITE_URL=https://racialterms.com

# Google Search Console 验证码（可选）
GOOGLE_VERIFICATION_CODE=your-google-verification-code

# 其他配置
NODE_ENV=production
```

## 🎯 推荐部署平台

### 1. Vercel（强烈推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

**优势：**
- 完美支持 Next.js
- 自动 HTTPS
- 全球 CDN
- 自动部署
- 免费计划足够

### 2. Netlify
```bash
# 构建项目
npm run build

# 部署到 Netlify
# 将 .next 目录拖拽到 Netlify 部署界面
```

### 3. Railway
```bash
# 连接 GitHub 仓库
# Railway 会自动检测 Next.js 项目并部署
```

## 🔧 部署后配置

### 1. 域名设置
- 在域名提供商处设置 DNS 记录
- 指向部署平台的服务器
- 配置 SSL 证书（通常自动）

### 2. Google Search Console
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加 `racialterms.com` 域名
3. 验证所有权（使用提供的验证码）
4. 提交站点地图：`https://racialterms.com/sitemap.xml`

### 3. 性能优化
- ✅ 图片已优化（WebP, AVIF）
- ✅ 代码分割已配置
- ✅ 静态生成已启用
- ✅ SEO 元数据完整

## 📊 监控和分析

### 1. 性能监控
- 使用 [WebPageTest](https://www.webpagetest.org/) 测试性能
- 使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse) 检查优化

### 2. 访问统计
- 配置 Google Analytics
- 设置 Google Search Console 监控

## 🎨 图标设计说明

### 设计理念
- **简洁性**：基于导航栏的简洁设计
- **教育性**：开放书本突出教育价值
- **一致性**：与网站整体设计风格统一
- **识别性**：白色背景橙色边框，易于识别

### 色彩含义
- 🟠 **橙色**：活力、教育、温暖
- ⚪ **白色**：简洁、纯净、专业
- 📖 **书页**：知识、学习、成长

## ✅ 部署检查清单

- [ ] 图标文件已生成并上传
- [ ] 环境变量已配置
- [ ] 域名 DNS 已设置
- [ ] SSL 证书已激活
- [ ] Google Search Console 已配置
- [ ] 性能测试已通过
- [ ] 移动端测试已通过
- [ ] SEO 检查已通过

## 🆘 常见问题

### Q: 图标不显示？
A: 检查文件路径和格式，确保 favicon.ico 在 public 目录根目录

### Q: 域名无法访问？
A: 检查 DNS 设置，等待 DNS 传播（最多24小时）

### Q: HTTPS 证书问题？
A: 大多数平台自动配置，如需要手动配置请参考平台文档

## 📞 技术支持

如果遇到部署问题，可以：
1. 检查平台文档
2. 查看错误日志
3. 联系平台技术支持

---

**祝您部署顺利！** 🎉 