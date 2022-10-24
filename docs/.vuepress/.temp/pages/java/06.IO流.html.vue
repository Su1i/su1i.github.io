<template><div><h1 id="_06-io流" tabindex="-1"><a class="header-anchor" href="#_06-io流" aria-hidden="true">#</a> 06.IO流</h1>
<h2 id="_1-file" tabindex="-1"><a class="header-anchor" href="#_1-file" aria-hidden="true">#</a> 1. File</h2>
<h3 id="_1-1-概述" tabindex="-1"><a class="header-anchor" href="#_1-1-概述" aria-hidden="true">#</a> 1.1 概述</h3>
<p>File对象主要是用来表示文件或者是目录的路径的。类中提供了很多对文件或者文件夹操作的常用方法。</p>
<p>​</p>
<h3 id="_1-2-创建对象" tabindex="-1"><a class="header-anchor" href="#_1-2-创建对象" aria-hidden="true">#</a> 1.2 创建对象</h3>
<ul>
<li>
<p>绝对路径</p>
<p>以磁盘名开头的路径。例如：D:\Program Files\Java\jdk1.8.0_172</p>
</li>
<li>
<p>相对路径</p>
<p>不是以盘符开头的，相对于当前项目下的路径。例如： a.txt</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">File</span><span class="token punctuation">(</span><span class="token class-name">String</span> pathname<span class="token punctuation">)</span> <span class="token comment">//通过字符串类型的路径来创建对象</span>
<span class="token class-name">File</span><span class="token punctuation">(</span><span class="token class-name">String</span> parent<span class="token punctuation">,</span> <span class="token class-name">String</span> child<span class="token punctuation">)</span> <span class="token comment">//通过父目录的路径(字符串类型)和文件(文件夹)名称来创建对象</span>
<span class="token class-name">File</span><span class="token punctuation">(</span><span class="token class-name">File</span> parent<span class="token punctuation">,</span> <span class="token class-name">String</span> child<span class="token punctuation">)</span><span class="token comment">//通过父目录的路径(File类型)和文件(文件夹)名称来创建对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-常用方法" tabindex="-1"><a class="header-anchor" href="#_1-3-常用方法" aria-hidden="true">#</a> 1.3 常用方法</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">boolean</span> <span class="token function">createNewFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//根据路径创建一个文件，返回值代表创建是否成功</span>
<span class="token keyword">boolean</span> <span class="token function">mkdir</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//根据路径创建一个文件夹，返回值代表创建是否成功</span>
<span class="token keyword">boolean</span> <span class="token function">mkdirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//根据路径创建一个文件夹,如果父目录不存在会自动创建父目录</span>

<span class="token keyword">boolean</span> <span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//判断文件或者文件夹是否存在</span>
<span class="token keyword">boolean</span> <span class="token function">isFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//判断是否是一个文件</span>
<span class="token keyword">boolean</span> <span class="token function">isDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//判断是否是一个文件夹</span>
    
<span class="token keyword">boolean</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//删除文件，或者删除空文件夹，返回值代表删除是否成功</span>
    
<span class="token keyword">long</span> <span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//获取一个文件的大小，对文件夹无意义</span>

