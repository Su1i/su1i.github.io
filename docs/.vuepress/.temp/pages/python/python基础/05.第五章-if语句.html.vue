<template><div><h1 id="_05-第五章-if语句" tabindex="-1"><a class="header-anchor" href="#_05-第五章-if语句" aria-hidden="true">#</a> 05.第五章 if语句</h1>
<p><a name="86265123"></a></p>
<h2 id="_5-1-一个简单示例" tabindex="-1"><a class="header-anchor" href="#_5-1-一个简单示例" aria-hidden="true">#</a> 5.1 一个简单示例</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>cars <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'audi'</span><span class="token punctuation">,</span> <span class="token string">'bmw'</span><span class="token punctuation">,</span> <span class="token string">'subaru'</span><span class="token punctuation">,</span> <span class="token string">'toyota'</span><span class="token punctuation">]</span> 
<span class="token keyword">for</span> car <span class="token keyword">in</span> cars<span class="token punctuation">:</span> 
 <span class="token keyword">if</span> car <span class="token operator">==</span> <span class="token string">'bmw'</span><span class="token punctuation">:</span> 
  <span class="token keyword">print</span><span class="token punctuation">(</span>car<span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
 <span class="token keyword">else</span><span class="token punctuation">:</span> 
  <span class="token keyword">print</span><span class="token punctuation">(</span>car<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个示例中的循环首先检查当前的汽车名是否是'bmw'。如果是，就以全大写的方式打印它；否则就以首字母大写的方式打印：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Audi 
BMW 
Subaru 
Toyota
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="a2ec3136"></a></p>
<h2 id="_5-2-条件测试" tabindex="-1"><a class="header-anchor" href="#_5-2-条件测试" aria-hidden="true">#</a> 5.2 条件测试</h2>
<p>每条if语句的核心都是一个值为True或False的表达式，这种表达式被称为条件测试。Python根据条件测试的值为True还是False来决定是否执行if语句中的代码。如果条件测试的值为True，Python就执行紧跟在if语句后面的代码；如果为False，Python就忽略这些代码。</p>
<p><a name="2eca55db"></a></p>
<h3 id="_5-2-1-检查是否相等" tabindex="-1"><a class="header-anchor" href="#_5-2-1-检查是否相等" aria-hidden="true">#</a> 5.2.1 检查是否相等</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> car <span class="token operator">=</span> <span class="token string">'bmw'</span>
<span class="token operator">>></span><span class="token operator">></span> car <span class="token operator">==</span> <span class="token string">'bmw'</span>
<span class="token boolean">True</span>


<span class="token operator">>></span><span class="token operator">></span> car <span class="token operator">=</span> <span class="token string">'audi'</span>
<span class="token operator">>></span><span class="token operator">></span> car <span class="token operator">==</span> <span class="token string">'bmw'</span>
<span class="token boolean">False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个相等运算符（==）在它两边的值相等时返回True，否则返回False。</p>
<p><a name="1a30fbd3"></a></p>
<h3 id="_5-2-2-检查是否相等时不考虑大小写" tabindex="-1"><a class="header-anchor" href="#_5-2-2-检查是否相等时不考虑大小写" aria-hidden="true">#</a> 5.2.2 检查是否相等时不考虑大小写</h3>
<p>在Python中检查是否相等时区分大小写，两个大小写不同的值会被视为不相等：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> car <span class="token operator">=</span> <span class="token string">'Audi'</span>
<span class="token operator">>></span><span class="token operator">></span> car <span class="token operator">==</span> <span class="token string">'audi'</span>
<span class="token boolean">False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果大小写无关紧要，而只想检查变量的值，可将变量的值转换为小写，再进行比较：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> car <span class="token operator">=</span> <span class="token string">'Audi'</span>
<span class="token operator">>></span><span class="token operator">></span> car<span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token string">'audi'</span>
<span class="token boolean">True</span> 
<span class="token operator">>></span><span class="token operator">></span> car
<span class="token string">'Audi'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数lower()不会修改存储在变量car中的值，因此进行这样的比较时不会影响原来的变量</p>
<p><a name="a7ca3abd"></a></p>
<h3 id="_5-2-3-检查是否不相等" tabindex="-1"><a class="header-anchor" href="#_5-2-3-检查是否不相等" aria-hidden="true">#</a> 5.2.3 检查是否不相等</h3>
<p>要判断两个值是否不等，可结合使用惊叹号和等号（!=）</p>
<p><a name="4d7c9d45"></a></p>
<h3 id="_5-2-4-比较数字" tabindex="-1"><a class="header-anchor" href="#_5-2-4-比较数字" aria-hidden="true">#</a> 5.2.4 比较数字</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> age <span class="token operator">=</span> <span class="token number">18</span>
<span class="token operator">>></span><span class="token operator">></span> age <span class="token operator">==</span> <span class="token number">18</span>
<span class="token boolean">True</span>
<span class="token operator">>></span><span class="token operator">></span>age <span class="token operator">!=</span> <span class="token number">18</span>
<span class="token boolean">False</span>


<span class="token operator">>></span><span class="token operator">></span> age <span class="token operator">=</span> <span class="token number">19</span>
<span class="token operator">>></span><span class="token operator">></span> age <span class="token operator">&lt;</span> <span class="token number">21</span>
<span class="token boolean">True</span> 
<span class="token operator">>></span><span class="token operator">></span> age <span class="token operator">&lt;=</span> <span class="token number">21</span>
<span class="token boolean">True</span> 
<span class="token operator">>></span><span class="token operator">></span> age <span class="token operator">></span> <span class="token number">21</span>
<span class="token boolean">False</span> 
<span class="token operator">>></span><span class="token operator">></span> age <span class="token operator">>=</span> <span class="token number">21</span>
<span class="token boolean">False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="457d102b"></a></p>
<h3 id="_5-2-5-检查多个条件" tabindex="-1"><a class="header-anchor" href="#_5-2-5-检查多个条件" aria-hidden="true">#</a> 5.2.5 检查多个条件</h3>
<p><a name="8d47f759"></a></p>
<h4 id="_1-使用and检查多个条件" tabindex="-1"><a class="header-anchor" href="#_1-使用and检查多个条件" aria-hidden="true">#</a> 1. 使用and检查多个条件</h4>
<p>要检查是否两个条件都为True，可使用关键字and将两个条件测试合而为一；如果每个测试都通过了，整个表达式就为True；如果至少有一个测试没有通过，整个表达式就为False。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> age_0 <span class="token operator">=</span> <span class="token number">22</span> 
<span class="token operator">>></span><span class="token operator">></span> age_1 <span class="token operator">=</span> <span class="token number">18</span> 
<span class="token operator">>></span><span class="token operator">></span> age_0 <span class="token operator">>=</span> <span class="token number">21</span> <span class="token keyword">and</span> age_1 <span class="token operator">>=</span> <span class="token number">21</span> 
<span class="token boolean">False</span> 
<span class="token operator">>></span><span class="token operator">></span> age_1 <span class="token operator">=</span> <span class="token number">22</span> 
<span class="token operator">>></span><span class="token operator">></span> age_0 <span class="token operator">>=</span> <span class="token number">21</span> <span class="token keyword">and</span> age_1 <span class="token operator">>=</span> <span class="token number">21</span> 
<span class="token boolean">True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为改善可读性，可将每个测试都分别放在一对括号内，但并非必须这样做。<br />(age_0 &gt;= 21) and (age_1 &gt;= 21)</p>
<p><a name="20d5f72b"></a></p>
<h4 id="_2-使用or检查多个条件" tabindex="-1"><a class="header-anchor" href="#_2-使用or检查多个条件" aria-hidden="true">#</a> 2. 使用or检查多个条件</h4>
<p>关键字or也能够让你检查多个条件，但只要至少有一个条件满足，就能通过整个测试。仅当两个测试都没有通过时，使用or的表达式才为False。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> age_0 <span class="token operator">=</span> <span class="token number">22</span> 
<span class="token operator">>></span><span class="token operator">></span> age_1 <span class="token operator">=</span> <span class="token number">18</span> 
<span class="token operator">>></span><span class="token operator">></span> age_0 <span class="token operator">>=</span> <span class="token number">21</span> <span class="token keyword">or</span> age_1 <span class="token operator">>=</span> <span class="token number">21</span> 
<span class="token boolean">True</span> 
<span class="token operator">>></span><span class="token operator">></span> age_0 <span class="token operator">=</span> <span class="token number">18</span> 
<span class="token operator">>></span><span class="token operator">></span> age_0 <span class="token operator">>=</span> <span class="token number">21</span> <span class="token keyword">or</span> age_1 <span class="token operator">>=</span> <span class="token number">21</span> 
<span class="token boolean">False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="efd963bc"></a></p>
<h3 id="_5-2-6-检查特定值是否包含在列表中" tabindex="-1"><a class="header-anchor" href="#_5-2-6-检查特定值是否包含在列表中" aria-hidden="true">#</a> 5.2.6 检查特定值是否包含在列表中</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> requested_toppings <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'mushrooms'</span><span class="token punctuation">,</span> <span class="token string">'onions'</span><span class="token punctuation">,</span> <span class="token string">'pineapple'</span><span class="token punctuation">]</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token string">'mushrooms'</span> <span class="token keyword">in</span> requested_toppings 
<span class="token boolean">True</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token string">'pepperoni'</span> <span class="token keyword">in</span> requested_toppings 
<span class="token boolean">False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键字in让Python检查列表requested_toppings是否包含'mushrooms'和'pepperoni'。这种技术很有用，它让你能够在创建一个列表后，轻松地检查其中是否包含特定的值。</p>
<p><a name="b8271a35"></a></p>
<h3 id="_5-2-7-检查特定值是否不包含在列表中" tabindex="-1"><a class="header-anchor" href="#_5-2-7-检查特定值是否不包含在列表中" aria-hidden="true">#</a> 5.2.7 检查特定值是否不包含在列表中</h3>
<p>确定特定的值未包含在列表中可使用关键字not in。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>banned_users <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'andrew'</span><span class="token punctuation">,</span> <span class="token string">'carolina'</span><span class="token punctuation">,</span> <span class="token string">'david'</span><span class="token punctuation">]</span> 
user <span class="token operator">=</span> <span class="token string">'marie'</span> 
<span class="token keyword">if</span> user <span class="token keyword">not</span> <span class="token keyword">in</span> banned_users<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">", you can post a response if you wish."</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果user的值未包含在列表banned_users中，Python将返回True，进而执行缩进的代码行。</p>
<p><a name="b563d8c3"></a></p>
<h3 id="_5-2-8-布尔表达式" tabindex="-1"><a class="header-anchor" href="#_5-2-8-布尔表达式" aria-hidden="true">#</a> 5.2.8 布尔表达式</h3>
<p>随着你对编程的了解越来越深入，将遇到术语布尔表达式，它不过是条件测试的别名。与条件表达式一样，布尔表达式的结果要么为True，要么为False。<br />布尔值通常用于记录条件,在跟踪程序状态或程序中重要的条件方面，布尔值提供了一种高效的方式。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>game_active <span class="token operator">=</span> <span class="token boolean">True</span> 
can_edit <span class="token operator">=</span> <span class="token boolean">False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="571b02ad"></a></p>
<h2 id="_5-3-if语句" tabindex="-1"><a class="header-anchor" href="#_5-3-if语句" aria-hidden="true">#</a> 5.3 if语句</h2>
<p><a name="b4ea5b3d"></a></p>
<h3 id="_5-3-1-简单的if语句" tabindex="-1"><a class="header-anchor" href="#_5-3-1-简单的if语句" aria-hidden="true">#</a> 5.3.1 简单的if语句</h3>
<p>最简单的if语句只有一个测试和一个操作：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">if</span> conditional_test<span class="token punctuation">:</span> 
 do something
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在第1行中，可包含任何条件测试，而在紧跟在测试后面的缩进代码块中，可执行任何操作。如果条件测试的结果为True，Python就会执行紧跟在if语句后面的代码；否则Python将忽略这些代码。<br />在紧跟在if语句后面的代码块中，可根据需要包含任意数量的代码行。</p>
<p><a name="db47c013"></a></p>
<h3 id="_5-3-2-if-else语句" tabindex="-1"><a class="header-anchor" href="#_5-3-2-if-else语句" aria-hidden="true">#</a> 5.3.2 if-else语句</h3>
<p>经常需要在条件测试通过了时执行一个操作，并在没有通过时执行另一个操作；在这种情况下，可使用Python提供的if-else语句。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>age <span class="token operator">=</span> <span class="token number">17</span> 
<span class="token keyword">if</span> age <span class="token operator">>=</span> <span class="token number">18</span><span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"You are old enough to vote!"</span><span class="token punctuation">)</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Have you registered to vote yet?"</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Sorry, you are too young to vote."</span><span class="token punctuation">)</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Please register to vote as soon as you turn 18!"</span><span class="token punctuation">)</span>


