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