<span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//获取文件或文件夹的名字</span>
<span class="token class-name">File</span> <span class="token function">getParentFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//获取父目录的File对象</span>
<span class="token class-name">String</span> <span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//获取File对象的绝对路径   </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-重要方法" tabindex="-1"><a class="header-anchor" href="#_1-4-重要方法" aria-hidden="true">#</a> 1.4 重要方法</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">File</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">listFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//如果当前File对象是一个文件夹，可以获取文件夹下的所有文件或者文件夹的File对象。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：如果不是文件夹或者是文件夹的权限受限返回值是null。所以一定要对返回结果做非空判断。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">File</span> dir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\a.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">File</span><span class="token punctuation">[</span><span class="token punctuation">]</span> files <span class="token operator">=</span> dir<span class="token punctuation">.</span><span class="token function">listFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>files<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">File</span> file <span class="token operator">:</span> files<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-递归" tabindex="-1"><a class="header-anchor" href="#_2-递归" aria-hidden="true">#</a> 2. 递归</h2>
<p>在方法中调用方法本身就是递归。</p>
<p>例如</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> n<span class="token operator">*</span><span class="token function">f</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：我们在使用递归的过程中一定要保证递归能结束，不能无限递归下去不然会出现栈溢出(StackOverflowError)的情况 。</strong></p>
<p>小结：如果既可以用递归解决又可以用循环解决。我们一般用循环解决。</p>
<h2 id="_3-io流概述" tabindex="-1"><a class="header-anchor" href="#_3-io流概述" aria-hidden="true">#</a> 3. IO流概述</h2>
<p>当需要进行数据的传输的时候可以使用IO流来进行。例如：把磁盘中文件的数据读取到内存中。把内存中的数据写入到磁盘中。把网络中的数据读取到内存中。</p>
<h2 id="_4-io流分类" tabindex="-1"><a class="header-anchor" href="#_4-io流分类" aria-hidden="true">#</a> 4. IO流分类</h2>
<p>IO流根据处理数据类型的不同分为字符流和字节流，根据数据流向不同分为输入流和输出流，对输入流只能进行读操作，对输出流只能进行写操作。</p>
<table>
<thead>
<tr>
<th>数据类型</th>
<th>流向</th>
<th>顶层父类</th>
</tr>
</thead>
<tbody>
<tr>
<td>字节流</td>
<td>输入(读)</td>
<td>java.io.InputStream</td>
</tr>
<tr>
<td>字节流</td>
<td>输出(写)</td>
<td>java.io.OutputStream</td>
</tr>
<tr>
<td>字符流</td>
<td>输入(读)</td>
<td>java.io.Reader</td>
</tr>
<tr>
<td>字符流</td>
<td>输出(写)</td>
<td>java.io.Writer</td>
</tr>
</tbody>
</table>
<h2 id="_5-字节输入流" tabindex="-1"><a class="header-anchor" href="#_5-字节输入流" aria-hidden="true">#</a> 5. 字节输入流</h2>
<p>所有字节输入流的父类是  java.io.InputStream ，它是以字节为单位的输入流 。</p>
<p>我们就以FileInputStream为例进行学习。</p>
<h3 id="_5-1-fileinputstream概述" tabindex="-1"><a class="header-anchor" href="#_5-1-fileinputstream概述" aria-hidden="true">#</a> 5.1 FileInputStream概述</h3>
<p>FileInputStream是用来读取文件数据的字节输入流。</p>
<h3 id="_5-2-fileinputstream对象创建" tabindex="-1"><a class="header-anchor" href="#_5-2-fileinputstream对象创建" aria-hidden="true">#</a> 5.2 FileInputStream对象创建</h3>
<p>构造方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span>  <span class="token comment">//传入文件路径创建对象</span>
<span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span>    <span class="token comment">//传入文件路径的File对象来创建流对象    </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建对象</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>fis<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileInputStream</span> fis2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>fis<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-读取数据" tabindex="-1"><a class="header-anchor" href="#_5-3-读取数据" aria-hidden="true">#</a> 5.3 读取数据</h3>
<p>我们可以使用FileInputStream来读取文件中的字节数据。</p>
<h4 id="_5-3-1-一次读取一个字节" tabindex="-1"><a class="header-anchor" href="#_5-3-1-一次读取一个字节" aria-hidden="true">#</a> 5.3.1 一次读取一个字节</h4>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">// 读取一个字节的数据作为返回值返回  返回值为-1时代表以及没有内容了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//读取数据</span>
        <span class="token keyword">int</span> b<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>b<span class="token operator">=</span>fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//释放资源</span>
        fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-2-一次读取一个字节数组" tabindex="-1"><a class="header-anchor" href="#_5-3-2-一次读取一个字节数组" aria-hidden="true">#</a> 5.3.2 一次读取一个字节数组</h4>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">byte</span> b<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//传入一个字节数组，最多读取一个字节数组的数据，并且会把数据存入数组中，返回值代表本次读取到的字节的个数。   如果返回值为-1代表没有数据了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//读取数据  一次读一个字节数组</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>len<span class="token operator">=</span>fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//释放资源</span>
        fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-资源释放" tabindex="-1"><a class="header-anchor" href="#_5-4-资源释放" aria-hidden="true">#</a> 5.4 资源释放</h3>
