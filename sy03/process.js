// process是全局对象 无需引入也可以引入使用
// 通过process对象，可以获取当前进程的很多信息
// 脱出吗
const process = require('process');
const EventEmitter = require('events');

// process对象是EventEmitter的实例
const bool = process instanceof EventEmitter;
console.log('process是EventEmiiter的实例：', bool);

// 当Node.js清空其事件循环并且没有其他工作要调度时，则会触发beforeExit事件
// 通常，当没有工作被调度时，则Node.js进程会退出，但在beforeExit事件上注册
// 的监听器可以进行异步的调用，从而使Node.js进程继续
// 监听器回调函数被调用时会传入process.exitCode的值作为唯一的参数
// 对于导致显式终止的情况(例如调用process.exit()或未捕获的异常)，则不会触发beforeExit事件
// 除非打算调度额外的工作，否则不应该使用beforeExit代替exit事件
process.on('beforeExit', (code) => {
    console.log('进程beforeExit事件的退出码：', code);
})
process.on('exit', (code) => {
    console.log('进程exit事件的退出码：', code);
})
console.log('此消息会最先显示');

// exit事件
// 1. process.exit()方法显式地调用
// 2. Node.js事件循环不再需要执行任何其他的工作
process.on('exit', (code) => {
    console.log('退出码：', code);
})
console.log('进程即将退出');
