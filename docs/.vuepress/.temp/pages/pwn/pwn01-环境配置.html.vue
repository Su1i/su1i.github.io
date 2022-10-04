<template><div><h1 id="_01-pwn环境配置" tabindex="-1"><a class="header-anchor" href="#_01-pwn环境配置" aria-hidden="true">#</a> 01.pwn环境配置</h1>
<p><a name="5f39c2ea"></a></p>
<h2 id="操作系统" tabindex="-1"><a class="header-anchor" href="#操作系统" aria-hidden="true">#</a> 操作系统：</h2>
<p>任意Linux或wsl；推荐：Ubuntu18.04+Ubuntu16.04</p>
<p><a name="2badfcaf"></a></p>
<h2 id="ida-pro7-5-windows" tabindex="-1"><a class="header-anchor" href="#ida-pro7-5-windows" aria-hidden="true">#</a> IDA pro7.5（Windows）：</h2>
<p>链接: <a href="https://pan.baidu.com/s/1pCMudY3RNBLQ3uobf8xBVg" target="_blank" rel="noopener noreferrer">https://pan.baidu.com/s/1pCMudY3RNBLQ3uobf8xBVg<ExternalLinkIcon/></a> 提取码: asqa 复制这段内容后打开百度网盘手机App，操作更方便哦</p>
<p>下载完后解压打开，免安装，双击即可运行；<br /><img src="https://img-blog.csdnimg.cn/20210220151742968.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=Hdbaz&amp;originHeight=44&amp;originWidth=777&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>用来打开32位程序；<br /><img src="https://img-blog.csdnimg.cn/20210220151837224.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=kg7EM&amp;originHeight=41&amp;originWidth=812&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>用来打开64位程序；</p>
<p><a name="pwntools"></a></p>
<h2 id="pwntools" tabindex="-1"><a class="header-anchor" href="#pwntools" aria-hidden="true">#</a> pwntools</h2>
<p>pwntools是python的一个库，目前已适应python3，建议同时安装python2和python3两个版本，使用python2居多。<br />首先pip换源（此方法适用于Linux）：<br />修改 ~/.pip/pip.conf (没有就创建一个)， 内容如下（默认更换清华源，可自行更改）：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后<br />python2：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo pip install pwntools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>python3：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo pip3 install pwntools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成之后还会附带两个小工具：checksec和ROPgadget<br />安装完成后效果：<br /><img src="https://img-blog.csdnimg.cn/20210220151940485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=w2llA&amp;originHeight=267&amp;originWidth=874&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>在python命令行中输入from pwn import *不报错</p>
<p><a name="pwndbg"></a></p>
<h2 id="pwndbg" tabindex="-1"><a class="header-anchor" href="#pwndbg" aria-hidden="true">#</a> pwndbg</h2>
<p>pwndbg是gdb的一个插件，专为pwn而生的，类似的还有gef，peda等<br />首先安装gdb</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt install gdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后安装插件：<br />百度pwndbg，在GitHub界面上有具体介绍，安装方法如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://github.com/pwndbg/pwndbg
cd pwndbg
./setup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果没有git，需要先下载git：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt install git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：安装完之后pwndbg文件夹不能删除！！!<br />安装成功后效果：<br /><img src="https://img-blog.csdnimg.cn/20210220152540926.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=ITdUi&amp;originHeight=627&amp;originWidth=907&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p><a name="one_gadget"></a></p>
<h2 id="one-gadget" tabindex="-1"><a class="header-anchor" href="#one-gadget" aria-hidden="true">#</a> one_gadget</h2>
<p>ruby语言写的小工具，首先需要安装ruby：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt install ruby
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后安装gem：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt install gem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后安装one_gadget</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>gem install one_gadget
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="LibcSeacher"></a></p>
<h2 id="libcseacher" tabindex="-1"><a class="header-anchor" href="#libcseacher" aria-hidden="true">#</a> LibcSeacher</h2>
<p>百度libcseacher，在GitHub页面有简介，安装方法如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://github.com/lieanu/LibcSearcher.git
cd LibcSearcher
python setup.py develop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因年代久远，可能不太准确，推荐以下功能类似的网站：<br /><a href="https://libc.nullbyte.cat/" target="_blank" rel="noopener noreferrer">https://libc.nullbyte.cat/<ExternalLinkIcon/></a><br /><a href="https://libc.blukat.me/" target="_blank" rel="noopener noreferrer">https://libc.blukat.me/<ExternalLinkIcon/></a></p>
</div></template>


