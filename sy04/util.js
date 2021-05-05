// nodeJs之实用工具
const util = require('util');
const fs = require('fs');

/**
 * util.callbackify(original)
 * 将async异步函数转换成遵循异步优先的回调风格的函数  
 * 异步优先指的是第一个回调参数为error
 * @param original <Function> async异步函数
 * @return <Function> 传统回调函数
 */
async function fn() {
  return 'hello world';
  // return Promise.reject(null)
}

const callbackFun = util.callbackify(fn);

callbackFun((err, res) => {
  if (err) throw err;
  console.log(res);
})


/**
 * util.debuglog(section[, callback])
 * 日志处理函数
 * 命令行设置环境NODE_DEBUG=foo node util.js
 * @param section <string> 指定日志标签
 * @param callback <Function> 首次调用时的回调函数
 * @return <Funcion> 日志函数
 */
const debuglog = util.debuglog('foo');
debuglog('hell from foo [%d]', 123)


/**
 * util.deprecate(fn,msg[,code])
 * 函数弃用警告提示
 * @param fn <Function> 函数
 * @param msg <string> 警告信息
 * @param code <string> 弃用码
 * @return <Function> 弃用的函数被包装以发出警告
 */
exports.obsoleteFunction = util.deprecate(() => {
  // 一些操作
}, 'obsoleteFunction() 已弃用，使用newShinyFunction()代替')


/**
 * util.format(format[,...args])
 * 格式化字符串
 * %s: String 将用于转换除BigInt、Object和-0外的所有值
 * %d: Number 将用于转换除BigInt和Symbol之外的所有值
 * %i: parseInt(value, 10)用于除BigInt和Symbol之外所有的值
 * %f: parseFloat(value)用于除BigInt和Symbol之外的所有值
 * %j: JSON。如果参数包含循环引用，则替换为字符串 '[Circular]'
 * %o: Object。具有通用javascript对象格式的对象的字符串表示形式
 * %O：Object。具有通用 JavaScript 对象格式的对象的字符串表示形式
 * %c - CSS。该说明符会被忽略，将会跳过任何传入的 CSS。
 * %% - 单个百分号（'%'）。这不会消耗参数。
 * @param format <string> 一个类似 printf 的格式字符串
 * @param  格式化对应的参数
 * @return <string> 格式化的字符串
 */
const str = util.format('%s:%s', 'foo', 'bar')
console.log(str);

/**
 * util.formatWithOptions(inspectOptions, format[, ...args])
 * 功能类似于util.format, 不同之处在于它采用了inspectOptions参数，改参数指定了传递给util.inspect()
 */
const str1 = util.formatWithOptions({ colors: true }, 'See object %o', { foo: 42 })
console.log(str1);

/**
 * util.getSystemErrorName(errno)
 * 返回NodeJs API错误码对应的错误名称
 * @param errno <number> 回调函数错误中的错误码
 * @return <string> 错误码对应的名称
 */
fs.access('file/that/does/not/exist', (err) => {
  const name = util.getSystemErrorName(err.errno);
  console.log(name)
});

/**
 * util.isDeepStrictEqual(val1, val2)
 * 深层比较两个参数是否相等
 * @param val1 <any> 比较参数1
 * @param val2 <any> 比较参数2
 * @return <boolean>
 */
const isEqual = util.isDeepStrictEqual({ a: 1 }, { a: '1' });
console.log(isEqual);

/**
 * util.promisify(original)
 * util.promisify.custom可以重写util.promisify的返回值
 * 把错误优先的回调函数转换成Promise
 * @param original <Function> 错误优先的回调风格的函数
 * @return <Promise>
 */
const stat = util.promisify(fs.stat);
stat('.').then((stats) => {
  console.log(stats);
}).catch((err) => {
  // 错误处理
})


// TextEncoder的所有实例仅支持UTF-8编码
/**
 * textEncoder.encode([input])
 * UTF-8对输入字符串进行编码，并返回包含编码字节的Uint8Array
 * @param input <string> 要编码的文本 默认空字符串
 * @return <Uint8Array>
 */
const encoder1 = new TextEncoder();
encoder1.encode('hhh')


/**
 * textEncoder.encoderInto(src, dest)
 * 编码保存在一个数组中
 * @param src <string> 要编码的文本
 * @param dest <Uint8Array> 编码保存的数组
 * @retruns <Object>
 *    read  <number> 读取src的Unicode代码单元
 *    written <number> 写入的UTF-8字节
 */
const encoder2 = new TextEncoder();
const src = 'this is a some data';
const dest = new Uint8Array(10);
const { read, written } = encoder2.encodeInto(src, dest);
console.log(read, written);

/**
 * textEncoder.encoding
 * TextEncoder实例支持的编码。始终设置为“ utf-8
 */
const encoder3 = new TextEncoder();
console.log(encoder3.encoding);


/**
 * TextDecoder 
 * 用法同TextEncoder,用来对使用TextEncode对象编码的字符串做解码处理
 */
const decoder = new TextEncoder('shift_jis');
let string = '';
let buffer;
while (buffer = getNextChunkSomehow()) {
  string += decoder.decode(buffer, { stream: true })
}
string += decoder.decode();



// util.types 为不同类型的内置对象提供类型检查