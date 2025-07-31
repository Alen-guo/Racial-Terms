# 🎨 图标生成指南

## 📋 使用在线工具生成图标

### 推荐工具：favicon.io

#### 步骤 1：访问网站
打开浏览器，访问：https://favicon.io/

#### 步骤 2：选择生成方式
点击 **"Favicon Generator"** 或直接拖拽文件到页面

#### 步骤 3：上传图标
- 将 `public/icon.svg` 文件拖拽到上传区域
- 或者点击 "Choose File" 选择文件

#### 步骤 4：预览和调整
- 网站会自动生成预览效果
- 可以调整颜色、大小等参数
- 确认效果满意后点击 "Download"

#### 步骤 5：下载文件
下载的文件包包含：
- `favicon.ico` (16x16, 32x32, 48x48)
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest`

### 替代工具：RealFaviconGenerator

如果 favicon.io 不工作，可以尝试：
https://realfavicongenerator.net/

## 🔄 替换文件

下载完成后，将文件替换到 `public/` 目录：

```bash
# 替换以下文件
public/favicon.ico
public/apple-touch-icon.png
public/android-chrome-192x192.png
public/android-chrome-512x512.png
public/site.webmanifest
```

## 📝 更新 manifest.json

如果下载的文件包含 `site.webmanifest`，用它替换现有的 `manifest.json`：

```bash
# 备份原文件
mv public/manifest.json public/manifest.json.backup

# 使用新文件
mv public/site.webmanifest public/manifest.json
```

## ✅ 验证图标

替换文件后：

1. **重启开发服务器**：
   ```bash
   npm run dev
   ```

2. **清除浏览器缓存**：
   - 按 Ctrl+Shift+R (Windows/Linux)
   - 按 Cmd+Shift+R (Mac)

3. **检查图标显示**：
   - 浏览器标签页
   - 书签栏
   - 移动端主屏幕

## 🎯 图标规格要求

### 必需文件
- `favicon.ico` - 浏览器标签页图标
- `apple-touch-icon.png` - iOS 设备图标
- `android-chrome-192x192.png` - Android 设备图标
- `android-chrome-512x512.png` - PWA 图标

### 推荐尺寸
- 16x16, 32x32, 48x48 (favicon.ico)
- 180x180 (apple-touch-icon.png)
- 192x192, 512x512 (Android/PWA)

## 🆘 常见问题

### Q: 图标不显示？
A: 
1. 检查文件路径是否正确
2. 清除浏览器缓存
3. 确认文件名大小写正确

### Q: 图标模糊？
A: 
1. 确保上传的SVG文件质量高
2. 在线工具会自动生成不同尺寸
3. 检查生成的PNG文件是否清晰

### Q: 移动端图标不显示？
A: 
1. 确保 `apple-touch-icon.png` 存在
2. 检查 `manifest.json` 配置
3. 重新添加到主屏幕

## 🚀 快速操作

1. **上传文件**：将 `public/icon.svg` 上传到 favicon.io
2. **下载文件**：下载生成的图标包
3. **替换文件**：将文件复制到 `public/` 目录
4. **重启服务器**：`npm run dev`
5. **清除缓存**：Ctrl+Shift+R

---

**完成这些步骤后，您的网站图标就会正常显示了！** 🎉 