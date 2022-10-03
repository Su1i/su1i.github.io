<template><div><p><a name="Oh1h6"></a></p>
<h1 id="路由匹配" tabindex="-1"><a class="header-anchor" href="#路由匹配" aria-hidden="true">#</a> 路由匹配</h1>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>url<span class="token punctuation">(</span><span class="token string">r'^test/$'</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>test<span class="token punctuation">)</span>
url<span class="token punctuation">(</span><span class="token string">r'^testadd/$'</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>testadd<span class="token punctuation">)</span>
<span class="token comment"># 首页</span>
url<span class="token punctuation">(</span><span class="token string">r'^$'</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>home<span class="token punctuation">)</span>

<span class="token triple-quoted-string string">'''
url方法第一个参数是正则表达式，
	只要第一个参数正则表达式能够匹配到内容，那么就会立刻停止往下匹配
    直接执行对应的视图函数
你在输入url的时候会默认加斜杠
	django内部默认帮你做到重定向
    第一次匹配不到
    加斜杠再匹配一次
'''</span>

<span class="token comment"># 取消自动加斜杠</span>
APPEND_SLASH <span class="token operator">=</span> Flase<span class="token operator">/</span><span class="token boolean">True</span>  <span class="token comment"># 默认是True自动加斜杠</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="bj4ym"></a></p>
<h1 id="无名有名分组" tabindex="-1"><a class="header-anchor" href="#无名有名分组" aria-hidden="true">#</a> 无名有名分组</h1>
<p><a name="i13CR"></a></p>
<h2 id="无名分组" tabindex="-1"><a class="header-anchor" href="#无名分组" aria-hidden="true">#</a> 无名分组</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 分组，就是给某一段正则表达式用小括号括起来</span>
url<span class="token punctuation">(</span><span class="token string">r'^test/(\d+)/'</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>test<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>xx<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>xx<span class="token punctuation">)</span>
    <span class="token keyword">return</span> HttpResponse<span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">)</span>

<span class="token comment"># 无名分组就是将括号内正则表达式匹配到的内容当作位置参数传递给后面的视图函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="Z3V1Y"></a></p>
<h2 id="有名分组" tabindex="-1"><a class="header-anchor" href="#有名分组" aria-hidden="true">#</a> 有名分组</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 可以给正则表达式起一个别名</span>
url<span class="token punctuation">(</span><span class="token string">r'^testadd/(?P&lt;year>\d+)/'</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>testadd<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">testadd</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span>year<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>year<span class="token punctuation">)</span>
    <span class="token keyword">return</span> HttpResponse<span class="token punctuation">(</span><span class="token string">'testadd'</span><span class="token punctuation">)</span>

<span class="token comment"># 有名分组就是将括号内正则表达式匹配到的内容当作关键字参数传递给后面的视图函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="yCrii"></a></p>
<h2 id="无名有名是否可以混合使用" tabindex="-1"><a class="header-anchor" href="#无名有名是否可以混合使用" aria-hidden="true">#</a> 无名有名是否可以混合使用</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 不能混用，但是同一个分组可以使用N多次</span>

url<span class="token punctuation">(</span><span class="token string">r'^test/(\d+)/(\d+)/(\d+)/'</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>test<span class="token punctuation">)</span>
url<span class="token punctuation">(</span><span class="token string">r'^testadd/(?P&lt;year>\d+)/(?P&lt;year>\d+)/(?P&lt;year>\d+)/'</span><span class="token punctuation">,</span> views<span class="token punctuation">.</span>testadd<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="t5Lhi"></a></p>
<h1 id="反向解析" tabindex="-1"><a class="header-anchor" href="#反向解析" aria-hidden="true">#</a> 反向解析</h1>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 本质：通过一些方法得到一个结果，该结果可以直接访问对应的url触发视图函数的运行</span>

<span class="token comment"># 先给路由与视图函数起一个别名</span>
url<span class="token punctuation">(</span><span class="token string">r'^func/'</span><span class="token punctuation">,</span>views<span class="token punctuation">.</span>func<span class="token punctuation">,</span>name<span class="token operator">=</span><span class="token string">'ooo'</span><span class="token punctuation">)</span>
<span class="token comment"># 反向解析</span>
	<span class="token comment"># 后端反向解析</span>
    reverse<span class="token punctuation">(</span><span class="token string">'ooo'</span><span class="token punctuation">)</span>
    <span class="token comment"># 前端反向解析</span>
    <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"{% url 'ooo' %}"</span><span class="token operator">></span><span class="token number">111</span><span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="R25rs"></a></p>
<h2 id="无名有名分组反向解析" tabindex="-1"><a class="header-anchor" href="#无名有名分组反向解析" aria-hidden="true">#</a> 无名有名分组反向解析</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 无名分组反向解析</span>
url<span class="token punctuation">(</span><span class="token string">r'^func/(\d+)/'</span><span class="token punctuation">,</span>views<span class="token punctuation">.</span>func<span class="token punctuation">,</span>name<span class="token operator">=</span><span class="token string">'ooo'</span><span class="token punctuation">)</span>
<span class="token comment"># 前端</span>
    <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"{% url 'ooo' 123 %}"</span><span class="token operator">></span><span class="token number">111</span><span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span>
<span class="token comment"># 后端</span>
    reverse<span class="token punctuation">(</span><span class="token string">'ooo'</span><span class="token punctuation">,</span>args<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
<span class="token triple-quoted-string string">"""
这个数字写代码的时候应该放什么
数字一般情况下放的是数据的主键值  数据的编辑和删除
url(r'^edit/(\d+)/',views.edit,name='xxx')
def edit(request,edit_id):
	reverse('xxx',args=(edit_id,))
    
{% for user_obj in user_queryset %}
&lt;a href="{% url 'xxx' user_obj.id %}">编辑&lt;/a>
{%endfor%}

"""</span>

<span class="token comment"># 有名分组反向解析</span>
url<span class="token punctuation">(</span><span class="token string">r'^func/(?P&lt;year>\d+)/'</span><span class="token punctuation">,</span>views<span class="token punctuation">.</span>func<span class="token punctuation">,</span>name<span class="token operator">=</span><span class="token string">'xxx'</span><span class="token punctuation">)</span>
<span class="token comment"># 前端</span>
    <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"{% url 'ooo' year=123 %}"</span><span class="token operator">></span><span class="token number">111</span><span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span>    了解
    <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"{% url 'ooo' 123 %}"</span><span class="token operator">></span><span class="token number">111</span><span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span>         记忆 
<span class="token comment"># 后端</span>
	reverse<span class="token punctuation">(</span><span class="token string">'xxx'</span><span class="token punctuation">,</span>kwargs<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">'year'</span><span class="token operator">=</span><span class="token number">123</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	reverse<span class="token punctuation">(</span><span class="token string">'xxx'</span><span class="token punctuation">,</span>args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


