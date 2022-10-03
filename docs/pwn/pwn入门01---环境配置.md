# 01.pwn环境配置
<a name="5f39c2ea"></a>
## 操作系统：

 任意Linux或wsl；推荐：Ubuntu18.04+Ubuntu16.04

<a name="2badfcaf"></a>
## IDA pro7.5（Windows）：

链接: [https://pan.baidu.com/s/1pCMudY3RNBLQ3uobf8xBVg](https://pan.baidu.com/s/1pCMudY3RNBLQ3uobf8xBVg) 提取码: asqa 复制这段内容后打开百度网盘手机App，操作更方便哦

下载完后解压打开，免安装，双击即可运行；<br />![](https://img-blog.csdnimg.cn/20210220151742968.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=Hdbaz&originHeight=44&originWidth=777&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

用来打开32位程序；<br />![](https://img-blog.csdnimg.cn/20210220151837224.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=kg7EM&originHeight=41&originWidth=812&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

用来打开64位程序；

<a name="pwntools"></a>
## pwntools

pwntools是python的一个库，目前已适应python3，建议同时安装python2和python3两个版本，使用python2居多。<br />首先pip换源（此方法适用于Linux）：<br />修改 ~/.pip/pip.conf (没有就创建一个)， 内容如下（默认更换清华源，可自行更改）：

```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

然后<br />python2：

```
sudo pip install pwntools
```

python3：

```
sudo pip3 install pwntools
```

安装完成之后还会附带两个小工具：checksec和ROPgadget<br />安装完成后效果：<br />![](https://img-blog.csdnimg.cn/20210220151940485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=w2llA&originHeight=267&originWidth=874&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

在python命令行中输入from pwn import *不报错

<a name="pwndbg"></a>
## pwndbg

pwndbg是gdb的一个插件，专为pwn而生的，类似的还有gef，peda等<br />首先安装gdb

```
sudo apt install gdb
```

然后安装插件：<br />百度pwndbg，在GitHub界面上有具体介绍，安装方法如下：

```
git clone https://github.com/pwndbg/pwndbg
cd pwndbg
./setup.sh
```

如果没有git，需要先下载git：

```
sudo apt install git
```

注意：安装完之后pwndbg文件夹不能删除！！!<br />安装成功后效果：<br />![](https://img-blog.csdnimg.cn/20210220152540926.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=ITdUi&originHeight=627&originWidth=907&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="one_gadget"></a>
## one_gadget

ruby语言写的小工具，首先需要安装ruby：

```
sudo apt install ruby
```

然后安装gem：

```
sudo apt install gem
```

然后安装one_gadget

```
gem install one_gadget
```

<a name="LibcSeacher"></a>
## LibcSeacher

百度libcseacher，在GitHub页面有简介，安装方法如下：

```
git clone https://github.com/lieanu/LibcSearcher.git
cd LibcSearcher
python setup.py develop
```

因年代久远，可能不太准确，推荐以下功能类似的网站：<br />[https://libc.nullbyte.cat/](https://libc.nullbyte.cat/)<br />[https://libc.blukat.me/](https://libc.blukat.me/)
