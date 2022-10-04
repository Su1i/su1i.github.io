<template><div><h1 id="静态文件配置" tabindex="-1"><a class="header-anchor" href="#静态文件配置" aria-hidden="true">#</a> 静态文件配置</h1>
<p>我们将HTML文件默认放在templates文件夹下，将静态文件放到static文件夹下。4
<a name="XNXhO"></a></p>
<h2 id="静态文件" tabindex="-1"><a class="header-anchor" href="#静态文件" aria-hidden="true">#</a> 静态文件：</h2>
<p>前端已经写好了的，能够直接调用使用的文件<br />django默认不会创建static文件夹，需手动创建并进行进一步划分<br />static文件夹：</p>
<ul>
<li>css</li>
<li>js</li>
<li>img</li>
<li>其他第三方文件
<a name="wTJTM"></a></li>
</ul>
<h2 id="静态文件配置-1" tabindex="-1"><a class="header-anchor" href="#静态文件配置-1" aria-hidden="true">#</a> 静态文件配置：</h2>
<p><a name="YWEEc"></a></p>
<h3 id="缓存问题" tabindex="-1"><a class="header-anchor" href="#缓存问题" aria-hidden="true">#</a> 缓存问题：</h3>
<p>当你在写django项目的时候，可能会出现后端代码修改了但前端页面没有变化的情况：</p>
<ol>
<li>在同一个端口开了好几个django项目，一直在跑的其实是第一个项目</li>
<li>浏览器缓存问题：在检查窗口的设置中勾选上禁用缓存。（diable cache）
<a name="ybeKS"></a></li>
</ol>
<h3 id="配置问题" tabindex="-1"><a class="header-anchor" href="#配置问题" aria-hidden="true">#</a> 配置问题：</h3>
<p>在浏览器中输入url能够访问到对应的资源，是因为后端开设了该资源的接口<br />如果访问不到该资源，则说明后端没有开设该资源的接口
<a name="MVnc9"></a></p>
<h3 id="如何配置" tabindex="-1"><a class="header-anchor" href="#如何配置" aria-hidden="true">#</a> 如何配置：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># settings.py</span>

STATIC_URL <span class="token operator">=</span> <span class="token string">'/static/'</span> 
<span class="token triple-quoted-string string">'''
类似于访问静态文件的令牌，如果想访问静态文件，必须以static开头
'''</span>

STATICFILES_DIR <span class="token operator">=</span> <span class="token punctuation">[</span>
	os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>BASE_DIR<span class="token punctuation">,</span> <span class="token string">'static'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>BASE_DIR<span class="token punctuation">,</span> <span class="token string">'static1'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>BASE_DIR<span class="token punctuation">,</span> <span class="token string">'static2'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
<span class="token triple-quoted-string string">'''
在列表从上往下寻找文件
'''</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="E0amy"></a></p>
<h3 id="动态解析静态文件" tabindex="-1"><a class="header-anchor" href="#动态解析静态文件" aria-hidden="true">#</a> 动态解析静态文件：</h3>
<p>HTML中的模板语法配置：<br /><img src="https://cdn.nlark.com/yuque/0/2022/png/2725910/1641462320733-a1442a33-25df-4572-aa42-93ae0bfdc88a.png#clientId=u849dd4e0-e7df-4&amp;crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;from=paste&amp;height=96&amp;id=u88f27005&amp;margin=[object Object]&amp;name=image.png&amp;originHeight=191&amp;originWidth=1192&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=126437&amp;status=done&amp;style=none&amp;taskId=u0dfb062e-d45f-4993-a5a9-4ccb9619059&amp;title=&amp;width=596" alt="image.png" loading="lazy"></p>
</div></template>


