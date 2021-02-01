const fs = require("fs");
const path = require('path');


// 阻塞代码  按顺序执行
// 文件读取完成之后才输出
const dataSync = fs.readFileSync(path.resolve(__dirname, './input.txt'));
console.log(dataSync.toString());
console.log('阻塞程序结束');

// 非阻塞代码
// 不需等待文件执行完成就可以输出
fs.readFile(path.resolve(__dirname, './input.txt'), function (err, data) {
  if (err) return console.error(err);
  console.log(data.toString());
});
console.log('非阻塞程序执行结束');