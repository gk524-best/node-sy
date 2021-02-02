# Buffer

Javascript 语言自身只有字符串数据类型，没有二进制数据类型。
但在处理像TCP流或者文件流时，必须使用到二进制数据。因此在Node.js中，定义了一个Buffer类，该类用来创建一个专门存放二进制数据的缓存区。

Buffer库为Node.j带来了一种存储原始数据的方法，可以让Node.js处理二进制数据，每当需要在Node.js中处理O/O操作中移动的数据时，就有可能使用Buffer库。原始数据存储在Buffer实例中，一个Buffer类似于一个整数数组，但它对应于V8堆内存之外的一块原始内存。

## Node.js目前支持的字符编码包括：

1. ascii - 仅支持7位ASCII数据。如果去掉高位的话，这种编码是非常快的
2. utf8 - 多字节编码的Unicode字符。许多网页和其他文档格式都使用UTF-8
3. utf16le - 2或4个字节，小字节序编码的Unicide字符。支持代理对(U+10000至U+10FFFF)
4. ucs2-utf16le的别名
5. base64 - Base64编码
6. latin1 - 一种把Buffer编码成一字节编码的字符串的方式
7. binary - latin1的别名
8. hex - 将每个字节编码为两个十六进制字符

# 事件循环
    Node.js 是单进程单线程应用程序，但因为V8引擎提供的异步执行回调接口，通过这些接口可以
处理大量的并发，所以性能非常高。
    Node.js 几乎每一个API都是支持回掉函数的。
    Node.js 基本上所有的事件机制都是设计模式中观察者模式实现。
    Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件
都生成一个事件观察者，如果有事件发生就调用该回调函数。

事件循环的6个阶段：
1.timers阶段：这个阶段执行setTimeout和setInterval预定的callback
2.I/O callback阶段：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()
设定的callbacks这些之外的callbacks
3.idle,prepare阶段：仅node内部使用
4.poll阶段：获取新的I/O事件，适当的条件下node将阻塞在这里
5.check阶段：执行setImmediate()设定的callbacks
6.close callbacks阶段：执行soket.on('close', ...)这些callbacks

## 事件驱动程序
  Node.js使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个
web请求。当这个请求完成，它被放回到处理队列，当到达队列开头，这个结果被返回给用户。这个模型
非常高效可扩展性非常强，因为webserver一直接受请求而不是等待任何读写操作。(这也称之为非阻塞IO或
事件驱动IO)，在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回掉函数。
  Node.js有多个内置的事件，我们可以通过引入events模块，并通过实例化EventEmitter类来绑定和监听
事件。