<p>我们在前面处理异常的时候都同意做了声明抛出的处理。但是这很可能导致在出现了异常时资源没有被正确的释放。所以我们要更合理的处理异常，尤其是处理资源释放的问题。</p>
<h4 id="_5-4-1-jdk6版本" tabindex="-1"><a class="header-anchor" href="#_5-4-1-jdk6版本" aria-hidden="true">#</a> 5.4.1 JDK6版本</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//读取数据  一次读一个字节数组</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> len<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>len<span class="token operator">=</span>fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">//释放资源</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fis<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-4-2-jdk7版本" tabindex="-1"><a class="header-anchor" href="#_5-4-2-jdk7版本" aria-hidden="true">#</a> 5.4.2 JDK7版本</h4>
<p>可以使用try...catch...resource的写法，在try的后面可以加小括号，把需要释放的资源在小括号中定义。我们就不需要自己去释放资源，jvm会帮我们再最后调用close方法释放资源的。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>     <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">(</span><span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//读取数据  一次读一个字节数组</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> len<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>len<span class="token operator">=</span>fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-4-3-jdk9版本" tabindex="-1"><a class="header-anchor" href="#_5-4-3-jdk9版本" aria-hidden="true">#</a> 5.4.3 JDK9版本</h4>
<p>资源的定义也可以不放在try的小括号中，只要在try的小括号中声明要释放的资源即可。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span><span class="token punctuation">(</span>fis <span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//读取数据  一次读一个字节数组</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> len<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>len<span class="token operator">=</span>fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-字节输出流" tabindex="-1"><a class="header-anchor" href="#_6-字节输出流" aria-hidden="true">#</a> 6. 字节输出流</h2>
<p>所有字节输出流的父类是  java.io.OutputStream ，它是以字节为单位的输出流 。</p>
<p>我们就以FileOutputStream为例进行学习。</p>
<h3 id="_6-1-fileoutputstream概述" tabindex="-1"><a class="header-anchor" href="#_6-1-fileoutputstream概述" aria-hidden="true">#</a> 6.1 FileOutputStream概述</h3>
<p>FileOutputStream是用来往文件中写入数据的字节输出流。</p>
<h3 id="_6-2-fileoutputstream对象创建" tabindex="-1"><a class="header-anchor" href="#_6-2-fileoutputstream对象创建" aria-hidden="true">#</a> 6.2 FileOutputStream对象创建</h3>
<p>常用构造方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token comment">//传入文件路径创建对象</span>
<span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span>    <span class="token comment">//传入文件路径的File对象来创建流对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputStream</span> fos2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-写数据" tabindex="-1"><a class="header-anchor" href="#_6-3-写数据" aria-hidden="true">#</a> 6.3 写数据</h3>
<pre><code>我们可以使用FileOutputStream来往文件中写入字节数据。
</code></pre>
<h4 id="_6-3-1-一次写一个字节" tabindex="-1"><a class="header-anchor" href="#_6-3-1-一次写一个字节" aria-hidden="true">#</a> 6.3.1 一次写一个字节</h4>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//传入一个字节数据，把字节数据写入文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>

        fos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token char">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        fos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6-3-2-一次写一个字节数组" tabindex="-1"><a class="header-anchor" href="#_6-3-2-一次写一个字节数组" aria-hidden="true">#</a> 6.3.2 一次写一个字节数组</h4>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">byte</span> b<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span>     <span class="token comment">//  存入一个字节数组，把字节数组中的数据全部写入文件</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">byte</span> b<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">int</span> off<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span>  <span class="token comment">//存入一个字节数组，把字节数组中从off索引开始len个元素写入文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token string">"abc"</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        fos.write(bytes);</span>
        fos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        fos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4文件续写" tabindex="-1"><a class="header-anchor" href="#_6-4文件续写" aria-hidden="true">#</a> 6.4文件续写</h3>
<p>如果用之前的构造方法创建的流对象，每次流对象创建的时候就会把文件中的内容情况。所以没有办法实现续写的效果。如果需要续写就需要使用另外的构造方法。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">boolean</span> append<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token comment">//第二个参数代表是否续写</span>
<span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">,</span> <span class="token keyword">boolean</span> append<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span>  <span class="token comment">//第二个参数代表是否续写</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用什么的构造创建流对象，并且第二个参数传入true，就不会清空文件中原有的内容。实现文件续写的效果。</p>
<p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token string">"abc"</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        fos.write(bytes);</span>
        fos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        fos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-练习" tabindex="-1"><a class="header-anchor" href="#_7-练习" aria-hidden="true">#</a> 7.练习</h2>
<h3 id="_7-1-文件复制" tabindex="-1"><a class="header-anchor" href="#_7-1-文件复制" aria-hidden="true">#</a> 7.1 文件复制</h3>
<p>要求定义一个方法，该方法能够实现文件的复制</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
<span class="token comment">//        要求定义一个方法，该方法能够实现文件的复制</span>
        <span class="token comment">// 文件的复制就是循环的读写，直到操作完所有数据为止</span>
        <span class="token class-name">File</span> src <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">File</span> destDir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\a"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">copyFile</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span>destDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//源文件的路径  File srcFile</span>
    <span class="token comment">//目标文件的存放目录路径  File destDir</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">copyFile</span><span class="token punctuation">(</span><span class="token class-name">File</span> srcFile<span class="token punctuation">,</span><span class="token class-name">File</span> destDir<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//在destDir下创建一个和srcFile同名的文件</span>
        <span class="token class-name">File</span> destFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>destDir<span class="token punctuation">,</span>srcFile<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//读取源文件  把读到的数据写入目标文件destFile</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>srcFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>destFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>len<span class="token operator">=</span>fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//把读到的内容写入新文件中</span>
            fos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//释放资源</span>
        fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-文件夹复制" tabindex="-1"><a class="header-anchor" href="#_7-2-文件夹复制" aria-hidden="true">#</a> 7.2 文件夹复制</h3>
<pre><code>要求定义一个方法，该方法能够实现文件夹的复制
</code></pre>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test09</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//要求定义一个方法，该方法能够实现文件夹的复制，考虑有子文件夹的情况</span>
        <span class="token class-name">File</span> srcDir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">File</span> dest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">copyDir</span><span class="token punctuation">(</span>srcDir<span class="token punctuation">,</span>dest<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//File srcDir  源文件夹</span>
    <span class="token comment">//File dest要复制到哪个目录</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">copyDir</span><span class="token punctuation">(</span><span class="token class-name">File</span> srcDir<span class="token punctuation">,</span><span class="token class-name">File</span> dest <span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>srcDir<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&amp;&amp;</span>srcDir<span class="token punctuation">.</span><span class="token function">isDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"源文件夹必须存在并且是一个文件夹"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>dest<span class="token punctuation">.</span><span class="token function">isDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"目标文件夹必须是一个文件夹"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//1.在目标文件夹下创建一个和源文件夹同名的文件夹destDir</span>
        <span class="token class-name">File</span> destDir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span>srcDir<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        destDir<span class="token punctuation">.</span><span class="token function">mkdirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//2.获取源文件夹下的所有子文件</span>
        <span class="token class-name">File</span><span class="token punctuation">[</span><span class="token punctuation">]</span> files <span class="token operator">=</span> srcDir<span class="token punctuation">.</span><span class="token function">listFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>files<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//3.遍历数组，复制每一个文件到目标文件夹destDir下</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">File</span> file <span class="token operator">:</span> files<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">isFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token function">copyFile</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span>destDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token comment">//复制文件夹</span>
                    <span class="token function">copyDir</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span>destDir<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>


    <span class="token comment">//源文件的路径  File srcFile</span>
    <span class="token comment">//目标文件的存放目录路径  File destDir</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">copyFile</span><span class="token punctuation">(</span><span class="token class-name">File</span> srcFile<span class="token punctuation">,</span><span class="token class-name">File</span> destDir<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//在destDir下创建一个和srcFile同名的文件</span>
        <span class="token class-name">File</span> destFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>destDir<span class="token punctuation">,</span>srcFile<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//读取源文件  把读到的数据写入目标文件destFile</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>srcFile<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>destFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>len<span class="token operator">=</span>fis<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>bytes<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//把读到的内容写入新文件中</span>
            fos<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>bytes<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//释放资源</span>
        fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-编码表" tabindex="-1"><a class="header-anchor" href="#_8-编码表" aria-hidden="true">#</a> 8.编码表</h2>
<p>计算机要准确的存储和识别各种字符集符号，就需要进行字符编码，一套字符集必然至少有一套字符编码。 如果<strong>编码和解码不是用一个编码表</strong>就会出现<strong>乱码</strong>问题。</p>
<p>编码(加密)：把看懂的--&gt;看不懂</p>
<p>解码(解密)：看不懂--&gt;把看懂的</p>
<h3 id="_8-1-常见的编码表" tabindex="-1"><a class="header-anchor" href="#_8-1-常见的编码表" aria-hidden="true">#</a> 8.1 常见的编码表</h3>
<ul>
<li><strong>ASCII</strong></li>
</ul>
<p>用于显示现代英语，主要包括控制字符(回车键、退格、换行键等)和可显示字符(英文大小写字符、阿拉伯数字和西文符号)</p>
<p>基本的ASCII字符集，使用7位表示一个字符，共128字符。ASCII的扩展字符集使用8位表示一个字符，共256字符，方便支持欧洲常用字符。是一个系统支持的所有字符的集合，包括各国家文字、标点符号、图形符号、数字等</p>
<ul>
<li>
<p><strong>GBK</strong></p>
<p>最常用的中文码表。是在GB2312标准基础上的扩展规范，使用了双字节编码方案，共收录了21003个汉字，完全兼容GB2312标准，同时支持繁体汉字以及日韩汉字等</p>
</li>
<li>
<p><strong>Unicode</strong></p>
<p>UTF-8编码：可以用来表示Unicode标准中任意字符，它是电子邮件、网页及其他存储或传送文字的应用 中，优先采用的编码。互联网工程工作小组（IETF）要求所有互联网协议都必须支持UTF-8编码。它使用一至四个字节为每个字符编码</p>
</li>
</ul>
<p>码规则：</p>
<pre><code>128个US-ASCII字符，只需一个字节编码
	
拉丁文等字符，需要二个字节编码
	
大部分常用字（含中文），使用三个字节编码
	
其他极少使用的Unicode辅助字符，使用四字节编码
</code></pre>
<ul>
<li>
<p><strong>ANSI</strong></p>
<p>其实不是具体的编码表，它指代系统的默认编码表。例如：简体中文的Windows系统默认编码是GBK。</p>
</li>
</ul>
<h2 id="_9-字符流" tabindex="-1"><a class="header-anchor" href="#_9-字符流" aria-hidden="true">#</a> 9. 字符流</h2>
<p>当需要读取/写入的数据是纯文本的形式时我们可以使用字符流来进行操作会更加方便。</p>
<h3 id="_9-1-字符输入流" tabindex="-1"><a class="header-anchor" href="#_9-1-字符输入流" aria-hidden="true">#</a> 9.1 字符输入流</h3>
<p>所有字符输入流的父类是  java.io.Reader ，它是以字符为单位的输入流 。</p>
<p>我们就以其子类FileReader为例进行学习。</p>
<h4 id="_9-1-1-filereader-概述" tabindex="-1"><a class="header-anchor" href="#_9-1-1-filereader-概述" aria-hidden="true">#</a> 9.1.1 FileReader 概述</h4>
<p>FileReader 是用来从文件中读取数据的字符输入流。</p>
<h4 id="_9-1-2-filereader创建对象" tabindex="-1"><a class="header-anchor" href="#_9-1-2-filereader创建对象" aria-hidden="true">#</a> 9.1.2 FileReader创建对象</h4>
<p>构造方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token comment">//传入文件路径创建对象</span>
<span class="token keyword">public</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token comment">//传入文件路径的File对象来创建流对象 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-JAVA ext-JAVA line-numbers-mode"><pre v-pre class="language-JAVA"><code>    public static void main(String[] args) throws FileNotFoundException {

        FileReader fr = new FileReader(&quot;C:\\Users\\root\\Desktop\\test\\汉字2.txt&quot;);

        FileReader fr2 = new FileReader(new File(&quot;C:\\Users\\root\\Desktop\\test\\汉字2.txt&quot;));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-1-3-读取数据" tabindex="-1"><a class="header-anchor" href="#_9-1-3-读取数据" aria-hidden="true">#</a> 9.1.3 读取数据</h4>
<h5 id="_9-1-3-1-一次读取一个字符" tabindex="-1"><a class="header-anchor" href="#_9-1-3-1-一次读取一个字符" aria-hidden="true">#</a> 9.1.3.1 一次读取一个字符</h5>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//一次读取一个字符返回，如果读到文件末尾，返回值为-1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建流对象</span>
        <span class="token class-name">FileReader</span> fr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//调用方法</span>
        <span class="token keyword">int</span> ch<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>ch<span class="token operator">=</span>fr<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span>ch<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//释放资源</span>
        fr<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_9-1-3-2-一次读取一个字符数组" tabindex="-1"><a class="header-anchor" href="#_9-1-3-2-一次读取一个字符数组" aria-hidden="true">#</a> 9.1.3.2 一次读取一个字符数组</h5>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">char</span> cbuf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//一次读取一个字符数组 返回值为-1时代表读到了末尾</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token comment">//创建流对象</span>
        <span class="token class-name">FileReader</span> fr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//读取</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>len<span class="token operator">=</span>fr<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//说明读到了内容</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//释放资源</span>
        fr<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-字符输出流" tabindex="-1"><a class="header-anchor" href="#_9-2-字符输出流" aria-hidden="true">#</a> 9.2 字符输出流</h3>
<p>所有字符输出流的父类是  java.io.Writer ，它是以字符为单位的输出流 。</p>
<p>我们就以FileWriter为例进行学习。</p>
<h4 id="_9-2-1-filewriter概述" tabindex="-1"><a class="header-anchor" href="#_9-2-1-filewriter概述" aria-hidden="true">#</a> 9.2.1 FileWriter概述</h4>
<p>FileWriter是用来往文件写入数据的字符输出流。</p>
<h4 id="_9-2-2-filewriter对象创建" tabindex="-1"><a class="header-anchor" href="#_9-2-2-filewriter对象创建" aria-hidden="true">#</a> 9.2.2 FileWriter对象创建</h4>
<p>构造方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//传入文件路径创建对象</span>
<span class="token keyword">public</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span>      <span class="token comment">//传入文件路径的File对象来创建流对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        
        <span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">FileWriter</span> fw2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_9-2-3-写入数据" tabindex="-1"><a class="header-anchor" href="#_9-2-3-写入数据" aria-hidden="true">#</a> 9.2.3 写入数据</h4>
<h5 id="_9-2-3-1-一次写一个字符" tabindex="-1"><a class="header-anchor" href="#_9-2-3-1-一次写一个字符" aria-hidden="true">#</a> 9.2.3.1 一次写一个字符</h5>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">int</span> c<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//把一个字符写入目的地</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//把缓存区中的数据写入硬盘</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token comment">//创建流对象</span>
        <span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//写数据</span>
        fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token char">'三'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token char">'更'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fw<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token char">'草'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token char">'堂'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//释放资源</span>
        fw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_9-2-3-2-一次写一个字符数组" tabindex="-1"><a class="header-anchor" href="#_9-2-3-2-一次写一个字符数组" aria-hidden="true">#</a> 9.2.3.2 一次写一个字符数组</h5>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">char</span> cbuf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//把一个字符数组写入目的地</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token comment">//创建流对象</span>
        <span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//写数据</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token string">"三更"</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">;</span>

        fw<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        chars <span class="token operator">=</span> <span class="token string">"草堂"</span><span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//释放资源</span>
        fw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_9-2-3-3-一次写一个字符串" tabindex="-1"><a class="header-anchor" href="#_9-2-3-3-一次写一个字符串" aria-hidden="true">#</a> 9.2.3.3 一次写一个字符串</h5>
<p>核心方法如下：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token comment">//把一个字符串写入目的地</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>

        <span class="token comment">//创建流对象</span>
        <span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"三更草堂"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fw<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//释放资源</span>
        fw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_9-2-3-4-如何抉择" tabindex="-1"><a class="header-anchor" href="#_9-2-3-4-如何抉择" aria-hidden="true">#</a> 9.2.3.4 如何抉择？</h5>
<pre><code>随机应变，有什么类型的数据就使用对应的重载。
</code></pre>
<h2 id="练习" tabindex="-1"><a class="header-anchor" href="#练习" aria-hidden="true">#</a> 练习</h2>
<p>1.使用字符流实现纯文本文件的复制。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//1.创建流对象</span>
        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\11.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileReader</span> fr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\22.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//2.循环读写</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> len<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>len<span class="token operator">=</span>fr<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//把读到的内容写入新文件中</span>
            fw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>chars<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//fw.flush();</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//3.释放资源</span>
        fw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fr<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_10-高效缓冲流" tabindex="-1"><a class="header-anchor" href="#_10-高效缓冲流" aria-hidden="true">#</a> 10. 高效缓冲流</h2>
<h3 id="_10-1-概述" tabindex="-1"><a class="header-anchor" href="#_10-1-概述" aria-hidden="true">#</a> 10.1 概述</h3>
<p>对硬盘进行数据的读取相比于从内存中存取数据要慢的多。所以JDK为我们提供了高效缓冲流来提高我们IO流的效率。内部原理就是借助内存的缓冲区来减少硬盘IO的次数，提高性能。</p>
<h3 id="_10-2-分类" tabindex="-1"><a class="header-anchor" href="#_10-2-分类" aria-hidden="true">#</a> 10.2 分类</h3>
<ul>
<li>
<p>字节流</p>
<p>输入流</p>
<p>BufferedInputStream</p>
<p>输出流</p>
<p>BufferedOutputStream</p>
</li>
<li>
<p>字符流</p>
<p>输入流</p>
<p>BufferedReader</p>
<p>输出流</p>
<p>BufferedWriter</p>
</li>
</ul>
<h3 id="_10-2-对象的创建" tabindex="-1"><a class="header-anchor" href="#_10-2-对象的创建" aria-hidden="true">#</a> 10.2 对象的创建</h3>
<p>构造方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> in<span class="token punctuation">)</span> 
<span class="token keyword">public</span> <span class="token class-name">BufferedOutputStream</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> out<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token class-name">Reader</span> in<span class="token punctuation">)</span> 
<span class="token keyword">public</span> <span class="token class-name">BufferedWriter</span><span class="token punctuation">(</span><span class="token class-name">Writer</span> out<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">BufferedInputStream</span> bis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\汉字.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BufferedOutputStream</span> bos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedOutputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\汉字3.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\汉字3.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">BufferedWriter</span> bw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\汉字3.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-3-特有的方法" tabindex="-1"><a class="header-anchor" href="#_10-3-特有的方法" aria-hidden="true">#</a> 10.3 特有的方法</h3>
<table>
<thead>
<tr>
<th>类</th>
<th>方法</th>
<th>作用</th>
</tr>
</thead>
<tbody>
<tr>
<td>BufferedReader</td>
<td>public String readLine() throws IOException</td>
<td>一次读取一行数据，读到的内容不包含换行符,读到了文件末尾返回null。</td>
</tr>
<tr>
<td>BufferedWriter</td>
<td>public void newLine() throws IOException</td>
<td>写入一个换行符，会根据系统变化</td>
</tr>
</tbody>
</table>
<p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//readLine</span>
        <span class="token comment">//创建对象</span>
        <span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\333.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//读取数据</span>
        <span class="token class-name">String</span> line<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>line<span class="token operator">=</span>br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//把读到的内容输出</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">//释放资源</span>
        br<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//newLine</span>
        <span class="token comment">//创建对象</span>
        <span class="token class-name">BufferedWriter</span> bw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\444.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//写入数据</span>
        bw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"你好啊"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//写入换号符</span>
        bw<span class="token punctuation">.</span><span class="token function">newLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"我很好"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//释放资源</span>
        bw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//newLine</span>
        <span class="token comment">//创建对象</span>
        <span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\333.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BufferedWriter</span> bw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\444.txt"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//循环读写数据  把读到的数据写入目标文件中</span>
        <span class="token class-name">String</span> line<span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>line<span class="token operator">=</span>br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//把读到的数据写入文件</span>
            bw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//写入换行符</span>
            bw<span class="token punctuation">.</span><span class="token function">newLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//释放资源</span>
        br<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-4-应用场景" tabindex="-1"><a class="header-anchor" href="#_10-4-应用场景" aria-hidden="true">#</a> 10.4 应用场景</h3>
<p>如果想让IO操作效率更高或者想使用特有的方法（readLine、newLine）就可以使用高效缓冲流。</p>
<h2 id="_11-转换流" tabindex="-1"><a class="header-anchor" href="#_11-转换流" aria-hidden="true">#</a> 11. 转换流</h2>
<h3 id="_11-1-概述" tabindex="-1"><a class="header-anchor" href="#_11-1-概述" aria-hidden="true">#</a> 11.1 概述</h3>
<p>如果我们需要把字节流转换成字符流，可以使用转换流来实现转换。</p>
<h3 id="_11-2-分类" tabindex="-1"><a class="header-anchor" href="#_11-2-分类" aria-hidden="true">#</a> 11.2 分类</h3>
<table>
<thead>
<tr>
<th>流类型</th>
<th>类</th>
</tr>
</thead>
<tbody>
<tr>
<td>输入流</td>
<td>InputStreamReader</td>
</tr>
<tr>
<td>输出流</td>
<td>OutputStreamWriter</td>
</tr>
</tbody>
</table>
<h3 id="_11-2-转换流的使用" tabindex="-1"><a class="header-anchor" href="#_11-2-转换流的使用" aria-hidden="true">#</a> 11.2  转换流的使用</h3>
<p>当我们需要把字节流转换成字符流时直接使用转换流的构造方法进行转换即可。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> in<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> in<span class="token punctuation">,</span> <span class="token class-name">String</span> charsetName<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">OutputStreamWriter</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> out<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">OutputStreamWriter</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> out<span class="token punctuation">,</span> <span class="token class-name">String</span> charsetName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token comment">//字节流对象</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\汉字.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputStream</span> fos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\转换流测试.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//转换成字符流</span>
        <span class="token class-name">InputStreamReader</span> isr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>fis<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">OutputStreamWriter</span> osw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OutputStreamWriter</span><span class="token punctuation">(</span>fos<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-properties" tabindex="-1"><a class="header-anchor" href="#_12-properties" aria-hidden="true">#</a> 12. Properties</h2>
<pre><code> Properties 其实是一个Map集合，其Key和Value都是String类型。他提供了和流结合的方法，可以方便我们把集合中的数据写入文件或者是把文件中的数据读取到集合中。
</code></pre>
<h3 id="_12-1-对象创建" tabindex="-1"><a class="header-anchor" href="#_12-1-对象创建" aria-hidden="true">#</a> 12.1 对象创建</h3>
<p>构造方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12-2-常用方法" tabindex="-1"><a class="header-anchor" href="#_12-2-常用方法" aria-hidden="true">#</a> 12.2 常用方法</h3>
<pre><code>Map集合的方法Properties都有，这里不做演示。因为我们在使用Properties的时候一般都是使用其特有的一些方法。
</code></pre>
<p>常用方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token class-name">Object</span> <span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token comment">//设置键值对</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token comment">//根据键获取对应的值    </span>
<span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">stringPropertyNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">//获取所有Key的集合</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//存储key value</span>
        properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span><span class="token string">"三更"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span><span class="token string">"17"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//获取对应的值</span>
        <span class="token class-name">String</span> v <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> keys <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">stringPropertyNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> key <span class="token operator">:</span> keys<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> value <span class="token operator">=</span> properties<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>key<span class="token operator">+</span><span class="token string">"===="</span><span class="token operator">+</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12-2-和流结合的方法" tabindex="-1"><a class="header-anchor" href="#_12-2-和流结合的方法" aria-hidden="true">#</a> 12.2 和流结合的方法</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">Reader</span> reader<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span>   <span class="token comment">//通过字符流加载数据</span>
<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> inStream<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span>  <span class="token comment">//通过字节流加载数据</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">store</span><span class="token punctuation">(</span><span class="token class-name">Writer</span> writer<span class="token punctuation">,</span> <span class="token class-name">String</span> comments<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span>  <span class="token comment">//通过字符流保存数据</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">store</span><span class="token punctuation">(</span><span class="token class-name">OutputStream</span> out<span class="token punctuation">,</span> <span class="token class-name">String</span> comments<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token comment">//通过字节流保存数据</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>范例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Properties</span> pro <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//存数据</span>
        pro<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span><span class="token string">"三更"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pro<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span><span class="token string">"16"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//把集合中的数据写入文件</span>
        <span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\proTest.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pro<span class="token punctuation">.</span><span class="token function">store</span><span class="token punctuation">(</span>fw<span class="token punctuation">,</span><span class="token string">"java"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        fw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建集合</span>
        <span class="token class-name">Properties</span> pro <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//从文件中加载数据</span>
        <span class="token class-name">FileReader</span> fr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span><span class="token string">"C:\\Users\\root\\Desktop\\test\\proTest.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        pro<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>fr<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_12-3-应用场景" tabindex="-1"><a class="header-anchor" href="#_12-3-应用场景" aria-hidden="true">#</a> 12.3 应用场景</h3>
<pre><code>Properties主要是用来读取和写入配置文件时使用。要求配置文件中的数据格式是： key=value
</code></pre>
</div></template>


