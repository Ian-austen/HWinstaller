const scraper = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
const fs = require('fs');
const path = require('path');

const scrape = scraper.default || scraper;
const dir = path.join(__dirname, 'public');

if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
}

const options = {
  urls: ['https://community.solar.huawei.com/ie/index.html'],
  directory: dir,
  plugins: [
    new PuppeteerPlugin({
      launchOptions: { 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Vercel 环境必须加这两行
      }, 
      scrollToBottom: true, // 自动滚到底部，触发懒加载图片
      checkLoadedSelector: '.header', // 确保这个 CSS 选择器出现了才算加载完
    })
  ],
  recursive: false,
  requestConcurrency: 1
};

console.log("正在使用模拟浏览器抓取动态内容...");
scrape(options).then(() => {
  console.log("🎉 动态页面抓取成功！");
}).catch((err) => {
  console.error("❌ 报错:", err.message);
  process.exit(1);
});