---
layout: post
title: use path in unix
cat: unix path
---

Sometimes , after install some script (like npm ...) , when use it , we my get the command
```
command not found
```

Two reasons:
1. script not installed
2. can't find script in path

So if is reason 2 ,just put the script dir in your path.


Where is PATH ?

```
echo $PATH

/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/local/mysql/bin:/usr/include/include:/usr/include:/Users/mac/pear/bin:/usr/local/git/bin:/Library/Frameworks/Python.framework/Versions/2.7/bin
```
