<template><div><p><a name="M3AVt"></a></p>
<h2 id="_2-1运行hello-world-py时发生的情况" tabindex="-1"><a class="header-anchor" href="#_2-1运行hello-world-py时发生的情况" aria-hidden="true">#</a> 2.1运行hello_world.py时发生的情况</h2>
<p><a name="Kshp4"></a></p>
<h2 id="_2-2-变量" tabindex="-1"><a class="header-anchor" href="#_2-2-变量" aria-hidden="true">#</a> 2.2 变量</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>message <span class="token operator">=</span> <span class="token string">"Hello Python world!"</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
message <span class="token operator">=</span> <span class="token string">"Hello Python Crash Course world!"</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Hello Python world! 
Hello Python Crash Course world!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="IYdJY"></a></p>
<h3 id="_2-2-1-变量的命名和使用" tabindex="-1"><a class="header-anchor" href="#_2-2-1-变量的命名和使用" aria-hidden="true">#</a> 2.2.1 变量的命名和使用</h3>
<ul>
<li>变量名只能包含字母、数字和下划线。变量名可以字母或下划线打头，但不能以数字打头，例如，可将变量命名为message_1，但不能将其命名为1_message。</li>
<li>变量名不能包含空格，但可使用下划线来分隔其中的单词。例如，变量名greeting_message可行，但变量名greeting message会引发错误。</li>
<li>不要将Python关键字和函数名用作变量名，即不要使用Python保留用于特殊用途的单词，如print（请参见附录A.4）。</li>
<li>变量名应既简短又具有描述性。例如，name比n好，student_name比s_n好，name_length比length_of_persons_name好。</li>
<li>慎用小写字母l和大写字母O，因为它们可能被人错看成数字1和0。</li>
</ul>
<p><a name="HbW87"></a></p>
<h3 id="_2-2-2-使用变量时避免命名错误" tabindex="-1"><a class="header-anchor" href="#_2-2-2-使用变量时避免命名错误" aria-hidden="true">#</a> 2.2.2 使用变量时避免命名错误</h3>
<p><a name="KfTtT"></a></p>
<h2 id="_2-3-字符串" tabindex="-1"><a class="header-anchor" href="#_2-3-字符串" aria-hidden="true">#</a> 2.3 字符串</h2>
<p>字符串就是一系列字符。在Python中，用引号括起的都是字符串，其中的引号可以是单引号，也可以是双引号，如下所示：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token string">"This is a string."</span> 
<span class="token string">'This is also a string.'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="fiFlr"></a></p>
<h3 id="_2-3-1-使用方法修改字符串的大小写" tabindex="-1"><a class="header-anchor" href="#_2-3-1-使用方法修改字符串的大小写" aria-hidden="true">#</a> 2.3.1 使用方法修改字符串的大小写</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>name <span class="token operator">=</span> <span class="token string">"ada lovelace"</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Ada Lovelace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在name.title()中，name后面的句点（.）让Python对变量name执行方法title()指定的操作。每个方法后面都跟着一对括号，这是因为方法通常需要额外的信息来完成其工作。这种信息是在括号内提供的。函数title()不需要额外的信息，因此它后面的括号是空的。<br />title()以首字母大写的方式显示每个单词，即将每个单词的首字母都改为大写。<br />要将字符串改为全部大写或全部小写，可以像下面这样做：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>name <span class="token operator">=</span> <span class="token string">"Ada Lovelace"</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>ADA LOVELACE 
ada lovelace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="OgrMy"></a></p>
<h3 id="_2-3-2-合并-拼接-字符串" tabindex="-1"><a class="header-anchor" href="#_2-3-2-合并-拼接-字符串" aria-hidden="true">#</a> 2.3.2 合并（拼接）字符串</h3>
<p>Python使用加号（+）来合并字符串。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>first_name <span class="token operator">=</span> <span class="token string">"ada"</span> 
last_name <span class="token operator">=</span> <span class="token string">"lovelace"</span> 
full_name <span class="token operator">=</span> first_name <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> last_name 
message <span class="token operator">=</span> <span class="token string">"Hello, "</span> <span class="token operator">+</span> full_name<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"!"</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Hello<span class="token punctuation">,</span> Ada Lovelace!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="Ie9a8"></a></p>
<h3 id="_2-3-3-使用制表符或换行符来添加空白" tabindex="-1"><a class="header-anchor" href="#_2-3-3-使用制表符或换行符来添加空白" aria-hidden="true">#</a> 2.3.3 使用制表符或换行符来添加空白</h3>
<p>要在字符串中添加制表符，可使用字符组合\t<br />要在字符串中添加换行符，可使用字符组合\n<br />还可在同一个字符串中同时包含制表符和换行符。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Languages:\n\tPython\n\tC\n\tJavaScript"</span><span class="token punctuation">)</span> 
Languages<span class="token punctuation">:</span> 
     Python 
     C 
     JavaScript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="V14NW"></a></p>
