---
layout: post
title: nginx 配置总结
cat: nginx
---

#基本设置

```nginx
#定义Nginx运行的用户和用户组
user www-data www-data;

#nginx进程数，建议设置为等于CPU总核心数。
worker_processes 4;

#进程文件
pid /var/run/nginx.pid;

#一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（系统的值ulimit -n）与nginx进程数相除，但是nginx分配请求并不均匀，所以建议与ulimit -n的值保持一致。
worker_rlimit_nofile 65535;
```


#工作模式与连接数上限

```nginx
events
{
#参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型。
use epoll;
#单个进程最大连接数（最大连接数=连接数*进程数）
worker_connections 65535;
}
```


#设定http服务器

```nginx
http
{
  include mime.types; #文件扩展名与文件类型映射表
  default_type application/octet-stream; #默认文件类型
  #charset utf-8; #默认编码
  server_names_hash_bucket_size 128; #服务器名字的hash表大小
  client_header_buffer_size 32k; #上传文件大小限制
  large_client_header_buffers 4 64k; #设定请求缓
  client_max_body_size 8m; #设定请求缓
  sendfile on; #开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
  autoindex on; #开启目录列表访问，合适下载服务器，默认关闭。
  tcp_nopush on; #防止网络阻塞
  tcp_nodelay on; #防止网络阻塞
  keepalive_timeout 120; #长连接超时时间，单位是秒

  #FastCGI相关参数是为了改善网站的性能：减少资源占用，提高访问速度。下面参数看字面意思都能理解。
  fastcgi_connect_timeout 300;
  fastcgi_send_timeout 300;
  fastcgi_read_timeout 300;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;

  #gzip模块设置
  gzip on; #开启gzip压缩输出
  gzip_min_length 1k; #最小压缩文件大小
  gzip_buffers 4 16k; #压缩缓冲区
  gzip_http_version 1.0; #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
  gzip_comp_level 2; #压缩等级
  gzip_types text/plain application/x-javascript text/css application/xml;
  #压缩类型，默认就已经包含text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。
  gzip_vary on;
  #limit_zone crawler $binary_remote_addr 10m; #开启限制IP连接数的时候需要使用

}
```



http {
	access_log /etc/nginx/logs/access.log;
	error_log /etc/nginx/logs/error.log;

    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" $host';


    #sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    #keepalive_timeout  65;

    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    server_tokens   off;

    #keepalive_timeout  0;
    keepalive_timeout  65;


    gzip on;
    gzip_min_length  2100;
    gzip_buffers     4 8k;
    gzip_types       text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript image/x-icon;

    output_buffers   1 32k;
    postpone_output  1460;
    client_max_body_size 20m;

    client_header_buffer_size 64k;
    large_client_header_buffers 4 128k;

    fastcgi_connect_timeout 3000;
    fastcgi_send_timeout 3000;
    fastcgi_read_timeout 3000;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 128k;
    fastcgi_intercept_errors on; ### resolve the problem: no input file specified


     #include vhost
	 include /etc/nginx/conf.d/*.conf;
     include  /etc/nginx/vhosts/*.conf;

}
