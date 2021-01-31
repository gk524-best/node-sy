// v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建实例
// 但是Buffer对内存的权限操作相对大，可以直接捕获一些敏感信息,所以
// 在v6.0以后，官方文档里面建议使用Buffer.from()接口去创建Buffer对象

// Buffer实例一般用于表示编码字符的序列，比如UTF-8、UCS2、Base64或十六
// 进制编码的数据。通过使用显式的字符编码，就可以在Buffer实例与普通的Javascript
// 字符串之间进行互相转换

const buf = Buffer.from('buffer data', 'ascii');

console.log(buf.toString('hex'))

console.log(buf.toString('base64'))

// 创建一个长度为10 且用0填充的Buffer
const buf1 = Buffer.alloc(10);
console.log('buf1', buf1)

// 创建一个长度为10 且用0x1填充的buffer
const buf2 = Buffer.alloc(10, 1);
console.log('buf2', buf2)

// 创建一个长度为10 且未初始化的buffer
// 这个方法比调用Buffer.alloc()更快
// 但返回的Buffer实例可能包含旧数据
// 因此需要使用fill()或write()重写
const buf3 = Buffer.allocUnsafe(10);
console.log('buf3', buf3);

// 创建一个包含[0x1, 0x2, 0x3]的Buffer
const buf4 = Buffer.from([1, 2, 3]);
console.log('buf4', buf4);

// 创建一个包含UTF-8字节[0x74, 0xc3, 0xa9, 0x73, 0x74]的Buffer
const buf5 = Buffer.from('tést');
console.log('buf5', buf5);

// 创建一个包含Latin-1字节[0x74, 0xa9, 0x73, 0x74]的Buffer
const buf6 = Buffer.from('tést', 'latin1');
console.log('buf6', buf6);

// 写入缓冲区
const buf7 = Buffer.alloc(256);
const len = buf7.write('hello Buffer!');
console.log('输出字节数：' + len);

// 从缓冲区读取数据
const buf8 = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
  buf8[i] = i + 97;
}
// ascii 编码
console.log('buf8输出：' + buf8.toString('ascii'));
console.log('buf8输出：' + buf8.toString('ascii', 0, 5));
// utf8 编码
console.log('buf8输出：' + buf8.toString('utf8', 0, 5));
// 默认utf8
console.log('buf8输出: ' + buf8.toString(undefined, 0, 5));

// Buffer 转换为JSON对象
// Tip: 当字符串化一个Buffer实例时，JSON.stringify()会隐式调用该toJSON()
const buf9 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf9);
console.log('buffer转json对象：' + json);
const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});
console.log('json转Buffer：', copy);

// 缓冲区合并
// 类似数组合并  语法Buffer.concat(list[, totalLength])
const buf10_1 = Buffer.from(('这是nodeJs'));
const buf10_2 = Buffer.from(('好好学吧'));
const buf10_3 = Buffer.concat([buf10_1, buf10_2]);
console.log('buffer合并：' + buf10_3.toString());

// 缓冲区比较
// 语法：buf.compare(otherBuf)
//   - 返回0： 相等
//   - 小于0： buf在otherBuf前 (前后表示字符长度)
//   - 大于0： buf在otherBuf后
const buf11_1 = Buffer.from('ABC');
const buf11_2 = Buffer.from('ABCD');
const buf11_res = buf11_1.compare(buf11_2);
switch (buf11_res) {
  case 0:
    console.log('buffer相等');
    break;
  case 1:
    console.log('buf11_1 在 buf11_2 后面');
    break;
  case -1:
    console.log('buf11_1 在 buf11_2 前面');
    break;
}

// 拷贝缓冲区
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])  buf拷贝到targetBuffer 位置覆盖
// targetBuffer - 要拷贝的Buffer对象
// targetStart  - 数字，可选，默认0，插入targetBuffer起始位置
// sourceStart  - 数字，可选，默认0，源buf起始位置
// sourceEnd    - 数字，可选，默认buf.length, 源buf结束位置
const buf12_1 = Buffer.from('Dalek');
const buf12_2 = Buffer.from('Rose');
buf12_2.copy(buf12_1, 1, 1);
console.log('拷贝缓冲区', buf12_1.toString())


// 缓冲区裁剪  裁剪会有空格出现
// buf.slice([start[, end]])
// start 可选, 默认0
// end   可选, 默认0
const buf13 = Buffer.from('Dalek')
// 裁剪缓冲区
const buf13_1 = buf13.slice(0, 2);
console.log('缓冲区裁剪：', buf13_1.toString());

// 缓冲区长度
const buf14 = Buffer.from('Dalek');
console.log('缓冲区长度：', buf14.length);