Sorry<span class="token punctuation">,</span> you are too young to vote<span class="token punctuation">.</span> 
Please register to vote <span class="token keyword">as</span> soon <span class="token keyword">as</span> you turn <span class="token number">18</span>!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="1dbf7599"></a></p>
<h3 id="_5-3-3-if-elif-else结构" tabindex="-1"><a class="header-anchor" href="#_5-3-3-if-elif-else结构" aria-hidden="true">#</a> 5.3.3 if-elif-else结构</h3>
<p>经常需要检查超过两个的情形，为此可使用Python提供的if-elif-else结构。Python只执行if-elif-else结构中的一个代码块，它依次检查每个条件测试，直到遇到通过了的条件测试。测<br />试通过后，Python将执行紧跟在它后面的代码，并跳过余下的测试。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>age <span class="token operator">=</span> <span class="token number">12</span> 
<span class="token keyword">if</span> age <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">:</span> 
 price <span class="token operator">=</span> <span class="token number">0</span> 
<span class="token keyword">elif</span> age <span class="token operator">&lt;</span> <span class="token number">18</span><span class="token punctuation">:</span> 
 price <span class="token operator">=</span> <span class="token number">5</span> 
<span class="token keyword">else</span><span class="token punctuation">:</span> 
 price <span class="token operator">=</span> <span class="token number">10</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Your admission cost is $"</span> <span class="token operator">+</span> <span class="token builtin">str</span><span class="token punctuation">(</span>price<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"."</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="f9627838"></a></p>
