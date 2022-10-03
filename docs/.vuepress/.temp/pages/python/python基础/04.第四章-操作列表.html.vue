<template><div><p><a name="caf77209"></a></p>
<h2 id="_4-1-遍历整个列表" tabindex="-1"><a class="header-anchor" href="#_4-1-遍历整个列表" aria-hidden="true">#</a> 4.1 遍历整个列表</h2>
<p>需要对列表中的每个元素都执行相同的操作时，可使用Python中的for循环。<br />下面使用for循环来打印魔术师名单中的所有名字：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>magicians <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'alice'</span><span class="token punctuation">,</span> <span class="token string">'david'</span><span class="token punctuation">,</span> <span class="token string">'carolina'</span><span class="token punctuation">]</span> 
<span class="token keyword">for</span> magician <span class="token keyword">in</span> magicians<span class="token punctuation">:</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>magician<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们像第3章那样定义了一个列表。接下来，我们定义了一个for循环；这行代码让Python从列表magicians中取出一个名字，并将其存储在变量magician中。最后，我们让Python打印前面存储到变量magician中的名字。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>alice 
david 
carolina
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="ac9829e0"></a></p>
<h3 id="_4-1-1-深入的研究循环" tabindex="-1"><a class="header-anchor" href="#_4-1-1-深入的研究循环" aria-hidden="true">#</a> 4.1.1 深入的研究循环</h3>
<p>Python将首先读取其中的第一行代码：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> magician <span class="token keyword">in</span> magicians<span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码让Python获取列表magicians中的第一个值（'alice'），并将其存储到变量magician中。接下来，Python读取下一行代码：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>magician<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它让Python打印magician的值——依然是'alice'。鉴于该列表还包含其他值，Python返回到循环的第一行：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> magician <span class="token keyword">in</span> magicians<span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Python获取列表中的下一个名字——'david'，并将其存储到变量magician中，再执行下面这行代码：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>magician<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Python再次打印变量magician的值——当前为'david'。接下来，Python再次执行整个循环，对列表中的最后一个值——'carolina'进行处理。至此，列表中没有其他的值了，因此Python接着执行程序的下一行代码。在这个示例中，for循环后面没有其他的代码，因此程序就此结束。</p>
<p><a name="e2418ec7"></a></p>
<h3 id="_4-1-2-在for循环中执行更多的操作" tabindex="-1"><a class="header-anchor" href="#_4-1-2-在for循环中执行更多的操作" aria-hidden="true">#</a> 4.1.2 在for循环中执行更多的操作</h3>
<p>在for循环中，想包含多少行代码都可以。在代码行for magician in magicians后面，每个缩进的代码行都是循环的一部分，且将针对列表中的每个值都执行一次。因此，可对列表中的每个值执行任意次数的操作。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>magicians <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'alice'</span><span class="token punctuation">,</span> <span class="token string">'david'</span><span class="token punctuation">,</span> <span class="token string">'carolina'</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> magician <span class="token keyword">in</span> magicians<span class="token punctuation">:</span>
 <span class="token keyword">print</span><span class="token punctuation">(</span>magician<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">", that was a great trick!"</span><span class="token punctuation">)</span>
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"I can't wait to see your next trick, "</span> <span class="token operator">+</span> magician<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">".\n"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Alice<span class="token punctuation">,</span> that was a great trick! 
I can't wait to see your <span class="token builtin">next</span> trick<span class="token punctuation">,</span> Alice<span class="token punctuation">.</span>
 
David<span class="token punctuation">,</span> that was a great trick! 
I can't wait to see your <span class="token builtin">next</span> trick<span class="token punctuation">,</span> David<span class="token punctuation">.</span>

Carolina<span class="token punctuation">,</span> that was a great trick! 
I can't wait to see your <span class="token builtin">next</span> trick<span class="token punctuation">,</span> Carolina<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="b5fc4b72"></a></p>
<h3 id="_4-1-3-在for循环结束后执行一些操作" tabindex="-1"><a class="header-anchor" href="#_4-1-3-在for循环结束后执行一些操作" aria-hidden="true">#</a> 4.1.3 在for循环结束后执行一些操作</h3>
<p>在for循环后面，没有缩进的代码都只执行一次，而不会重复执行。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>magicians <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'alice'</span><span class="token punctuation">,</span> <span class="token string">'david'</span><span class="token punctuation">,</span> <span class="token string">'carolina'</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> magician <span class="token keyword">in</span> magicians<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span>magician<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">", that was a great trick!"</span><span class="token punctuation">)</span>
 <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"I can't wait to see your next trick, "</span> <span class="token operator">+</span> magician<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">".\n"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Thank you, everyone. That was a great magic show!"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Alice<span class="token punctuation">,</span> that was a great trick! 
I can't wait to see your <span class="token builtin">next</span> trick<span class="token punctuation">,</span> Alice<span class="token punctuation">.</span> 

David<span class="token punctuation">,</span> that was a great trick! 
I can't wait to see your <span class="token builtin">next</span> trick<span class="token punctuation">,</span> David<span class="token punctuation">.</span> 

Carolina<span class="token punctuation">,</span> that was a great trick! 
I can't wait to see your <span class="token builtin">next</span> trick<span class="token punctuation">,</span> Carolina<span class="token punctuation">.</span> 

Thank you<span class="token punctuation">,</span> everyone<span class="token punctuation">.</span> That was a great magic show!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="9f5a1e7b"></a></p>
<h2 id="_4-2-避免缩进错误" tabindex="-1"><a class="header-anchor" href="#_4-2-避免缩进错误" aria-hidden="true">#</a> 4.2 避免缩进错误</h2>
<p><a name="9c94ef5e"></a></p>
<h3 id="_4-2-1-忘记缩进" tabindex="-1"><a class="header-anchor" href="#_4-2-1-忘记缩进" aria-hidden="true">#</a> 4.2.1 忘记缩进</h3>
<p><a name="97d7cfc3"></a></p>
<h3 id="_4-2-2-忘记缩进额外的代码行" tabindex="-1"><a class="header-anchor" href="#_4-2-2-忘记缩进额外的代码行" aria-hidden="true">#</a> 4.2.2 忘记缩进额外的代码行</h3>
<p><a name="a273b36e"></a></p>
<h3 id="_4-2-3-不必要的缩进" tabindex="-1"><a class="header-anchor" href="#_4-2-3-不必要的缩进" aria-hidden="true">#</a> 4.2.3 不必要的缩进</h3>
<p><a name="b5eeed9d"></a></p>
<h3 id="_4-2-4-循环后不必要的缩进" tabindex="-1"><a class="header-anchor" href="#_4-2-4-循环后不必要的缩进" aria-hidden="true">#</a> 4.2.4 循环后不必要的缩进</h3>
<p><a name="93db4ab0"></a></p>
<h3 id="_4-2-5-遗漏了冒号" tabindex="-1"><a class="header-anchor" href="#_4-2-5-遗漏了冒号" aria-hidden="true">#</a> 4.2.5 遗漏了冒号</h3>
<p>for语句末尾的冒号告诉Python，下一行是循环的第一行。</p>
<p><a name="7bc9bb6a"></a></p>
<h2 id="_4-3-创建数值列表" tabindex="-1"><a class="header-anchor" href="#_4-3-创建数值列表" aria-hidden="true">#</a> 4.3 创建数值列表</h2>
<p><a name="19638973"></a></p>
<h3 id="_4-3-1-使用函数range" tabindex="-1"><a class="header-anchor" href="#_4-3-1-使用函数range" aria-hidden="true">#</a> 4.3.1 使用函数range（）</h3>
<p>Python函数range()让你能够轻松地生成一系列的数字。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> value <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码好像应该打印数字1~5，但实际上它不会打印数字5：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token number">1</span> 
<span class="token number">2</span> 
<span class="token number">3</span> 
<span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数range()让Python从你指定的第一个值开始数，并在到达你指定的第二个值后停止，因此输出不包含第二个值（这里为5）。</p>
<p><a name="9fd4af57"></a></p>
<h3 id="_4-3-2-使用range-创建数字列表" tabindex="-1"><a class="header-anchor" href="#_4-3-2-使用range-创建数字列表" aria-hidden="true">#</a> 4.3.2 使用range（）创建数字列表</h3>
<p>要创建数字列表，可使用函数list()将range()的结果直接转换为列表。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>numbers <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>numbers<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用函数range()时，还可指定步长。例如，下面的代码打印1~10内的偶数：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>even_numbers <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>even_numbers<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，函数range()从2开始数，然后不断地加2，直到达到或超过终值（11），因此输出如下：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在Python中，两个星号（**）表示乘方运算。下面的代码演示了如何将前10个整数的平方加入到一个列表中：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>squares <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> value <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">:</span> 
 square <span class="token operator">=</span> value<span class="token operator">**</span><span class="token number">2</span> 
 squares<span class="token punctuation">.</span>append<span class="token punctuation">(</span>square<span class="token punctuation">)</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span>squares<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建了一个空列表；接下来，使用函数range()让Python遍历1~10的值。在循环中，计算当前值的平方，并将结果存储到变量square中。然后，将新计算得<br />到的平方值附加到列表squares末尾。最后，循环结束后，打印列表squares：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">36</span><span class="token punctuation">,</span> <span class="token number">49</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">81</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="9b64c195"></a></p>
<h3 id="_4-3-3-对数字列表执行简单的统计计算" tabindex="-1"><a class="header-anchor" href="#_4-3-3-对数字列表执行简单的统计计算" aria-hidden="true">#</a> 4.3.3 对数字列表执行简单的统计计算</h3>
<p>有几个专门用于处理数字列表的Python函数。例如，你可以轻松地找出数字列表的最大值、最小值和总和：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> digits <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span>
<span class="token operator">>></span><span class="token operator">></span> <span class="token builtin">min</span><span class="token punctuation">(</span>digits<span class="token punctuation">)</span>
<span class="token number">0</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token builtin">max</span><span class="token punctuation">(</span>digits<span class="token punctuation">)</span>
<span class="token number">9</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token builtin">sum</span><span class="token punctuation">(</span>digits<span class="token punctuation">)</span>
<span class="token number">45</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="14dc543b"></a></p>
<h3 id="_4-3-4-列表解析" tabindex="-1"><a class="header-anchor" href="#_4-3-4-列表解析" aria-hidden="true">#</a> 4.3.4 列表解析</h3>
<p>前面介绍的生成列表squares的方式包含三四行代码，而列表解析让你只需编写一行代码就能生成这样的列表。列表解析将for循环和创建新元素的代码合并成一行，并自动附加新元素。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>squares <span class="token operator">=</span> <span class="token punctuation">[</span>value<span class="token operator">**</span><span class="token number">2</span> <span class="token keyword">for</span> value <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">]</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>squares<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要使用这种语法，首先指定一个描述性的列表名，如squares；然后，指定一个左方括号，并定义一个表达式，用于生成你要存储到列表中的值。在这个示例中，表达式为value**2，它计算平方值。接下来，编写一个for循环，用于给表达式提供值，再加上右方括号。<br />请注意，这里的for语句末尾没有冒号。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">36</span><span class="token punctuation">,</span> <span class="token number">49</span><span class="token punctuation">,</span> <span class="token number">64</span><span class="token punctuation">,</span> <span class="token number">81</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="7c373933"></a></p>
<h2 id="_4-4-使用列表的一部分" tabindex="-1"><a class="header-anchor" href="#_4-4-使用列表的一部分" aria-hidden="true">#</a> 4.4 使用列表的一部分</h2>
<p>你还可以处理列表的部分元素——Python称之为切片。</p>
<p><a name="163b904a"></a></p>
<h3 id="_4-4-1-切片" tabindex="-1"><a class="header-anchor" href="#_4-4-1-切片" aria-hidden="true">#</a> 4.4.1 切片</h3>
<p>要创建切片，可指定要使用的第一个元素和最后一个元素的索引。与函数range()一样，Python在到达你指定的第二个索引前面的元素后停止。要输出列表中的前三个元素，需要指定索引0~3，这将输出分别为0、1和2的元素。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>players <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'charles'</span><span class="token punctuation">,</span> <span class="token string">'martina'</span><span class="token punctuation">,</span> <span class="token string">'michael'</span><span class="token punctuation">,</span> <span class="token string">'florence'</span><span class="token punctuation">,</span> <span class="token string">'eli'</span><span class="token punctuation">]</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>players<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span><span class="token string">'charles'</span><span class="token punctuation">,</span> <span class="token string">'martina'</span><span class="token punctuation">,</span> <span class="token string">'michael'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要输出名单上的最后三名队员，可使用切片players[-3:]：<br />如果你没有指定第一个索引，Python将自动从列表开头开始：<br />要让切片终止于列表末尾，也可使用类似的语法。</p>
<p><a name="be2fc54b"></a></p>
<h3 id="_4-4-2-遍历切片" tabindex="-1"><a class="header-anchor" href="#_4-4-2-遍历切片" aria-hidden="true">#</a> 4.4.2 遍历切片</h3>
<p>如果要遍历列表的部分元素，可在for循环中使用切片。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>players <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'charles'</span><span class="token punctuation">,</span> <span class="token string">'martina'</span><span class="token punctuation">,</span> <span class="token string">'michael'</span><span class="token punctuation">,</span> <span class="token string">'florence'</span><span class="token punctuation">,</span> <span class="token string">'eli'</span><span class="token punctuation">]</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Here are the first three players on my team:"</span><span class="token punctuation">)</span> 
<span class="token keyword">for</span> player <span class="token keyword">in</span> players<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span>player<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Here are the first three players on my team<span class="token punctuation">:</span> 
Charles 
Martina 
Michael
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="be86ca96"></a></p>
<h3 id="_4-4-3-复制列表" tabindex="-1"><a class="header-anchor" href="#_4-4-3-复制列表" aria-hidden="true">#</a> 4.4.3 复制列表</h3>
<p>要复制列表，可创建一个包含整个列表的切片，方法是同时省略起始索引和终止索引（[:]）。<br />这让Python创建一个始于第一个元素，终止于最后一个元素的切片，即复制整个列表。</p>
<p><a name="26b0fdcf"></a></p>
<h2 id="_4-5-元组" tabindex="-1"><a class="header-anchor" href="#_4-5-元组" aria-hidden="true">#</a> 4.5 元组</h2>
<p>要创建一系列不可修改的元素，元组可以满足这种需求。Python将不能修改的值称为不可变的，而不可变的列表被称为元组。</p>
<p><a name="9a736536"></a></p>
<h3 id="_4-5-1-定义元组" tabindex="-1"><a class="header-anchor" href="#_4-5-1-定义元组" aria-hidden="true">#</a> 4.5.1 定义元组</h3>
<p>元组看起来犹如列表，但使用圆括号而不是方括号来标识。定义元组后，就可以使用索引来访问其元素，就像访问列表元素一样。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dimensions <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>dimensions<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>dimensions<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token number">200</span> 
<span class="token number">50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>修改元组的操作是被禁止的</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dimensions <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span> 
dimensions<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">250</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>代码试图修改矩形的尺寸时，Python报告错误</p>
<p><a name="f3311e1e"></a></p>
<h3 id="_4-5-2-遍历元组中的所有值" tabindex="-1"><a class="header-anchor" href="#_4-5-2-遍历元组中的所有值" aria-hidden="true">#</a> 4.5.2 遍历元组中的所有值</h3>
<p>像列表一样，也可以使用for循环来遍历元组中的所有值：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dimensions <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span> 
<span class="token keyword">for</span> dimension <span class="token keyword">in</span> dimensions<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span>dimension<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token number">200</span> 
<span class="token number">50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>就像遍历列表时一样，Python返回元组中所有的元素</p>
<p><a name="a4debc6a"></a></p>
<h3 id="_4-5-3-修改元组变量" tabindex="-1"><a class="header-anchor" href="#_4-5-3-修改元组变量" aria-hidden="true">#</a> 4.5.3 修改元组变量</h3>
<p>虽然不能修改元组的元素，但可以给存储元组的变量赋值。因此，如果要修改前述矩形的尺寸，可重新定义整个元组：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dimensions <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Original dimensions:"</span><span class="token punctuation">)</span> 
<span class="token keyword">for</span> dimension <span class="token keyword">in</span> dimensions<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span>dimension<span class="token punctuation">)</span> 
dimensions <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"\nModified dimensions:"</span><span class="token punctuation">)</span> 
<span class="token keyword">for</span> dimension <span class="token keyword">in</span> dimensions<span class="token punctuation">:</span> 
 <span class="token keyword">print</span><span class="token punctuation">(</span>dimension<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给元组变量赋值是合法的</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Original dimensions<span class="token punctuation">:</span> 
<span class="token number">200</span> 
<span class="token number">50</span> 

Modified dimensions<span class="token punctuation">:</span> 
<span class="token number">400</span> 
<span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相比于列表，元组是更简单的数据结构。如果需要存储的一组值在程序的整个生命周期内都不变，可使用元组。</p>
<p><a name="8987a849"></a></p>
<h2 id="_4-6-设置代码格式" tabindex="-1"><a class="header-anchor" href="#_4-6-设置代码格式" aria-hidden="true">#</a> 4.6 设置代码格式</h2>
<p><a name="c281348d"></a></p>
<h3 id="_4-6-1-格式设置指南" tabindex="-1"><a class="header-anchor" href="#_4-6-1-格式设置指南" aria-hidden="true">#</a> 4.6.1 格式设置指南</h3>
<p><a name="28afecd5"></a></p>
<h3 id="_4-6-2-缩进" tabindex="-1"><a class="header-anchor" href="#_4-6-2-缩进" aria-hidden="true">#</a> 4.6.2 缩进</h3>
<p><a name="23d4fb44"></a></p>
<h3 id="_4-6-3-行长" tabindex="-1"><a class="header-anchor" href="#_4-6-3-行长" aria-hidden="true">#</a> 4.6.3 行长</h3>
<p><a name="d0d2300a"></a></p>
<h3 id="_4-6-4-空行" tabindex="-1"><a class="header-anchor" href="#_4-6-4-空行" aria-hidden="true">#</a> 4.6.4 空行</h3>
<p><a name="fe616f91"></a></p>
<h3 id="_4-6-5-其他格式设置指南" tabindex="-1"><a class="header-anchor" href="#_4-6-5-其他格式设置指南" aria-hidden="true">#</a> 4.6.5 其他格式设置指南</h3>
<p><a name="33311805"></a></p>
<h2 id="_4-7-小结" tabindex="-1"><a class="header-anchor" href="#_4-7-小结" aria-hidden="true">#</a> 4.7 小结</h2>
<p>在本章中，你学习了：如何高效地处理列表中的元素；如何使用for循环遍历列表，Python如何根据缩进来确定程序的结构以及如何避免一些常见的缩进错误；如何创建简单的数字列表，以及可对数字列表执行的一些操作；如何通过切片来使用列表的一部分和复制列表。你还学习了元组（它对不应变化的值提供了一定程度的保护），以及在代码变得越来越复杂时如何设置格式，使其易于阅读。<br />在第5章中，你将学习如何使用if语句在不同的条件下采取不同的措施；学习如何将一组较复杂的条件测试组合起来，并在满足特定条件时采取相应的措施。你还将学习如何在遍历列表时，通过使用if语句对特定元素采取特定的措施。</p>
</div></template>


