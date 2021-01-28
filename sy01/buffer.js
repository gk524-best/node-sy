// v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建实例
// 但是Buffer对内存的权限操作相对大，可以直接捕获一些敏感信息,所以
// 在v6.0以后，官方文档里面建议使用Buffer.from()接口去创建Buffer对象

// Buffer实例一般用于表示编码字符的序列，比如UTF-8、UCS2、Base64或十六
// 进制编码的数据。通过使用显式的字符编码，就可以在Buffer实例与普通的Javascript
// 字符串之间进行互相转换

const buf = Buffer.from('buffer data', 'ascii');

console.log(buf.toString('hex'))

console.log(buf.toString('base64'))