<h3 id="_5-3-4-使用多个elif代码块" tabindex="-1"><a class="header-anchor" href="#_5-3-4-使用多个elif代码块" aria-hidden="true">#</a> 5.3.4 使用多个elif代码块</h3>
<p>可根据需要使用任意数量的elif代码块</p>
<p><a name="64adda66"></a></p>
<h3 id="_5-3-5-省略else代码块" tabindex="-1"><a class="header-anchor" href="#_5-3-5-省略else代码块" aria-hidden="true">#</a> 5.3.5 省略else代码块</h3>
<p>Python并不要求if-elif结构后面必须有else代码块。</p>
<p><a name="8db59263"></a></p>
<h3 id="_5-3-6-测试多个条件" tabindex="-1"><a class="header-anchor" href="#_5-3-6-测试多个条件" aria-hidden="true">#</a> 5.3.6 测试多个条件</h3>
<p>有时候必须检查你关心的所有条件。在这种情况下，应使用一系列不包含elif和else代码块的简单if语句。在可能有多个条件为True，且你需要在每个条件为True时都采取相应措施时，适合使用这种方法。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>requested_toppings <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'mushrooms'</span><span class="token punctuation">,</span> <span class="token string">'extra cheese'</span><span class="token punctuation">]</span> 
<span class="token keyword">if</span> <span class="token string">'mushrooms'</span> <span class="token keyword">in</span> requested_toppings<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Adding mushrooms."</span><span class="token punctuation">)</span> 
<span class="token keyword">if</span> <span class="token string">'pepperoni'</span> <span class="token keyword">in</span> requested_toppings<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Adding pepperoni."</span><span class="token punctuation">)</span> 
<span class="token keyword">if</span> <span class="token string">'extra cheese'</span> <span class="token keyword">in</span> requested_toppings<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Adding extra cheese."</span><span class="token punctuation">)</span> 
 
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"\nFinished making your pizza!"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总之，如果你只想执行一个代码块，就使用if-elif-else结构；如果要运行多个代码块，就使用一系列独立的if语句。</p>
<p><a name="2a0298d2"></a></p>
<h2 id="_5-4-使用if语句处理列表" tabindex="-1"><a class="header-anchor" href="#_5-4-使用if语句处理列表" aria-hidden="true">#</a> 5.4 使用if语句处理列表</h2>
<p><a name="f813b894"></a></p>
<h3 id="_5-4-1-检查特殊元素" tabindex="-1"><a class="header-anchor" href="#_5-4-1-检查特殊元素" aria-hidden="true">#</a> 5.4.1 检查特殊元素</h3>
<p>本章开头通过一个简单示例演示了如何处理特殊值'bmw'——它需要采用不同的格式进行打印。下面来进一步研究如何检查列表中的特殊值，并对其做合适的处理。<br />继续使用前面的比萨店示例。这家比萨店在制作比萨时，每添加一种配料都打印一条消息。通过创建一个列表，在其中包含顾客点的配料，并使用一个循环来指出添加到比萨中的配料，可以以极高的效率编写这样的代码：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>requested_toppings <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'mushrooms'</span><span class="token punctuation">,</span> <span class="token string">'green peppers'</span><span class="token punctuation">,</span> <span class="token string">'extra cheese'</span><span class="token punctuation">]</span> 
<span class="token keyword">for</span> requested_topping <span class="token keyword">in</span> requested_toppings<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Adding "</span> <span class="token operator">+</span> requested_topping <span class="token operator">+</span> <span class="token string">"."</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"\nFinished making your pizza!"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出很简单，因为上述代码不过是一个简单的for循环：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Adding mushrooms<span class="token punctuation">.</span> 
Adding green peppers<span class="token punctuation">.</span> 
Adding extra cheese<span class="token punctuation">.</span> 
Finished making your pizza!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，如果比萨店的青椒用完了，该如何处理呢？为妥善地处理这种情况，可在for循环中包含一条if语句：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>requested_toppings <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'mushrooms'</span><span class="token punctuation">,</span> <span class="token string">'green peppers'</span><span class="token punctuation">,</span> <span class="token string">'extra cheese'</span><span class="token punctuation">]</span> 
<span class="token keyword">for</span> requested_topping <span class="token keyword">in</span> requested_toppings<span class="token punctuation">:</span> 
 <span class="token keyword">if</span> requested_topping <span class="token operator">==</span> <span class="token string">'green peppers'</span><span class="token punctuation">:</span> <span class="token comment">#1</span>
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Sorry, we are out of green peppers right now."</span><span class="token punctuation">)</span> 
 <span class="token keyword">else</span><span class="token punctuation">:</span> <span class="token comment">#2</span>
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Adding "</span> <span class="token operator">+</span> requested_topping <span class="token operator">+</span> <span class="token string">"."</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"\nFinished making your pizza!"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里在比萨中添加每种配料前都进行检查。1处的代码检查顾客点的是否是青椒，如果是，就显示一条消息，指出不能点青椒的原因。2处的else代码块确保其他配料都将添加到比萨中。<br />输出表明，妥善地处理了顾客点的每种配料：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Adding mushrooms<span class="token punctuation">.</span> 
Sorry<span class="token punctuation">,</span> we are out of green peppers right now<span class="token punctuation">.</span> 
Adding extra cheese<span class="token punctuation">.</span> 
Finished making your pizza!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="b6f88394"></a></p>
<h3 id="_5-4-2-确定列表不是空的" tabindex="-1"><a class="header-anchor" href="#_5-4-2-确定列表不是空的" aria-hidden="true">#</a> 5.4.2 确定列表不是空的</h3>
<p>到目前为止，对于处理的每个列表都做了一个简单的假设，即假设它们都至少包含一个元素。我们马上就要让用户来提供存储在列表中的信息，因此不能再假设循环运行时列表不是空的。有鉴于此，在运行for循环前确定列表是否为空很重要。<br />下面在制作比萨前检查顾客点的配料列表是否为空。如果列表是空的，就向顾客确认他是否要点普通比萨；如果列表不为空，就像前面的示例那样制作比萨：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>requested_toppings <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> 
 <span class="token keyword">if</span> requested_toppings<span class="token punctuation">:</span> 
   <span class="token keyword">for</span> requested_topping <span class="token keyword">in</span> requested_toppings<span class="token punctuation">:</span> 
     <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Adding "</span> <span class="token operator">+</span> requested_topping <span class="token operator">+</span> <span class="token string">"."</span><span class="token punctuation">)</span> 
   <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"\nFinished making your pizza!"</span><span class="token punctuation">)</span> 
 <span class="token keyword">else</span><span class="token punctuation">:</span> 
   <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Are you sure you want a plain pizza?"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先创建了一个空列表，其中不包含任何配料（见）。在处我们进行了简单检查，而不是直接执行for循环。在if语句中将列表名用在条件表达式中时，Python将在列表至少包含一个元素时返回True，并在列表为空时返回False。如果requested_toppings不为空，就运行与前一个示例相同的for循环；否则，就打印一条消息，询问顾客是否确实要点不加任何配料的普通比萨。<br />在这里，这个列表为空，因此输出如下——询问顾客是否确实要点普通比萨：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Are you sure you want a plain pizza?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果这个列表不为空，将显示在比萨中添加的各种配料的输出。</p>
