const scraper = require('website-scraper');
// 重点：尝试两种可能的导入路径
const PuppeteerPluginModule = require('website-scraper-puppeteer');
const PuppeteerPlugin = PuppeteerPluginModule.default || PuppeteerPluginModule;

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
        headless: "new", // 适配新版 Puppeteer
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
      },
      scrollToBottom: true
    })
  ],
  recursive: false,
  requestConcurrency: 1
};

console.log("正在尝试启动浏览器进行渲染抓取...");
scrape(options).then(() => {
  console.log("🎉 抓取成功！");
}).catch((err) => {
  console.error("❌ 抓取失败，错误详情:", err.message);
  process.exit(1);
});