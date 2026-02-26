const scraper = require('website-scraper');
const fs = require('fs');

const scrape = scraper.default || scraper;

// 1. 确保目录存在
const dir = './public';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// 2. 配置爬虫
const options = {
  urls: ['https://community.solar.huawei.com/ie/index.html'],
  directory: dir,
  recursive: false, // 💡 建议：第一次部署先设为 false，只抓主页，确保能跑通
  requestConcurrency: 3,
};

// 3. 执行
console.log("正在开始抓取华为官网...");
scrape(options).then((result) => {
  console.log("抓取成功！文件已存入 public 目录。");
}).catch((err) => {
  console.error("抓取过程中出错:", err);
  process.exit(1);
});