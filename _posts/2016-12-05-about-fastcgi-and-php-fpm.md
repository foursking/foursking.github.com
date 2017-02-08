---
layout: post
title: 关于CGI 和 PHP-FPM的一些事情
categories: [php]

---


From: <http://www.cleey.com/blog/single/id/848.html>



# 关于CGI 和 PHP-FPM的一些事情

首先我们引入一些概念，搞清楚 CGI 和 FastCGI

CGI

> **通用网关接口**（**C**ommon **G**ateway **I**nterface/**CGI**）是一种重要的互联网技术，可以让一个客户端，从网页浏览器向执行在网络服务器上的程序请求数据。CGI描述了服务器和请求处理程序之间传输数据的一种标准。  

FastCGI

> **快速通用网关接口**（**Fast** **C**ommon **G**ateway **I**nterface／**FastCGI**）是一种让交互程序与Web服务器通信的协议。FastCGI是早期通用网关接口（CGI）的增强版本。
> 
> FastCGI致力于减少网页服务器与[CGI][1]程序之间互动的开销，从而使[服务器][2]可以同时处理更多的网页请求。

好现在明白了

> CGI 和 FastCGI 是一种通信协议规范，不是一个实体

我们平常需要用词规范，是**CGI** 还是 **CGI程序**  

> CGI 程序和FastCGI程序，是指实现这两个协议的程序，可以是任何语言实现这个协议的。（PHP-CGI 和 PHP-FPM就是实现FastCGI的程序）

**为什么推荐使用FastCGI程序**

除了上面对两个协议的描述外，这里再补充下他们实现的程序的区别。

关于CGI程序

> CGI使外部程序与Web服务器之间交互成为可能。CGI程序运行在独立的进程中，并对每个Web请求建立一个进程，这种方法非常容易实现，但效率很差，难以扩展。面对大量请求，进程的大量建立和消亡使操作系统性能大大下降。此外，由于地址空间无法共享，也限制了资源重用。

关于FastCGI程序

> 与为每个请求创建一个新的进程不同，FastCGI使用持续的进程来处理一连串的请求。这些进程由FastCGI服务器管理，而不是web服务器。 当进来一个请求时，web服务器把环境变量和这个页面请求通过一个socket比如FastCGI进程与web服务器(都位于本地）或者一个TCP connection（FastCGI进程在远端的server farm）传递给FastCGI进程。  

FastCGI为了提高CGI的效率而存在的。

**PHP-CGI 和 PHP-FPM的区别**

PHP-CGI是PHP自带的FastCGI管理器。启动PHP-CGI，使用如下命令：
    
    
    php-cgi -b 127.0.0.1:9000

php-cgi与php-fpm一样，也是一个fastcgi进程管理器，php-cgi的问题在于 1、php-cgi变更php.ini配置后需重启php-cgi才能让新的php-ini生效，不可以平滑重启 2、直接杀死php-cgi进程,php就不能运行了。(PHP-FPM和Spawn-FCGI就没有这个问题,守护进程会平滑从新生成新的子进程。） 针对php-cgi的不足，php-fpm应运而生。  

PHP-FPM 的管理对象是php-cgi。使用PHP-FPM来控制PHP-CGI的FastCGI进程  

**Nginx 如何调用PHP**

web server（比如说nginx）只是内容的分发者。比如，如果请求/index.html，那么web server会去文件系统中找到这个文件，发送给浏览器，这里分发的是静态数据。好了，如果现在请求的是/index.php，根据配置文件，nginx知道这个不是静态文件，需要去找PHP解析器来处理，那么他会把这个请求简单处理后交给PHP解析器。Nginx会传哪些数据给PHP解析器呢？url要有吧，查询字符串也得有吧，POST数据也要有，HTTP header不能少吧，好的，CGI就是规定要传哪些数据、以什么样的格式传递给后方处理这个请求的协议。仔细想想，你在PHP代码中使用的用户从哪里来的。

当web server收到/index.php这个请求后，会启动对应的CGI程序，这里就是PHP的解析器。接下来PHP解析器会解析php.ini文件，初始化执行环境，然后处理请求，再以规定CGI规定的格式返回处理后的结果，退出进程。web server再把结果返回给浏览器。

**Apache如何调用PHP**

Apache 有个mod_php 扩展。php是apache的一个外挂程序，必须依靠web服务器才可以运行。当客户端浏览器触发事件--->url 提交到apache服务器---->apache服务器根据php程序的特点判断是php程序，提交给php引擎程序--->php引擎程序解析并读取数据库生成相应的页面  

**FastCGI运行模式分析：**

FastCGI的工作原理是：

(1)、Web Server 启动时载入FastCGI进程管理器【PHP的FastCGI进程管理器是PHP-FPM(php-FastCGI Process Manager)】（IIS ISAPI或Apache Module);  
(2)、FastCGI进程管理器自身初始化，启动多个CGI解释器进程 (在任务管理器中可见多个php-cgi.exe)并等待来自Web Server的连接。  
(3)、当客户端请求到达Web Server时，FastCGI进程管理器选择并连接到一个CGI解释器。Web server将CGI环境变量和标准输入发送到FastCGI子进程php-cgi.exe。   
(4)、FastCGI子进程完成处理后将标准输出和错误信息从同一连接返回Web Server。当FastCGI子进程关闭连接时，请求便告处理完成。FastCGI子进程接着等待并处理来自FastCGI进程管理器（运行在 WebServer中）的下一个连接。 在正常的CGI模式中，php-cgi.exe在此便退出了。

在上述情况中，你可以想象 CGI通常有多慢。每一个Web请求PHP都必须重新解析php.ini、重新载入全部dll扩展并重初始化全部数据结构。使用FastCGI，所有这些 都只在进程启动时发生一次。一个额外的好处是，持续数据库连接(Persistent database connection)可以工作。

 

**为什么要使用FastCGI，而不是多线程CGI解释器？**  
这可能出于多方面的考虑，例如：  
(1)、你无论如何也不能在windows平台上稳定的使用多线程CGI解释器，无论是IIS ISAPI方式还是APACHE Module方式，它们总是运行一段时间就崩溃了。奇怪么？但是确实存在这样的情况！  
当然，也有很多时候你能够稳定的使用多线程CGI解释器，但是，你有可能发现网页有时候会出现错误，无论如何也找不到原因，而换用FastCGI方式 时这种错误的概率会大大的降低。我也不清楚这是为什么，我想独立地址空间的CGI解释器可能终究比共享地址空间的形式来得稳定一点点。  
(2)、性能！性能？可能么，难道FastCGI比多线程CGI解释器更快？但有时候确实是这样，只有测试一下你的网站，才能最后下结论。原因嘛，我觉得 很难讲，但有资料说在Zend WinEnabler的时代，Zend原来也是建议在Windows平台下使用FastCGI而不是IIS ISAPI或Apache Module，不过现在Zend已经不做这个产品了。

 

**FastCGI 模式运行PHP 的优点：**

以 FastCGI 模式运行 PHP 有几个主要的好处。首先就是 PHP 出错的时候不会搞垮 Apache，只是 PHP 自己的进程当掉（但 FastCGI 会立即重新启动一个新 PHP 进程来代替当掉的进程）。其次 FastCGI 模式运行 PHP 比 ISAPI 模式性能更好（我本来用 ApacheBench 进行了测试，但忘了保存结果，大家有兴趣可以自己测试）。



