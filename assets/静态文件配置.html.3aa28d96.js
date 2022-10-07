import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as s,f as e}from"./app.cdf6f04e.js";const i={},t=e(`<h1 id="\u9759\u6001\u6587\u4EF6\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u9759\u6001\u6587\u4EF6\u914D\u7F6E" aria-hidden="true">#</a> \u9759\u6001\u6587\u4EF6\u914D\u7F6E</h1><p>\u6211\u4EEC\u5C06HTML\u6587\u4EF6\u9ED8\u8BA4\u653E\u5728templates\u6587\u4EF6\u5939\u4E0B\uFF0C\u5C06\u9759\u6001\u6587\u4EF6\u653E\u5230static\u6587\u4EF6\u5939\u4E0B\u30024 <a name="XNXhO"></a></p><h2 id="\u9759\u6001\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u9759\u6001\u6587\u4EF6" aria-hidden="true">#</a> \u9759\u6001\u6587\u4EF6\uFF1A</h2><p>\u524D\u7AEF\u5DF2\u7ECF\u5199\u597D\u4E86\u7684\uFF0C\u80FD\u591F\u76F4\u63A5\u8C03\u7528\u4F7F\u7528\u7684\u6587\u4EF6<br>django\u9ED8\u8BA4\u4E0D\u4F1A\u521B\u5EFAstatic\u6587\u4EF6\u5939\uFF0C\u9700\u624B\u52A8\u521B\u5EFA\u5E76\u8FDB\u884C\u8FDB\u4E00\u6B65\u5212\u5206<br>static\u6587\u4EF6\u5939\uFF1A</p><ul><li>css</li><li>js</li><li>img</li><li>\u5176\u4ED6\u7B2C\u4E09\u65B9\u6587\u4EF6 <a name="wTJTM"></a></li></ul><h2 id="\u9759\u6001\u6587\u4EF6\u914D\u7F6E-1" tabindex="-1"><a class="header-anchor" href="#\u9759\u6001\u6587\u4EF6\u914D\u7F6E-1" aria-hidden="true">#</a> \u9759\u6001\u6587\u4EF6\u914D\u7F6E\uFF1A</h2><p><a name="YWEEc"></a></p><h3 id="\u7F13\u5B58\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u7F13\u5B58\u95EE\u9898" aria-hidden="true">#</a> \u7F13\u5B58\u95EE\u9898\uFF1A</h3><p>\u5F53\u4F60\u5728\u5199django\u9879\u76EE\u7684\u65F6\u5019\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0\u540E\u7AEF\u4EE3\u7801\u4FEE\u6539\u4E86\u4F46\u524D\u7AEF\u9875\u9762\u6CA1\u6709\u53D8\u5316\u7684\u60C5\u51B5\uFF1A</p><ol><li>\u5728\u540C\u4E00\u4E2A\u7AEF\u53E3\u5F00\u4E86\u597D\u51E0\u4E2Adjango\u9879\u76EE\uFF0C\u4E00\u76F4\u5728\u8DD1\u7684\u5176\u5B9E\u662F\u7B2C\u4E00\u4E2A\u9879\u76EE</li><li>\u6D4F\u89C8\u5668\u7F13\u5B58\u95EE\u9898\uFF1A\u5728\u68C0\u67E5\u7A97\u53E3\u7684\u8BBE\u7F6E\u4E2D\u52FE\u9009\u4E0A\u7981\u7528\u7F13\u5B58\u3002\uFF08diable cache\uFF09 <a name="ybeKS"></a></li></ol><h3 id="\u914D\u7F6E\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u95EE\u9898" aria-hidden="true">#</a> \u914D\u7F6E\u95EE\u9898\uFF1A</h3><p>\u5728\u6D4F\u89C8\u5668\u4E2D\u8F93\u5165url\u80FD\u591F\u8BBF\u95EE\u5230\u5BF9\u5E94\u7684\u8D44\u6E90\uFF0C\u662F\u56E0\u4E3A\u540E\u7AEF\u5F00\u8BBE\u4E86\u8BE5\u8D44\u6E90\u7684\u63A5\u53E3<br>\u5982\u679C\u8BBF\u95EE\u4E0D\u5230\u8BE5\u8D44\u6E90\uFF0C\u5219\u8BF4\u660E\u540E\u7AEF\u6CA1\u6709\u5F00\u8BBE\u8BE5\u8D44\u6E90\u7684\u63A5\u53E3 <a name="MVnc9"></a></p><h3 id="\u5982\u4F55\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5982\u4F55\u914D\u7F6E" aria-hidden="true">#</a> \u5982\u4F55\u914D\u7F6E\uFF1A</h3><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># settings.py</span>

STATIC_URL <span class="token operator">=</span> <span class="token string">&#39;/static/&#39;</span> 
<span class="token triple-quoted-string string">&#39;&#39;&#39;
\u7C7B\u4F3C\u4E8E\u8BBF\u95EE\u9759\u6001\u6587\u4EF6\u7684\u4EE4\u724C\uFF0C\u5982\u679C\u60F3\u8BBF\u95EE\u9759\u6001\u6587\u4EF6\uFF0C\u5FC5\u987B\u4EE5static\u5F00\u5934
&#39;&#39;&#39;</span>

STATICFILES_DIR <span class="token operator">=</span> <span class="token punctuation">[</span>
	os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>BASE_DIR<span class="token punctuation">,</span> <span class="token string">&#39;static&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>BASE_DIR<span class="token punctuation">,</span> <span class="token string">&#39;static1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>BASE_DIR<span class="token punctuation">,</span> <span class="token string">&#39;static2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
<span class="token triple-quoted-string string">&#39;&#39;&#39;
\u5728\u5217\u8868\u4ECE\u4E0A\u5F80\u4E0B\u5BFB\u627E\u6587\u4EF6
&#39;&#39;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="E0amy"></a></p><h3 id="\u52A8\u6001\u89E3\u6790\u9759\u6001\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001\u89E3\u6790\u9759\u6001\u6587\u4EF6" aria-hidden="true">#</a> \u52A8\u6001\u89E3\u6790\u9759\u6001\u6587\u4EF6\uFF1A</h3><p>HTML\u4E2D\u7684\u6A21\u677F\u8BED\u6CD5\u914D\u7F6E\uFF1A<br><img src="https://cdn.nlark.com/yuque/0/2022/png/2725910/1641462320733-a1442a33-25df-4572-aa42-93ae0bfdc88a.png#clientId=u849dd4e0-e7df-4&amp;crop=0&amp;crop=0&amp;crop=1&amp;crop=1&amp;from=paste&amp;height=96&amp;id=u88f27005&amp;margin=[object Object]&amp;name=image.png&amp;originHeight=191&amp;originWidth=1192&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=126437&amp;status=done&amp;style=none&amp;taskId=u0dfb062e-d45f-4993-a5a9-4ccb9619059&amp;title=&amp;width=596" alt="image.png" loading="lazy"></p>`,17),p=[t];function c(o,l){return n(),s("div",null,p)}const u=a(i,[["render",c],["__file","\u9759\u6001\u6587\u4EF6\u914D\u7F6E.html.vue"]]);export{u as default};
