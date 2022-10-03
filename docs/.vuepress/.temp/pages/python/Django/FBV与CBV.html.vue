<template><div><p>视图函数可以是函数也可以是类
<a name="PkkLV"></a></p>
<h2 id="fbv" tabindex="-1"><a class="header-anchor" href="#fbv" aria-hidden="true">#</a> FBV</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">index</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> HttpResponse<span class="token punctuation">(</span><span class="token string">'index'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="qEQfa"></a></p>
<h2 id="cbv" tabindex="-1"><a class="header-anchor" href="#cbv" aria-hidden="true">#</a> CBV</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># CBV实现</span>
<span class="token keyword">from</span> django<span class="token punctuation">.</span>views <span class="token keyword">import</span> View
<span class="token keyword">class</span> <span class="token class-name">MyLogin</span><span class="token punctuation">(</span>View<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">get</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>request<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> render<span class="token punctuation">(</span>request<span class="token punctuation">,</span><span class="token string">'form.html'</span><span class="token punctuation">)</span>
    
    <span class="token keyword">def</span> <span class="token function">post</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span>request<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> HttpResponse<span class="token punctuation">(</span><span class="token string">'POST方法'</span><span class="token punctuation">)</span>
    

<span class="token comment"># CBV路由</span>
url<span class="token punctuation">(</span><span class="token string">r'^login/'</span><span class="token punctuation">,</span>views<span class="token punctuation">.</span>MyLogin<span class="token punctuation">.</span>as_view<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>FBV和CBV各有千秋
<a name="HspT5"></a></p>
<h3 id="cbv特点" tabindex="-1"><a class="header-anchor" href="#cbv特点" aria-hidden="true">#</a> CBV特点：</h3>
<p>能够直接根据请求方式的不同直接匹配到对应的方法执行</p>
</div></template>