<h3 id="_2-3-4-删除空白" tabindex="-1"><a class="header-anchor" href="#_2-3-4-删除空白" aria-hidden="true">#</a> 2.3.4 删除空白</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> favorite_language <span class="token operator">=</span> <span class="token string">' python '</span>
<span class="token operator">>></span><span class="token operator">></span> favorite_language<span class="token punctuation">.</span>rstrip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">#剔除右端空白</span>
<span class="token string">' python'</span> 
<span class="token operator">>></span><span class="token operator">></span> favorite_language<span class="token punctuation">.</span>lstrip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">#剔除左端空白</span>
<span class="token string">'python '</span> 
<span class="token operator">>></span><span class="token operator">></span> favorite_language<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">#剔除两端空白</span>
<span class="token string">'python'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="D4whW"></a></p>
<h3 id="_2-3-5-使用字符串时避免语法错误" tabindex="-1"><a class="header-anchor" href="#_2-3-5-使用字符串时避免语法错误" aria-hidden="true">#</a> 2.3.5 使用字符串时避免语法错误</h3>
<p><a name="Nfkwh"></a></p>
<h3 id="_2-3-6-python2中的print语句" tabindex="-1"><a class="header-anchor" href="#_2-3-6-python2中的print语句" aria-hidden="true">#</a> 2.3.6 python2中的print语句</h3>
<p><a name="GCdv2"></a></p>
<h2 id="_2-4-数字" tabindex="-1"><a class="header-anchor" href="#_2-4-数字" aria-hidden="true">#</a> 2.4 数字</h2>
<p><a name="ibF5V"></a></p>
<h3 id="_2-4-1-整数" tabindex="-1"><a class="header-anchor" href="#_2-4-1-整数" aria-hidden="true">#</a> 2.4.1 整数</h3>
<p>在Python中，可对整数执行加（+）减（-）乘（*）除（/）运算。<br />在终端会话中，Python直接返回运算结果。Python使用两个乘号表示乘方运算。<br />Python还支持运算次序，因此你可在同一个表达式中使用多种运算。你还可以使用括号来修改运算次序，让Python按你指定的次序执行运算。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">3</span><span class="token operator">*</span><span class="token number">4</span>
<span class="token number">14</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">4</span>
<span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="f63Vd"></a></p>
<h3 id="_2-4-2-浮点数" tabindex="-1"><a class="header-anchor" href="#_2-4-2-浮点数" aria-hidden="true">#</a> 2.4.2 浮点数</h3>
<p>Python将带小数点的数字都称为浮点数。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> <span class="token number">0.2</span> <span class="token operator">+</span> <span class="token number">0.1</span>
<span class="token number">0.30000000000000004</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token number">3</span> <span class="token operator">*</span> <span class="token number">0.1</span>
<span class="token number">0.30000000000000004</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有语言都存在这种问题，没有什么可担心的。</p>
<p><a name="PaXhF"></a></p>
<h3 id="_2-4-3-使用函数str-避免类型错误" tabindex="-1"><a class="header-anchor" href="#_2-4-3-使用函数str-避免类型错误" aria-hidden="true">#</a> 2.4.3 使用函数str（）避免类型错误</h3>
<p>你经常需要在消息中使用变量的值。<br />可调用函数str()，它让Python将非字符串值表示<br />为字符串：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>age <span class="token operator">=</span> <span class="token number">23</span> 
message <span class="token operator">=</span> <span class="token string">"Happy "</span> <span class="token operator">+</span> <span class="token builtin">str</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"rd Birthday!"</span> 
<span class="token keyword">print</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Happy 23rd Birthday!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a name="FAyYY"></a></p>
<h3 id="_2-4-4-python2中的整数" tabindex="-1"><a class="header-anchor" href="#_2-4-4-python2中的整数" aria-hidden="true">#</a> 2.4.4 python2中的整数</h3>
<p>在Python 2中，将两个整数相除得到的结果稍有不同：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> python2<span class="token punctuation">.</span><span class="token number">7</span>
<span class="token operator">>></span><span class="token operator">></span> <span class="token number">3</span> <span class="token operator">/</span> <span class="token number">2</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Python返回的结果为1，而不是1.5。在Python 2中，整数除法的结果只包含整数部分，小数部分被删除。请注意，计算整数结果时，采取的方式不是四舍五入，而是将小数部分直接删除。<br />在Python 2中，若要避免这种情况，务必确保至少有一个操作数为浮点数，这样结果也将为浮点数：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">>></span><span class="token operator">></span> <span class="token number">3</span> <span class="token operator">/</span> <span class="token number">2</span>
<span class="token number">1</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token number">3.0</span> <span class="token operator">/</span> <span class="token number">2</span>
<span class="token number">1.5</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token number">3</span> <span class="token operator">/</span> <span class="token number">2.0</span>
<span class="token number">1.5</span> 
<span class="token operator">>></span><span class="token operator">></span> <span class="token number">3.0</span> <span class="token operator">/</span> <span class="token number">2.0</span>
<span class="token number">1.5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="IXWXE"></a></p>
<h2 id="_2-5-注释" tabindex="-1"><a class="header-anchor" href="#_2-5-注释" aria-hidden="true">#</a> 2.5 注释</h2>
<p>python中的注释以#开头。</p>
<p><a name="AqViw"></a></p>
<h2 id="_2-6-python之禅" tabindex="-1"><a class="header-anchor" href="#_2-6-python之禅" aria-hidden="true">#</a> 2.6 python之禅</h2>
<p>在解释器中执行命令import this即可查看。</p>
<p><a name="xZ9cF"></a></p>
<h2 id="_2-7-小结" tabindex="-1"><a class="header-anchor" href="#_2-7-小结" aria-hidden="true">#</a> 2.7 小结</h2>
<p>在本章中，你学习了：如何使用变量；如何创建描述性变量名以及如何消除名称错误和语法错误；字符串是什么，以及如何使用小写、大写和首字母大写方式显示字符串；使用空白来显示整洁的输出，以及如何剔除字符串中多余的空白；如何使用整数和浮点数；使用数值数据时需要注意的意外行为。你还学习了如何编写说明性注释，让代码对你和其他人来说更容易理解。最后，你了解了让代码尽可能简单的理念。<br />在第3章，你将学习如何在被称为列表的变量中存储信息集，以及如何通过遍历列表来操作其中的信息。</p>
</div></template>


