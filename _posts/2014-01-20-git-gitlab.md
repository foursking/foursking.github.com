---
layout: post
title: gitlab ssh 提交代码
cat: git
---


最近公司版本管理工具尝试在用`git`，通过`gitlab` 管理代码。总结了ssh pull/push 代码时遇到的问题和解决的方法，供大家参考。


###1.创建ssh 公钥和私钥

```sh
cd ~/.ssh && ssh-keygen #创建ssh key
```

看到如下提示:

```
Generating public/private rsa key pair.
 Enter file in which to save the key (/home/foursk/.ssh/id_rsa): test #输入需要的name
```
创建完之后在 .ssh 目录会看到 两个文件

```sh
test test.pub
```


其中`.pub` 结尾的就是公钥


###2.复制公钥内容粘贴到自己的gitlab

单击gitlab `Add Public Key` 按钮 粘贴内容


###3.设置ssh
创建完`ssh-key`以后，我们需要让git提交的时候能够使用我们的`ssh-key`


```sh
touch ~/.ssh/config   #创建config
```

编辑config

```sh
Host you.host
    Hostname your.host.name
    User git
    IdentityFile ~/.ssh/test
```
重启ssh服务

```sh
service ssh restart
```
