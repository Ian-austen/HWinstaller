const scraper = require('website-scraper');
const fs = require('fs');
const path = require('path');

const scrape = scraper.default || scraper;
const dir = path.join(__dirname, 'public');

// 1. 核心修复：如果目录存在，先递归删除它，确保爬虫面对的是一张白纸
if (fs.existsSync(dir)) {
    console.log("清理旧的 public 目录...");
    fs.rmSync(dir, { recursive: true, force: true });
}

// 2. 配置爬虫
const options = {
  urls: ['https://community.solar.huawei.com/ie/index.html'],
  directory: dir,
  recursive: false, // 第一次建议保持 false，确保主页通了再开递归
  requestConcurrency: 3,
};

// 3. 执行抓取
console.log("正在重新抓取华为官网...");
scrape(options).then((result) => {
  console.log("🎉 抓取成功！文件已保存至 public。");
}).catch((err) => {
  // 如果还是报错，打印更详细的信息
  console.error("❌ 抓取过程中出错:", err.message);
  process.exit(1);
});