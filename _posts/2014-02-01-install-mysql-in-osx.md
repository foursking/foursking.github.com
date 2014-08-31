---
layout: post
title: Mac通过homebrew 安装mysql
cat: brew mysql
---

通过brew安装mysql:

```shell
brew install mysql
```

等成功安装完成，想要登录的时候出问题了：

```shell
ERROR 2002 (HY000): Can not connect to local MySQL server through socket '/tmp/mysql.sock' (2)
```
google了一下，找到答案原来，还没彻底安装完成：

```shell
brew info mysql
```

可以看到如下命令，执行之:

```shell
ln -sfv /usr/local/opt/mysql/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents
```

下面我们还需要启动mysql服务：

```shell
mysql.server start
```

用如下命令登录即可：

```shell
mysql -uroot  #初始没有设置密码
```

mysql 修改root密码

```mysql
$ mysql -u root
mysql> use mysql;
mysql> update user set password=PASSWORD("NEWPASSWORD") where User='root';
mysql> flush privileges;
mysql> quit
```

done!