<p><a name="3c2c5081"></a></p>
<h3 id="_5-4-3-使用多个列表" tabindex="-1"><a class="header-anchor" href="#_5-4-3-使用多个列表" aria-hidden="true">#</a> 5.4.3 使用多个列表</h3>
<p>顾客的要求往往五花八门，在比萨配料方面尤其如此。如果顾客要在比萨中添加炸薯条，该怎么办呢？可使用列表和if语句来确定能否满足顾客的要求。<br />下面的示例定义了两个列表，其中第一个列表包含比萨店供应的配料，而第二个列表包含顾客点的配料。这次对于requested_toppings中的每个元素，都检查它是否是比萨店供应的配料，再决定是否在比萨中添加它：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>available_toppings <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'mushrooms'</span><span class="token punctuation">,</span> <span class="token string">'olives'</span><span class="token punctuation">,</span> <span class="token string">'green peppers'</span><span class="token punctuation">,</span> <span class="token string">'pepperoni'</span><span class="token punctuation">,</span> <span class="token string">'pineapple'</span><span class="token punctuation">,</span> <span class="token string">'extra cheese'</span><span class="token punctuation">]</span> 
 requested_toppings <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'mushrooms'</span><span class="token punctuation">,</span> <span class="token string">'french fries'</span><span class="token punctuation">,</span> <span class="token string">'extra cheese'</span><span class="token punctuation">]</span> 
 <span class="token keyword">for</span> requested_topping <span class="token keyword">in</span> requested_toppings<span class="token punctuation">:</span> 
   <span class="token keyword">if</span> requested_topping <span class="token keyword">in</span> available_toppings<span class="token punctuation">:</span> 
     <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Adding "</span> <span class="token operator">+</span> requested_topping <span class="token operator">+</span> <span class="token string">"."</span><span class="token punctuation">)</span> 
   <span class="token keyword">else</span><span class="token punctuation">:</span> 
     <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Sorry, we don't have "</span> <span class="token operator">+</span> requested_topping <span class="token operator">+</span> <span class="token string">"."</span><span class="token punctuation">)</span>
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"\nFinished making your pizza!"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了一个列表，其中包含比萨店供应的配料。请注意，如果比萨店供应的配料是固定的，也可使用一个元组来存储它们。我们又创建了一个列表，其中包含顾客点的配料，请注意那个不同寻常的配料——'french fries'。我们遍历顾客点的配料列表。<br />在这个循环中，对于顾客点的每种配料，我们都检查它是否包含在供应的配料列表中；如果答案是肯定的，就将其加入到比萨中，否则将运行else代码块：打印一条消息，告诉顾客不供应这种配料。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Adding mushrooms<span class="token punctuation">.</span> 
Sorry<span class="token punctuation">,</span> we don't have french fries<span class="token punctuation">.</span> 
Adding extra cheese<span class="token punctuation">.</span> 
Finished making your pizza!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="7c2530f2"></a></p>
<h2 id="_5-5-设置if语句的格式" tabindex="-1"><a class="header-anchor" href="#_5-5-设置if语句的格式" aria-hidden="true">#</a> 5.5 设置if语句的格式</h2>
<p>本章的每个示例都展示了良好的格式设置习惯。在条件测试的格式设置方面，PEP 8提供的唯一建议是，在诸如==、&gt;=和&lt;=等比较运算符两边各添加一个空格，例如，if age &lt; 4:要比if age&lt;4:好。<br />这样的空格不会影响Python对代码的解读，而只是让代码阅读起来更容易。</p>
<p><a name="9791e2c6"></a></p>
<h2 id="_5-6-小结" tabindex="-1"><a class="header-anchor" href="#_5-6-小结" aria-hidden="true">#</a> 5.6 小结</h2>
<p>在本章中，你学习了如何编写结果要么为Ture要么为False的条件测试。你学习了如何编写简单的if语句、if-else语句和if-elif-else结构。在程序中，你使用了这些结构来测试特定的条件，以确定这些条件是否满足。你学习了如何在利用高效的for循环的同时，以不同于其他元素的方式对特定的列表元素进行处理。你还再次学习了Python就代码格式方面提出的建议，这可确保即便你编写的程序越来越复杂，其代码依然易于阅读和理解。<br />在第6章，你将学习Python字典。字典类似于列表，但让你能够将不同的信息关联起来。你将学习如何创建和遍历字典，以及如何将字典同列表和if语句结合起来使用。学习字典让你能够模拟更多现实世界的情形。</p>
</div></template>


