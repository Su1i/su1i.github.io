<template><div><p><a name="jzwpq"></a></p>
<h2 id="pycharm连接数据库" tabindex="-1"><a class="header-anchor" href="#pycharm连接数据库" aria-hidden="true">#</a> pycharm连接数据库</h2>
<p>三个位置查找数据库相关：</p>
<ul>
<li>右侧上方database</li>
<li>左下角database</li>
<li>配置里面plugins插件搜索安装</li>
</ul>
<p>再没有卸载重装pycharm<br />pycharm可以充当很多数据库的客户端<br />注意：连接前需提前创建好库
<a name="KZvsj"></a></p>
<h2 id="django连接数据库" tabindex="-1"><a class="header-anchor" href="#django连接数据库" aria-hidden="true">#</a> django连接数据库</h2>
<p>默认配置：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>DATABASES <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">'default'</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">'ENGINE'</span><span class="token punctuation">:</span> <span class="token string">'django.db.backends.sqlite3'</span><span class="token punctuation">,</span>
        <span class="token string">'NAME'</span><span class="token punctuation">:</span> BASE_DIR <span class="token operator">/</span> <span class="token string">'db.sqlite3'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>第一步在配置文件中配置</li>
</ol>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>DATABASES <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">'default'</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">'ENGINE'</span><span class="token punctuation">:</span> <span class="token string">'django.db.backends.mysql'</span><span class="token punctuation">,</span>
        <span class="token string">'NAME'</span><span class="token punctuation">:</span> <span class="token string">'django'</span><span class="token punctuation">,</span>
        <span class="token string">'USER'</span><span class="token punctuation">:</span> <span class="token string">'root'</span><span class="token punctuation">,</span>
        <span class="token string">'PASSWORD'</span><span class="token punctuation">:</span> <span class="token string">'root'</span><span class="token punctuation">,</span>
        <span class="token string">'HOST'</span><span class="token punctuation">:</span> <span class="token string">'127.0.0.1'</span><span class="token punctuation">,</span>
        <span class="token string">'PORT'</span><span class="token punctuation">:</span><span class="token number">3306</span><span class="token punctuation">,</span>
        <span class="token string">'CHARSET'</span><span class="token punctuation">:</span><span class="token string">'utf8'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>代码声明</li>
</ol>
<p>django默认使用的是mysqldb模块连接MySQL<br />但是该模块的兼容性不好，需要手动替换为pymsql<br />在项目名下的init或应用中的init文件中书写以下代码都可以</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> pymsql
pymsql<span class="token punctuation">.</span>install_as_MySQLdb<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


