const scrape = require('website-scraper');

const options = {
  urls: ['https://community.solar.huawei.com/ie/index.html'],
  directory: './public',
  recursive: true,
  maxRecursiveDepth: 2, // 建议先设为2层，否则数据量巨大
  requestConcurrency: 5,
  subdirectories: [
    {directory: 'img', extensions: ['.jpg', '.png', '.svg', '.gif']},
    {directory: 'js', extensions: ['.js']},
    {directory: 'css', extensions: ['.css']},
    {directory: 'fonts', extensions: ['.woff', '.ttf', '.woff2']},
  ],
};

scrape(options).then((result) => {
  console.log("抓取完成！所有文件已保存在 public 目录。");
}).catch((err) => {
  console.error("抓取失败:", err);
});
