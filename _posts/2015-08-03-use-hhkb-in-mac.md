---
layout: post
title: 使用brew 管理mac php版本
categories: [php]

---


From: <http://yannisxu.me/post/hhkb-chun-xiao-bai-ru-keng-zhi-nan>

### 第一步，购买 

HHKB 号称是一个让你能爱上打字的键盘，每个键盘党必备的神器。根据网上推荐在[萌购][1]上下单，从日本直邮过来，费用总计：`1168 + 71（代购费） + 97（邮费）= 1336`，买的是有刻的 HHKB Pro 2 版本，等待时间大概是一周左右。 

   [1]: http://www.030buy.com/

### 第二步，开箱体验 

#### 跳线设置 

HHBK 总共有 6 个跳线，如果你是 Mac 的用户可以直接设置 2，3 为 ON，其余都为 OFF。1和2跳线，分别可以组成四种模式；而3，4，5，6四个跳线分别代表一个设置。个人需要开启 Macintosh 模式且设置 `Delete` 键为 `BackSpace` 键。跳线详细描述如下：  
![][2]

   [2]: http://7u2j1w.com1.z0.glb.clouddn.com/HHKB-keyboard-layout.jpg

> 小贴士：  
  
`Delete` 和 `BackSpace` 的区别？ 
> 
>   * `Delete` 键的功能是删除插入点后的文字或字符  

>   * `BackSpace` 键功能是删除插入点前的文字或字符

#### 驱动安装 

键盘插上之后会发现，左边的 `Command` 键是没有用的，需要安装[官方的驱动][3]，并重启电脑。 

   [3]: http://www.pfu.co.jp/hhkeyboard/macdownload.html

### 第三步，神器 Karabiner 指南（正餐开始） 

[Karabiner][4] 是一款修改键盘映射功能的软件，功能十分强大，并且是开源的，托管在 [Github][5] 上。如果你是 Vim 或者 Emacs 的用户那么更不能错过这款神器，并且十分容易上手。部分设置截图如下：  
![][6]

   [4]: https://pqrs.org/osx/karabiner/
   [5]: https://github.com/tekezo/Karabinerhttps://github.com/tekezo/Karabiner
   [6]: http://7u2j1w.com1.z0.glb.clouddn.com/HHKB-karabiner.png

#### 设置一，当禁用插入 HHKB 时自动禁用系统键盘 

HHKB 十分轻巧，可以放在 Mac 上，但是偶尔会压倒内置键盘，所以需要自动识别键盘的插入和拔出来自动禁用系统的键盘。只需要在 Change Key 下为这个功能打勾即可生效。 

#### 设置二，将 Option_R 按键设置为右击 

当没有鼠标时，Mac 上要进行右击是一件麻烦的事情，可以使用双指来按下触控板右击，但是经常出现误操作，现在只需要将 Option_R 键映射成右击就可以了，十分方便。 

#### 设置三，映射上下左右键 

HHKB 是一款没有上下左右键的键盘，自带可以使用 `Fn + [/;'` 四个组合键来控制，但是这几个键位全部在键盘右边，双手操作十分麻烦。所以我选择使用 `Option_L + IKJL` 来代替上下左右，当然 Karabiner 还提供了别的组合，比如 `Control_L + EDSF` 等方式。 

#### 设置四，Emacs 模式 

Mac 本身支持了非常基本的 Emacs 快捷键，比如 `Ctrl + a/e`，`Ctrl + k` 等，通过 Karabiner 可以支持更多的快捷键，同一个功能也可以根据你的实际需求来确定使用哪一套快捷键。个人设置如下： 

  * `Ctrl + H` 向前删除一个单词，相当于 `BackSpace`  

  * `Ctrl + P/N/B/F` 为上下左右
  * `Ctrl + I` 为 `Tab` 键
  * `Ctrl + K` 为剪切一行
  * `Ctrl + J` 为 `Enter`
  * `Option + B/F` 为向左/右移动一个单词
  * `Option + D` 向右删除一个单词

#### 设置五，Vim 模式 

  * `Option + V` 启动『Complete Vim』模式，按 `Esc` 键退出
  * `HJKL` 在 『Finder，iPhoto』 下可以作为左/下/上/右进行使用

『Complete Vim』模式可以支持『Complete Vim』，启动之后，可以帮助你在界面中快速跳转和查找。不论是在输入文字还是在浏览界面的时候都可以完美支持。 

#### 其他 

还有一些零碎的快捷键，完全可以根据自己的喜好来设置，如 `Command_R` 映射为 `Delete` 等，更多的功能需要自己慢慢去挖掘。 

还有很多人认为入了 HHKB 会损失 Mac 原有的一些快捷键如 `Launchpad`、`Mission Control` 等，其实不然，通过 `Karabiner` 可以将这些键独立设置快捷键。 

### 结尾，其他建议 

#### Chrome 扩展新神器—— CVim 

[下载地址][7] 需翻墙 

   [7]: https://chrome.google.com/webstore/detail/cvim/ihlenndgcmojhcghmfjfneahoeklbjjh

CVim 比之前火爆的 Vimium 更加强大，例如按下 `V` 键（之前开启 Vim 模式为长按）光标会嵌入网页文字中，按住 `V` 键和 `HJKL` 键可以直接通过键盘选中文本，几乎完全可以抛弃低效的鼠标和触控板。 

#### HHKB 的一些快捷键 

  * `Fn + O/P` 可以调节亮度
  * `Fn + Esc` 可以使电脑休眠
  * `Fn + D` 是静音
  * `Fn + A/S` 是调节音量

全景图如下：  
![][8]

   [8]: http://7u2j1w.com1.z0.glb.clouddn.com/HHKB-hhkb-mac.jpg

(完) 
