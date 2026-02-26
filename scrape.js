const scrape = require('website-scraper');
const fs = require('fs');

// 自动创建 public 文件夹，防止报错
if (!fs.existsSync('./public')){
    fs.mkdirSync('./public');
}

const options = {
  urls: ['https://community.solar.huawei.com/ie/index.html'],
  directory: './public',
  recursive: true,
  maxRecursiveDepth: 1, // 关键：先设为1，防止初次部署超时
  requestConcurrency: 3
};

scrape(options).then((result) => {
  console.log("抓取成功！文件已存入 public");
}).catch((err) => {
  console.error("抓取失败:", err);
  process.exit(1); // 失败时通知 Vercel 停止构建
});