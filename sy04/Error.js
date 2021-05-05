// Node.js应用程序一般会遇到以下四类错误
// 1. 标准的javascript错误，例如：<EvalError>、<SyntaxError>、<RangeError>、<ReferenceError>、<TypeError>或者<URLError>
// 2. 由底层操作系触发的系统错误，例如试图打开不存在的文件、或试图使用已关闭的socket发送数据
// 3. 由应用程序代码触发的用户自定义的错误
// 4. AssertionError错误，当Node.js检测到不应该发生的异常逻辑时触发。这类错误通常来自assert模块
// tip: 所有由Node.js引起的JavaScript错误与系统错误都继承自或实例化自标准的JavaScript <Error>类，且保证至少提供类中的属性


/**
 * Error.captureStackTrace(targetObject[, constructorOpt])
 * 堆栈跟踪
 * 在targetObject上创建一个.stack属性，当访问时返回一个表示代码中调用Error.captureStackTrace的位置的字符串
 * @param targetObject <Object>
 * @param constructorOpt <Function>
 */
// const myObject = {}
// Error.captureStackTrace(myObject);

function MyError() {
  // Error.captureStackTrace(this, MyError);
  Error.captureStackTrace(this)
}
// console.log(new MyError().stack);


// Error.stackTraceLimit 属性指定了堆栈跟踪收集的栈帧数量 默认10
// 可设为任何有效的 JavaScript数值, 值改变后的变化会影响所有捕获到的堆栈跟踪(改变是全局的)
// 如果设为一个非数值或负数，则堆栈跟踪不会捕捉任何栈帧
// console.log(Error.stackTraceLimit);


/**
 * Error.prepareStackTrace(Error, structuredStackTrace)
 * V8暴露了的一个接口，它的作用是定制stack
 * @param <Object> Error对象
 * @param <Array>  每个都是callsite对象，包含错误的函数名、行数等信息
 */

function c (){
  console.log('c')
  console.trace()
}
function b (){
  console.log('b')
  c()
}
function a (){
  console.log('a')
  b()
}
a()
// 输出如下：
// a
// b
// c
// Trace
//     at c (/Users/nswbmw/Desktop/test/app.js:3:11)
//     at b (/Users/nswbmw/Desktop/test/app.js:8:3)
//     at a (/Users/nswbmw/Desktop/test/app.js:13:3)
//     at Object.<anonymous>(/Users/nswbmw/Desktop/test/app.js:16:1)
//     at ...
// 由以上知道prepareStackTrace自定义的stack返回的callsites数组，每个callsite对象
// 对应一个堆栈，[0]表示当前函数，[1]表示调用者  [2]表示上层调用者 [3]表示上上层调用者以此类推

 function getStack() {
	var limit = Error.stackTraceLimit;
	var obj = {};
	var prep = Error.prepareStackTrace;

	Error.prepareStackTrace = prepareObjectStackTrace;
	Error.stackTraceLimit = Math.max(10, limit);

	// capture the stack
  Error.captureStackTrace(obj);

	var stack = obj.stack.slice(1);

	Error.prepareStackTrace = prep;
	Error.stackTraceLimit = limit;

	return stack;
}

function prepareObjectStackTrace(obj, stack) {
	return stack;
}

const stack = getStack();
console.log(stack);


/***
 * error.code 错误码 NodeJs有多个系统错误码
 * error.message 错误消息
 * error.stack  描述代码中Error被实例化的位置
 */
const error = new Error('hha');
// console.log(error.code);
// console.log(error.message);
// console.log(error.stack);

// AssertionError类
// 继承自<errors.Error> 表明断言失败 详见：assert.AssertionError


/**
 * RangeError类
 * 继承自<errors.Error>
 * 表明提供的参数不在函数的可接受值的集合或范围内 无论是一个数字范围还是
 * 给定的函数参数的选项的集合之外
 */
require('net').connect(-1);
// 抛出 "RangeError："port" option should be >= 0 and < 65536: -1"


/**
 * ReferenceError类
 * 继承自<errors.Error>
 * 表明试图访问一个未定义的变量
 */
doseNotExist;
// 抛出 ReferenceError 未定义


// SyntaxError类
// 表明程序不是有效的JavaScript 语法错误


/**
 * SystemError类
 * 继承自<errors.Error>
 * 当运行环境发生异常时，Node会生成系统错误
 * 1. address <string> 如果存在，则表示网络连接失败的地址
 * 2. code <string>  错误码
 * 3. dest <string>  如果存在，则报告文件系统错误时的文件路径目标
 * 4. errno <number> 系统提供的错误编码
 * 5. info <Object>  如果存在，则有关错误状况的更多详细信息
 * 6. message <string> 系统错误描述
 * 7. path <string> 如果存在，则报告文件系统错误时的文件路径
 * 8. port <number> 如果存在，则说明网络连接端口不可用
 * 9. syscall <string> 触发错误的系统调用的名称 错误地址
 */

// TypeError类
// 继承自<errors.Error>
// 表明提供的参数不是被允许的类型。
