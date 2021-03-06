---
layout: post
title: 使用brew 管理mac php版本
categories: [php]

---

> 昨天随手一点`brew upadte & brew upgrade`后phpunit出现了各种F，细查下来原来是 php 5.5.17 的一个[bug fix][1] 引起的。为了暂时正常使用phpunit，只能回退php的版本。 

   [1]: https://bugs.php.net/bug.php?id=67839

## 版本切换方式 

通过brew安装的php可以通过`brew link`和`brew unlink`来切换不同版本。 

例如 
    
    brew list
    brew unlink php56
    brew link php55
    

大版本可以用`brew list`来查，如果是小版本的话只能去`/usr/local/Cellar/php55`看了。这个时候使用`php-version`可以更方便一点。 

## 安装`php-version`

[php-version][2]是一个帮助管理从brew安装的php版本切换的工具。 

   [2]: https://github.com/wilmoore/php-version

安装非常简单 
    
    brew install php-version
    

然后执行 
    
    source $(brew --prefix php-version)/php-version.sh && php-version 5
    

## 使用`php-version`

直接执行 
    
    php-version
    

就可以看到现有的版本，比如我自己的 
    
    $ php-version
      5.5.15
    * 5.5.16
      5.5.17
    

然后使用以下命令切换即可 
    
    php-version 5.5.15
    

再看php的版本，已经切换好了。 


