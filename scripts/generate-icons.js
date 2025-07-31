#!/usr/bin/env node

/**
 * 图标生成脚本
 * 需要安装 sharp: npm install sharp
 */

const fs = require('fs');
const path = require('path');

// 检查是否安装了sharp
try {
  require('sharp');
} catch (error) {
  console.log('请先安装 sharp: npm install sharp');
  process.exit(1);
}

const sharp = require('sharp');

const sizes = {
  favicon: [16, 32, 48],
  apple: [180],
  pwa: [192, 512],
  og: [1200, 630]
};

async function generateIcons() {
  const svgPath = path.join(__dirname, '../public/icon.svg');
  const outputDir = path.join(__dirname, '../public');
  
  if (!fs.existsSync(svgPath)) {
    console.error('找不到 icon.svg 文件');
    return;
  }
  
  console.log('开始生成图标...');
  
  try {
    // 生成 favicon.ico (需要多个尺寸)
    const faviconSizes = sizes.favicon;
    const faviconBuffers = [];
    
    for (const size of faviconSizes) {
      const buffer = await sharp(svgPath)
        .resize(size, size)
        .png()
        .toBuffer();
      faviconBuffers.push({ size, buffer });
    }
    
    // 生成 apple-touch-icon.png
    await sharp(svgPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    
    // 生成 PWA 图标
    for (const size of sizes.pwa) {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
    }
    
    // 生成 OG 图片
    await sharp(svgPath)
      .resize(1200, 630)
      .jpeg({ quality: 90 })
      .toFile(path.join(outputDir, 'og-image.jpg'));
    
    console.log('✅ 图标生成完成！');
    console.log('生成的文件：');
    console.log('- apple-touch-icon.png (180x180)');
    console.log('- icon-192x192.png (PWA)');
    console.log('- icon-512x512.png (PWA)');
    console.log('- og-image.jpg (1200x630)');
    console.log('');
    console.log('注意：favicon.ico 需要手动转换，建议使用在线工具将 PNG 转换为 ICO 格式');
    
  } catch (error) {
    console.error('生成图标时出错:', error);
  }
}

generateIcons(); 