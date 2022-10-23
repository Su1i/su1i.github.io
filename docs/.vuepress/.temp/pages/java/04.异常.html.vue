<template><div><h1 id="_04-异常" tabindex="-1"><a class="header-anchor" href="#_04-异常" aria-hidden="true">#</a> 04.异常</h1>
<h2 id="_1-异常继承体系" tabindex="-1"><a class="header-anchor" href="#_1-异常继承体系" aria-hidden="true">#</a> 1. 异常继承体系</h2>
<p>Java中异常体系的核心类是Throwable，它有两个子类Error和Exception。</p>
<p>Error代表一些非常严重的错误。我们一般不必特意在代码中处理他们。</p>
<p>Exception相当于一些小错误。可以用来提示我们出现了什么问题。我们后面主要讲的就是Exception。</p>
<p>异常主要分两种：</p>
<ol>
<li>运行时异常（编译期间不会去做检查，不需要在代码中做预处理）</li>
</ol>
<p>运行时异常都是RuntimeException的子类，例如：NullPointerException, ArrayIndexOutOfBoundsException</p>
<ol start="2">
<li>编译时异常（编译时就会做检查，如果一段代码中可能出现编译时异常必须在代码中做预处理）</li>
</ol>
<p>编译时异常是指非继承自RuntimeException的Exception的子类,例如：FileNotFoundException</p>
<h2 id="_2-异常处理" tabindex="-1"><a class="header-anchor" href="#_2-异常处理" aria-hidden="true">#</a> 2. 异常处理</h2>
<h3 id="_2-1-throws声明抛出异常" tabindex="-1"><a class="header-anchor" href="#_2-1-throws声明抛出异常" aria-hidden="true">#</a> 2.1 throws声明抛出异常</h3>
<p>有些时候我们需要把异常抛出，在适当的地方去处理异常。这个时候就可以使用throws抛出异常，把异常交给方法的调用者处理。</p>
<p>格式：</p>
<p>在方法声明出加上 throws 异常类型.如果有多个异常用逗号分隔</p>
<p>示例：</p>
<p>抛出一个异常</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"a.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>抛出多个异常</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span><span class="token punctuation">,</span> <span class="token class-name">ParseException</span> <span class="token punctuation">{</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"a.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-try-catch抓取异常" tabindex="-1"><a class="header-anchor" href="#_2-2-try-catch抓取异常" aria-hidden="true">#</a> 2.2 try...catch抓取异常</h3>
<p>我们可以对可能出现异常的代码提前做好准备。这个时候就可以使用到try...catch了。</p>
<h4 id="_2-2-1-格式" tabindex="-1"><a class="header-anchor" href="#_2-2-1-格式" aria-hidden="true">#</a> 2.2.1 格式</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>	<span class="token keyword">try</span><span class="token punctuation">{</span>
        <span class="token comment">//可能出现异常的代码</span>
    <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span>异常类型 标识符<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//对异常做相应的处理</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//打印异常信息</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-执行流程" tabindex="-1"><a class="header-anchor" href="#_2-2-2-执行流程" aria-hidden="true">#</a> 2.2.2 执行流程</h4>
<p>如果try中的代码真的出现了异常，并且异常类型和cathch中的异常类型能匹配上。这个时候就会进入指定的catch块中执行，而异常对象也会赋值给我们在catch中定义的异常变量接收。</p>
<p>如果没有异常try中代码执行完就去执行try..catch之后的代码。</p>
<h4 id="_2-2-3-注意事项" tabindex="-1"><a class="header-anchor" href="#_2-2-3-注意事项" aria-hidden="true">#</a> 2.2.3 注意事项</h4>
<p>如果可能有多种异常，有多种处理方式。</p>
<p>①可以选择使用多个catch。</p>
<p>例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ParseException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②直接catch一个父异常类型</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-自定义异常" tabindex="-1"><a class="header-anchor" href="#_3-自定义异常" aria-hidden="true">#</a> 3. 自定义异常</h2>
<p>我们也可以自定义异常类。如果要定义运行时异常只要继承RuntimeException,定义构造方法即可。如果是定义编译时异常改成继承Exception。</p>
<p>示例：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//自定义运行时异常</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyRuntimeException</span> <span class="token keyword">extends</span> <span class="token class-name">RuntimeException</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">MyRuntimeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">MyRuntimeException</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//自定义编译时异常</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TooSmallException</span> <span class="token keyword">extends</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">TooSmallException</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">TooSmallException</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以去使用下自定义的异常。可以在代码中使用throw抛出异常对象。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">playGame</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">TooSmallException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>age<span class="token operator">&lt;</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TooSmallException</span><span class="token punctuation">(</span><span class="token string">"您的年龄过小不适合玩本游戏。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为自定义的TooSmallException是一个编译时异常，所以必须对异常进行预处理。如果是适合运行时异常不做预处理也没有问题。</p>
<h2 id="_4-异常的作用" tabindex="-1"><a class="header-anchor" href="#_4-异常的作用" aria-hidden="true">#</a> 4. 异常的作用</h2>
<ol>
<li>异常可以帮助我们知道具体的错误原因。</li>
<li>异常可以让我们在方法调用过程中出现问题的时候，把具体的问题反馈到方法调用处。</li>
</ol>
</div></template>


