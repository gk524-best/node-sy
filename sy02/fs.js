const fs = require('fs');
const { resolve } = require('path');
const path = require('path')

// 同步删除
try {
  fs.unlinkSync(path.resolve(__dirname, 'test.txt'));
  console.log('删除文件成功');
} catch (err) {
  console.log('未找到要删除的文件');
}

// 异步删除
fs.unlink(path.resolve(__dirname, 'test1.txt'), (err) => {
  if (err) {
    console.log('异步删除-----未找到要删除的文件');
    // throw err
  }
  console.log('成功删除文件');
})

// 基于Promise实例
const url = path.resolve(__dirname, 'test2.txt');
(async function (path) {
    try {
      await fs.unlink(path, () => {});
      console.log(`已成功删除文件${path}`);
    } catch(error) {
      console.log('基于Promise---出错：', error.message);
    } 
})(url)

// 回调与基于Promise的操作的顺序
// 新文件的属性打印必须放在修改成功回调中
const url3Old = resolve(__dirname, 'test3.txt');
const url3New = resolve(__dirname, 'testNew3.txt');
fs.rename(url3Old, url3New, (err) => {
  if (err) throw err;
  console.log('回调与基于Promise的操作-----------重命名成功');
  fs.stat(url3New, (err, stats) => {
    if (err) throw err;
    console.log(`文件属性：${JSON.stringify(stats)}`);
  })
})


