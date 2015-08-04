---
layout: post
title: OSX 中vim的复制和粘贴
categories: [vim]
---

###Term2 + Vim 下的复制粘贴

安装 Vim 时如果打开了 clipboard 特性 ( `vim --version | grep clipboard`，系统自带的 Vim 是没有打开的，不想自己编译的话也可以通过安装 Macvim 然后将 vim alias 到 mvim )，则可以使用 * 寄存器（ Vim 有很多剪贴板，mac 下的系统剪贴板是 *，还有 + ?），通过 `"*y` 和 `"*p` 就可以完成复制粘贴到系统剪贴板，在 `.vimrc` 里加入了`set cilpboard=unnamed`后就不用加 `"*` 直接 `yy` 了。没有`+clipboard`的话也没关系，我们还有 mac 下的 `pbcopy` 和 `pbpaste` 命令可以使用。

{% highlight vim %}
vmap "+y :w !pbcopy<CR><CR>
nmap "+p :r !pbpaste<CR><CR>
{% endhighlight %}


###iTerm2+Tmux+Vim 下的复制粘贴

不过同时作为一个 Tmux 用户，一般情况下Vim里的复制会遇到问题。Tmux 自己有提供一套复制粘贴功能，通过 Tmux 自己的复制机制只是将选中的内容复制到自己的 buffer 中，而由于我没怎么搞清的（权限相关）原因， Tmux 自己又不能访问系统剪贴板，所以直接在 Vim 里复制到系统剪贴板（以及从系统剪贴板拿东西）是不行的。reattach-to-user-namespace 则是用来解决 tmux 中 pbcopy 和 pbpaste 不能正常访问的问题，具体是什么问题而又怎么解决反正我也不是很懂去链接里看吧。。。

打开 Vim 对系统 clipboard 支持（可以自己编译或通过安装 Macvim 解决）。
brew 安装 reattach-to-user-namespace
.vimrc 中加入 set cilpboard=unnamed
在 .tmux.conf 中加入

set-option -g default-command "reattach-to-user-namespace -l zsh"

###Tmux pannel中的复制

如果一个 Tmux window 中有两个水平的 pannel ，直接用鼠标选中然后复制是不能分辨 pannel 的，即复制一行会贯穿两个 pannel 。


添加以下到 `.tmux.conf`

{% highlight vim %}
# Use vim keybindings in copy mode
setw -g mode-keys vi

# Setup 'v' to begin selection as in Vim （seems require Tmux 1.8）

# 一般情况中，<prefix>-[ 进入复制模式后 <space> 开始选中，<enter> 结束选中 (copy to buffer)

bind-key -t vi-copy v begin-selection
bind-key -t vi-copy y copy-pipe "reattach-to-user-namespace pbcopy"

# Update default binding of `Enter` to also use copy-pipe
unbind -t vi-copy Enter
bind-key -t vi-copy Enter copy-pipe "reattach-to-user-namespace pbcopy"

`<prefix>-[ `进入 Tmux 的复制模式，使用 Vim 操作来进行移动，v 选中内容，y 进行复制，首先内容会复制到 Tmux 的 paste buffer 中，再由 pbcopy 来复制到系统的剪贴板中。
{% endhighlight %}

###vim 的 paste mode

Vim中 ⌘+V 的粘贴
有时候如果我们想用 `⌘+v` 来进行粘贴，直接粘贴的话内容是一段一段复制进去的，并且还伴有一些我们不希望出现的缩进或者其它奇怪的东西，我们可以进入 Vim 的 paste mode 来进行正常的粘贴。

{% highlight vim %}
:set paste "开启paste 模式
:set nopaste "关闭paste 模式
:set pastetoggle "toggle 模式
{% endhighlight %}
