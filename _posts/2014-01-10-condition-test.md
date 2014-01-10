---
layout: post
title: shell 流控制
cat: shell
---

## shell流控制分类
* 判断 if
* 分支判断case
* 循环 for
* 循环 while
* 循环 until

 其实概括起来，只是2类结构而已：`判断和循环`




```sh
#!/bin/sh
if [commend1];then
    commend2
    ......
else
    commend3
    ......
fi
```

###if条件判断

* 字符串判断
    * str1 = str2　　　　　　当两个串有相同内容、长度时为真
    * str1 != str2　　　　　 当串str1和str2不等时为真
    * -n str1　　　　　　　 当串的长度大于0时为真(串非空)
    * -z str1　　　　　　　 当串的长度为0时为真(空串)
    * str1　　　　　　　　   当串str1为非空时为真

* 数字的判断
    * int1 -eq int2　　　　两数相等为真
    * int1 -ne int2　　　　两数不等为真
    * int1 -gt int2　　　　int1大于int2为真
    * int1 -ge int2　　　　int1大于等于int2为真
    * int1 -lt int2　　　　int1小于int2为真
    * int1 -le int2　　　　int1小于等于int2为真

* 文件的判断
    * -r file　　　　　用户可读为真
    * -w file　　　　　用户可写为真
    * -x file　　　　　用户可执行为真
    * -f file　　　　　文件为正规文件为真
    * -d file　　　　　文件为目录为真
    * -c file　　　　　文件为字符特殊文件为真
    * -b file　　　　　文件为块特殊文件为真
    * -s file　　　　　文件大小非0时为真
    * -t file　　　　　当文件描述符(默认为1)指定的设备为终端时为真

###简单脚本示例

```sh
#!/bin/bash
i="shell"
if [ "$i"=="shell" ]; then
    echo $i
else
    echo "not shell"
fi
```
###总结的注意点
1. 有点不习惯书写方式 如表达式 $i==shell 也成立 作为一个写php的觉得很不习惯
2. `[]` 左右都要留一个空格
3. `==` 两边最好都要用`""`扩起来,防止有特殊的变量
4. 不要忘记fi
