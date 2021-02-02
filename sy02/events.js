// 基础用法
// 1.EventEmitter.on() 注册监听器
// 2.EventEmitter.emit() 触发事件
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
})
myEmitter.emit('event');


// 将参数和this传给监听器
const myEmitter1 = new MyEmitter();
myEmitter1.on('event', function (a, b) {
  console.log(a, b, this, this === myEmitter1);
})
myEmitter1.emit('event', 'a', 'b')
// 用ES6箭头函数作为监听器，this关键词不会指向EventEmitter实例
const myEmitter2 = new MyEmitter();
myEmitter2.on('event', (a, b) => {
  console.log('-------箭头函数作为监听器---------');
  console.log(a, b, this, this === myEmitter2);
});
myEmitter2.emit('event', 'a', 'b')


// 同步与异步
// EventEmitter以注册的顺序同步地调用所有监听器。这样可以确保事件的正确排序，并有助于
// 避免竞态条件和逻辑有误。当适当时，监听器函数可以使用setImmediate()和process.nextTick()
// 方法切换到异步的操作模式
const myEmitter3 = new MyEmitter();
myEmitter3.on('event', (a, b) => {
  console.log('Dalek还在');
  setImmediate(() => {
    console.log('Dalek异步逃走了');
  })
});
myEmitter3.emit('event', 'a', 'b');


// 仅处理事件一次
// 1. 当使用eventEmiiter.on()注册监听器时，监听器会在每次触发 命名事件时被调用
const myEmitter4 = new MyEmitter();
let m = 0;
myEmitter4.on('event', () => {
  console.log(++m);
});
myEmitter4.emit('event');
myEmitter4.emit('event');
// 2. 使用eventEmitter.once()可以注册最多可调用一次的监听器。当事件被触发时，
// 监听器会被注销，然后再调用
const myEmitter5 = new MyEmitter();
let n = 0;
myEmitter5.once('event', () => {
  console.log('仅调用一次！');
  console.log(++n);
});
myEmitter5.emit('event');
myEmitter5.emit('event');


// 错误事件
// 最佳实践，始终为'error'事件注册监听器
const myEmitter6 = new MyEmitter();
myEmitter6.on('error', (err) => {
  console.error(err);
})
myEmitter6.emit('error', new Error('错误'))


EventEmitter.captureRejections = true;
const ee1 = new EventEmitter();
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1.on('error', console.log);

ee1.emit('something');


// EventEmitter 类

