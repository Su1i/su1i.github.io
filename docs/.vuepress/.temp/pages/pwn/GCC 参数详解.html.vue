<template><div><h1 id="gcc参数详解" tabindex="-1"><a class="header-anchor" href="#gcc参数详解" aria-hidden="true">#</a> GCC参数详解</h1>
<p><a name="ff7c7524"></a></p>
<h2 id="pwn——gcc编译中几种保护打开和关闭的参数" tabindex="-1"><a class="header-anchor" href="#pwn——gcc编译中几种保护打开和关闭的参数" aria-hidden="true">#</a> PWN——GCC编译中几种保护打开和关闭的参数</h2>
<ul>
<li>NX：-z execstack / -z noexecstack (关闭 / 开启)    栈不可执行，开启后不会把栈上的数据当作代码来执行</li>
<li>Canary：-fno-stack-protector /-fstack-protector / -fstack-protector-all (关闭 / 开启 / 全开启)  打开后会向栈中插入一段特殊数据，在函数返回的时候验证这段特殊数据是否被改变，如果改变，则终止该程序。防止栈溢出。</li>
<li>PIE：-no-pie / -pie (关闭 / 开启)   地址随机化</li>
<li>RELRO：-z norelro / -z lazy / -z now (关闭 / 部分开启 / 完全开启)  对GOT表具有写权限</li>
<li>-static：此选项将禁止使用动态库，所以，编译出来的东西，一般都很大，也不需要什么动态连接库，就可以运行。</li>
</ul>
<p><a name="a37419d9"></a></p>
<h2 id="gcc-参数详解" tabindex="-1"><a class="header-anchor" href="#gcc-参数详解" aria-hidden="true">#</a> GCC 参数详解</h2>
<p>gcc 与 g++ 分别是 gnu 的 c &amp; c++ 编译器 gcc/g++ 在执行编译工作的时候，总共需要4步：</p>
<ol>
<li>预处理,生成 .i 的文件[预处理器cpp]</li>
<li>将预处理后的文件转换成汇编语言, 生成文件 .s [编译器egcs]</li>
<li>有汇编变为目标代码(机器代码)生成 .o 的文件[汇编器as]</li>
<li>连接目标代码, 生成可执行程序 [链接器ld]</li>
</ol>
<p><a name="6ea29ecf"></a></p>
<h3 id="参数详解" tabindex="-1"><a class="header-anchor" href="#参数详解" aria-hidden="true">#</a> 参数详解</h3>
<p><strong>-x language filename</strong></p>
<p>设定文件所使用的语言, 使后缀名无效, 对以后的多个有效。也就是根据约定 C 语言的后缀名称是 .c 的，而 C++ 的后缀名是 .C 或者 .cpp, 如果你很个性，决定你的 C 代码文件的后缀名是 .pig 哈哈，那你就要用这个参数, 这个参数对他后面的文件名都起作用，除非到了下一个参数的使用。 可以使用的参数吗有下面的这些：'c', 'objective-c', 'c-header', 'c++', 'cpp-output', 'assembler', 与 'assembler-with-cpp'。</p>
<p>看到英文，应该可以理解的。</p>
<p>例子用法:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">-x</span> c hello.pig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>-x none filename</strong></p>
<p>关掉上一个选项，也就是让gcc根据文件名后缀，自动识别文件类型 。</p>
<p>例子用法:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">-x</span> c hello.pig <span class="token parameter variable">-x</span> none hello2.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>-c</strong></p>
<p>只激活预处理,编译,和汇编,也就是他只把程序做成obj文件</p>
<p>例子用法:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">-c</span> hello.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>他将生成 .o 的 obj 文件</p>
<p><strong>-S</strong></p>
<p>只激活预处理和编译，就是指把文件编译成为汇编代码。</p>
<p>例子用法:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> gcc <span class="token parameter variable">-S</span> hello.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>他将生成 .s 的汇编代码，你可以用文本编辑器察看。</p>
<p><strong>-E</strong></p>
<p>只激活预处理,这个不生成文件, 你需要把它重定向到一个输出文件里面。</p>
<p>例子用法:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">-E</span> hello.c <span class="token operator">></span> pianoapan.txt 
gcc <span class="token parameter variable">-E</span> hello.c <span class="token operator">|</span> <span class="token function">more</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>慢慢看吧, 一个 hello word 也要与处理成800行的代码。</p>
<p><strong>-o</strong></p>
<p>制定目标名称, 默认的时候, gcc 编译出来的文件是 a.out, 很难听, 如果你和我有同感，改掉它, 哈哈。</p>
<p>例子用法:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">-o</span> hello.exe hello.c <span class="token punctuation">(</span>哦,windows用习惯了<span class="token punctuation">)</span> 
　　gcc <span class="token parameter variable">-o</span> hello.asm <span class="token parameter variable">-S</span> hello.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>-pipe</strong></p>
<p>使用管道代替编译中临时文件, 在使用非 gnu 汇编工具的时候, 可能有些问题。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">-pipe</span> <span class="token parameter variable">-o</span> hello.exe hello.c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>-ansi</strong></p>
<p>关闭 gnu c中与 ansi c 不兼容的特性, 激活 ansi c 的专有特性（包括禁止一些 asm inline typeof 关键字, 以及 UNIX,vax 等预处理宏）。<br /><strong>-fno-asm</strong></p>
<p>此选项实现 ansi 选项的功能的一部分，它禁止将 asm, inline 和 typeof 用作关键字。</p>
<p><strong>-fno-strict-prototype</strong></p>
<p>只对 g++ 起作用, 使用这个选项, g++ 将对不带参数的函数,都认为是没有显式的对参数的个数和类型说明,而不是没有参数。</p>
<p>而 gcc 无论是否使用这个参数, 都将对没有带参数的函数, 认为城没有显式说明的类型。</p>
<p><strong>-fthis-is-varialble</strong></p>
<p>就是向传统 c++ 看齐, 可以使用 this 当一般变量使用。</p>
<p><strong>-fcond-mismatch</strong></p>
<p>允许条件表达式的第二和第三参数类型不匹配, 表达式的值将为 void 类型。</p>
<p><strong>-funsigned-char 、-fno-signed-char、-fsigned-char 、-fno-unsigned-char</strong></p>
<p>这四个参数是对 char 类型进行设置, 决定将 char 类型设置成 unsigned char(前两个参数)或者 signed char(后两个参数)。</p>
<p><strong>-include file</strong></p>
<p>包含某个代码,简单来说,就是便以某个文件,需要另一个文件的时候,就可以用它设定,功能就相当于在代码中使用 #include。</p>
<p>例子用法:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc hello.c <span class="token parameter variable">-include</span> /root/pianopan.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>-imacros file</strong></p>
<p>将 file 文件的宏, 扩展到 gcc/g++ 的输入文件, 宏定义本身并不出现在输入文件中。</p>
<p><strong>-Dmacro</strong></p>
<p>相当于 C 语言中的 #define macro</p>
<p><strong>-Dmacro=defn</strong></p>
<p>相当于 C 语言中的 #define macro=defn</p>
<p><strong>-Umacro</strong></p>
<p>相当于 C 语言中的 #undef macro</p>
<p><strong>-undef</strong></p>
<p>取消对任何非标准宏的定义</p>
<p><strong>-Idir</strong></p>
<p>在你是用 #include &quot;file&quot; 的时候, gcc/g++ 会先在当前目录查找你所制定的头文件, 如果没有找到, 他回到默认的头文件目录找, 如果使用 -I 制定了目录,他会先在你所制定的目录查找, 然后再按常规的顺序去找。</p>
<p>对于 #include, gcc/g++ 会到 -I 制定的目录查找, 查找不到, 然后将到系统的默认的头文件目录查找 。</p>
<p><strong>-I-</strong></p>
<p>就是取消前一个参数的功能, 所以一般在 -Idir 之后使用。</p>
<p><strong>-idirafter dir</strong></p>
<p>在 -I 的目录里面查找失败, 讲到这个目录里面查找。</p>
<p><strong>-iprefix prefix 、-iwithprefix dir</strong></p>
<p>一般一起使用, 当 -I 的目录查找失败, 会到 prefix+dir 下查找</p>
<p><strong>-nostdinc</strong></p>
<p>使编译器不再系统默认的头文件目录里面找头文件, 一般和 -I 联合使用,明确限定头文件的位置。</p>
<p><strong>-nostdin C++</strong></p>
<p>规定不在 g++ 指定的标准路经中搜索, 但仍在其他路径中搜索, 此选项在创 libg++ 库使用 。</p>
<p><strong>-C</strong></p>
<p>在预处理的时候, 不删除注释信息, 一般和-E使用, 有时候分析程序，用这个很方便的。</p>
<p><strong>-M</strong></p>
<p>生成文件关联的信息。包含目标文件所依赖的所有源代码你可以用 gcc -M hello.c 来测试一下，很简单。</p>
<p><strong>-MM</strong></p>
<p>和上面的那个一样，但是它将忽略由 #include 造成的依赖关系。</p>
<p><strong>-MD</strong></p>
<p>和-M相同，但是输出将导入到.d的文件里面</p>
<p><strong>-MMD</strong></p>
<p>和 -MM 相同，但是输出将导入到 .d 的文件里面。</p>
<p><strong>-Wa,option</strong></p>
<p>此选项传递 option 给汇编程序; 如果 option 中间有逗号, 就将 option 分成多个选项, 然 后传递给会汇编程序。</p>
<p><strong>-Wl.option</strong></p>
<p>此选项传递 option 给连接程序; 如果 option 中间有逗号, 就将 option 分成多个选项, 然 后传递给会连接程序。</p>
<p><strong>-llibrary</strong></p>
<p>制定编译的时候使用的库</p>
<p>例子用法</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">-lcurses</span> hello.c　　
使用 ncurses 库编译程序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>-Ldir</strong></p>
<p>制定编译的时候，搜索库的路径。比如你自己的库，可以用它制定目录，不然编译器将只在标准库的目录找。这个dir就是目录的名称。</p>
<p><strong>-O0 、-O1 、-O2 、-O3</strong></p>
<p>编译器的优化选项的 4 个级别，-O0 表示没有优化, -O1 为默认值，-O3 优化级别最高。</p>
<p><strong>-g</strong></p>
<p>只是编译器，在编译的时候，产生调试信息。</p>
<p><strong>-gstabs</strong></p>
<p>此选项以 stabs 格式声称调试信息, 但是不包括 gdb 调试信息。</p>
<p><strong>-gstabs+</strong></p>
<p>此选项以 stabs 格式声称调试信息, 并且包含仅供 gdb 使用的额外调试信息。</p>
<p><strong>-ggdb</strong></p>
<p>此选项将尽可能的生成 gdb 的可以使用的调试信息。</p>
<p><strong>-static</strong></p>
<p>此选项将禁止使用动态库，所以，编译出来的东西，一般都很大，也不需要什么动态连接库，就可以运行。</p>
<p><strong>-share</strong></p>
<p>此选项将尽量使用动态库，所以生成文件比较小，但是需要系统由动态库。</p>
<p><strong>-traditional</strong></p>
<p>试图让编译器支持传统的C语言特性。</p>
<p>GCC 是 GNU 的 C 和 C++ 编译器。实际上，GCC 能够编译三种语言：C、C++ 和 Object C（C 语言的一种面向对象扩展）。利用 gcc 命令可同时编译并连接 C 和 C++ 源程序。</p>
<p>如果你有两个或少数几个 C 源文件，也可以方便地利用 GCC 编译、连接并生成可执行文件。例如，假设你有两个源文件 main.c 和 factorial.c 两个源文件，现在要编 译生成一个计算阶乘的程序。</p>
<p>factorial.c 文件代码</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">factorial</span> <span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> 
<span class="token punctuation">{</span> 
　　<span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> 
　　　<span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> 
　　<span class="token keyword">else</span> 
　　　<span class="token keyword">return</span> <span class="token function">factorial</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> n<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
main<span class="token punctuation">.</span>c 文件代码
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span>　<span class="token string">&lt;stdio.h></span> </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span>　<span class="token string">&lt;unistd.h></span> </span>
<span class="token keyword">int</span> <span class="token function">factorial</span> <span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span> 
<span class="token punctuation">{</span> 
　　<span class="token keyword">int</span> n<span class="token punctuation">;</span> 
　　<span class="token keyword">if</span> <span class="token punctuation">(</span>argc <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> 
　　<span class="token punctuation">{</span> 
　　　　<span class="token function">printf</span> <span class="token punctuation">(</span><span class="token string">"Usage: %s n\n"</span><span class="token punctuation">,</span> argv <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
　　　　<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> 
　　<span class="token punctuation">}</span> 
　　<span class="token keyword">else</span> 
　　<span class="token punctuation">{</span> 
　　　n <span class="token operator">=</span> <span class="token function">atoi</span> <span class="token punctuation">(</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
　　　<span class="token function">printf</span> <span class="token punctuation">(</span><span class="token string">"Factorial of %d is %d.\n"</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> <span class="token function">factorial</span> <span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
　　 <span class="token punctuation">}</span> 
　　<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用如下的命令可编译生成可执行文件，并执行程序：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ gcc <span class="token parameter variable">-o</span> factorial main.c factorial.c 
$ ./factorial <span class="token number">5</span> 
Factorial of <span class="token number">5</span> is <span class="token number">120</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GCC 可同时用来编译 C 程序和 C++ 程序。一般来说，C 编译器通过源文件的后缀名来判断是 C 程序还是 C++ 程序。在 Linux 中，C 源文件的后缀名为 .c，而 C++ 源文件的后缀名为 .C 或 .cpp。但是，gcc 命令只能编译 C++ 源文件，而不能自动和 C++ 程序使用的库连接。因此，通常使用 g++ 命令来完成 C++ 程序的编译和连接，该程序会自动调用 gcc 实现编译。假设我们有一个如下的 C++ 源文件（hello.c）：</p>
<p>hello.c 文件代码</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream></span> </span>
<span class="token keyword">void</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> 
<span class="token punctuation">{</span> 
　　cout <span class="token operator">&lt;&lt;</span> <span class="token string">"Hello, world!"</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>则可以如下调用 g++ 命令编译、连接并生成可执行文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ g++ <span class="token parameter variable">-o</span> hello hello.c 
$ ./hello 
Hello, world<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="fe68e2e8"></a></p>
<h3 id="gcc-命令的常用选项" tabindex="-1"><a class="header-anchor" href="#gcc-命令的常用选项" aria-hidden="true">#</a> gcc 命令的常用选项</h3>
<table>
<thead>
<tr>
<th>选项</th>
<th>解释</th>
</tr>
</thead>
<tbody>
<tr>
<td>-ansi</td>
<td>只支持 ANSI 标准的 C 语法。这一选项将禁止 GNU C 的某些特色， 例如 asm 或 typeof 关键词。</td>
</tr>
<tr>
<td>-c</td>
<td>只编译并生成目标文件。</td>
</tr>
<tr>
<td>-DMACRO</td>
<td>以字符串&quot;1&quot;定义 MACRO 宏。</td>
</tr>
<tr>
<td>-DMACRO=DEFN</td>
<td>以字符串&quot;DEFN&quot;定义 MACRO 宏。</td>
</tr>
<tr>
<td>-E</td>
<td>只运行 C 预编译器。</td>
</tr>
<tr>
<td>-g</td>
<td>生成调试信息。GNU 调试器可利用该信息。</td>
</tr>
<tr>
<td>-IDIRECTORY</td>
<td>指定额外的头文件搜索路径DIRECTORY。</td>
</tr>
<tr>
<td>-LDIRECTORY</td>
<td>指定额外的函数库搜索路径DIRECTORY。</td>
</tr>
<tr>
<td>-lLIBRARY</td>
<td>连接时搜索指定的函数库LIBRARY。</td>
</tr>
<tr>
<td>-m486</td>
<td>针对 486 进行代码优化。</td>
</tr>
<tr>
<td>-o FILE</td>
<td>生成指定的输出文件。用在生成可执行文件时。</td>
</tr>
<tr>
<td>-O0</td>
<td>不进行优化处理。</td>
</tr>
<tr>
<td>-O 或 -O1</td>
<td>优化生成代码。</td>
</tr>
<tr>
<td>-O2</td>
<td>进一步优化。</td>
</tr>
<tr>
<td>-O3</td>
<td>比 -O2 更进一步优化，包括 inline 函数。</td>
</tr>
<tr>
<td>-shared</td>
<td>生成共享目标文件。通常用在建立共享库时。</td>
</tr>
<tr>
<td>-static</td>
<td>禁止使用共享连接。</td>
</tr>
<tr>
<td>-UMACRO</td>
<td>取消对 MACRO 宏的定义。</td>
</tr>
<tr>
<td>-w</td>
<td>不生成任何警告信息。</td>
</tr>
<tr>
<td>-Wall</td>
<td>生成所有警告信息。</td>
</tr>
</tbody>
</table>
</div></template>


