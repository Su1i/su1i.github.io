<template><div><p><a name="Y4o46"></a></p>
<h2 id="orm前戏" tabindex="-1"><a class="header-anchor" href="#orm前戏" aria-hidden="true">#</a> orm前戏</h2>
<p><a name="h8ptz"></a></p>
<h3 id="_1-首先书写一个类" tabindex="-1"><a class="header-anchor" href="#_1-首先书写一个类" aria-hidden="true">#</a> 1.首先书写一个类：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">IDMapping</span><span class="token punctuation">(</span>models<span class="token punctuation">.</span>Model<span class="token punctuation">)</span><span class="token punctuation">:</span>
    studyID <span class="token operator">=</span> models<span class="token punctuation">.</span>CharField<span class="token punctuation">(</span>max_length<span class="token operator">=</span><span class="token number">15</span><span class="token punctuation">,</span> verbose_name<span class="token operator">=</span><span class="token string">'学号'</span><span class="token punctuation">)</span>  <span class="token comment"># 学号</span>
    competitionID <span class="token operator">=</span> models<span class="token punctuation">.</span>CharField<span class="token punctuation">(</span>max_length<span class="token operator">=</span><span class="token number">15</span><span class="token punctuation">,</span> verbose_name<span class="token operator">=</span><span class="token string">'竞赛编号'</span><span class="token punctuation">)</span>  <span class="token comment"># 竞赛编号</span>

    
<span class="token comment"># CharField必须要指定max_length参数，不然会直接报错</span>
<span class="token comment"># verbose_name参数是所有字段都有的，就是用来对字段进行解释</span>

<span class="token triple-quoted-string string">'''
由于一张表中必须要有主键，并且一般情况下都叫id
所以当你没有定义主键的时候，orm会自动地创建一个叫做id的主键
'''</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="Z0c51"></a></p>
<h3 id="_2-数据库迁移命令" tabindex="-1"><a class="header-anchor" href="#_2-数据库迁移命令" aria-hidden="true">#</a> 2.数据库迁移命令：</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>python3 manage.py makemigrations 将操作记录到migrations文件夹
python3 manage.py migrate        将操作同步到数据库中
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>只要修改了models.py文件的内容，就必须执行上述两条命令
<a name="nfnDy"></a></p>
<h2 id="字段的增删改查" tabindex="-1"><a class="header-anchor" href="#字段的增删改查" aria-hidden="true">#</a> 字段的增删改查</h2>
<p><a name="Ra7EI"></a></p>
<h3 id="字段的增加" tabindex="-1"><a class="header-anchor" href="#字段的增加" aria-hidden="true">#</a> 字段的增加：</h3>
<ol>
<li>可以直接在终端中给出默认值</li>
<li>该字段可以为空，设置null=True</li>
<li>直接设置字段默认值：default='123'
<a name="v4NT2"></a></li>
</ol>
<h3 id="字段的删除" tabindex="-1"><a class="header-anchor" href="#字段的删除" aria-hidden="true">#</a> 字段的删除：</h3>
<p>直接注释对应的字段的代码然后执行两条数据库迁移命令即可<br />注意：执行后原来字段对应的数据将会消失
<a name="NGGX5"></a></p>
<h3 id="字段的修改" tabindex="-1"><a class="header-anchor" href="#字段的修改" aria-hidden="true">#</a> 字段的修改：</h3>
<p>直接修改代码然后执行迁移命令
<a name="Dzd7k"></a></p>
<h2 id="数据的增删改查" tabindex="-1"><a class="header-anchor" href="#数据的增删改查" aria-hidden="true">#</a> 数据的增删改查</h2>
<p><a name="kgL7b"></a></p>
<h3 id="数据的查询" tabindex="-1"><a class="header-anchor" href="#数据的查询" aria-hidden="true">#</a> 数据的查询：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>res <span class="token operator">=</span> models<span class="token punctuation">.</span>User<span class="token punctuation">.</span>objects<span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span>username<span class="token operator">=</span>username<span class="token punctuation">)</span><span class="token punctuation">.</span>first<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token triple-quoted-string string">'''
返回值可以看作是列表数据对象的格式
它也支持索引取值，切片操作，但是不支持负数索引
他不推荐你使用索引的方式取值
'''</span>
<span class="token comment"># filter括号内可以携带多个参数，参数与参数之间是and关系</span>
<span class="token comment"># 可以把filter联想成where记忆</span>

<span class="token comment"># 查询用户表里面的所有内容</span>
<span class="token comment"># 方式一：</span>
res <span class="token operator">=</span> models<span class="token punctuation">.</span>User<span class="token punctuation">.</span>objects<span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 方式二：</span>
res <span class="token operator">=</span> models<span class="token punctuation">.</span>User<span class="token punctuation">.</span>objects<span class="token punctuation">.</span><span class="token builtin">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="vsPkg"></a></p>
<h3 id="数据的增加" tabindex="-1"><a class="header-anchor" href="#数据的增加" aria-hidden="true">#</a> 数据的增加：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> app <span class="token keyword">import</span> models
<span class="token comment"># 方法一：</span>
res <span class="token operator">=</span> models<span class="token punctuation">.</span>User<span class="token punctuation">.</span>objects<span class="token punctuation">.</span>create<span class="token punctuation">(</span>username<span class="token operator">=</span>username<span class="token punctuation">,</span>password<span class="token operator">=</span>password<span class="token punctuation">)</span>
<span class="token comment"># 返回值就是当前创建的对象</span>
<span class="token comment"># 方法二：</span>
user_obj <span class="token operator">=</span> models<span class="token punctuation">.</span>User<span class="token punctuation">(</span>username<span class="token operator">=</span>username<span class="token punctuation">,</span>password<span class="token operator">=</span>password<span class="token punctuation">)</span>
user_obj<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="YYRX6"></a></p>
<h3 id="数据的修改" tabindex="-1"><a class="header-anchor" href="#数据的修改" aria-hidden="true">#</a> 数据的修改：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 去修改数据库中对应的数据内容</span>
<span class="token comment"># 方式一：</span>
models<span class="token punctuation">.</span>User<span class="token punctuation">.</span>objects<span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span>edit_id<span class="token punctuation">)</span><span class="token punctuation">.</span>update<span class="token punctuation">(</span>username<span class="token operator">=</span>username<span class="token punctuation">,</span>password<span class="token operator">=</span>password<span class="token punctuation">)</span>

<span class="token comment"># 方式二：</span>
edit_obj<span class="token punctuation">.</span>username <span class="token operator">=</span> username
edit_obj<span class="token punctuation">.</span>password <span class="token operator">=</span> password
edit<span class="token punctuation">.</span>save<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="zXXgW"></a></p>
<h3 id="数据的删除" tabindex="-1"><a class="header-anchor" href="#数据的删除" aria-hidden="true">#</a> 数据的删除：</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>models<span class="token punctuation">.</span>User<span class="token punctuation">.</span>objects<span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span>edit_id<span class="token punctuation">)</span><span class="token punctuation">.</span>delete<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 删除数据内部其实并不是真正的删除，我们会给数据一个标识字段用来表示当前数据是否被删除</span>
<span class="token comment"># 如果被删除了仅仅修改该标识字段的状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a name="KZbSV"></a></p>
<h2 id="orm创建表关系" tabindex="-1"><a class="header-anchor" href="#orm创建表关系" aria-hidden="true">#</a> orm创建表关系</h2>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 一对多：</span>
publish <span class="token operator">=</span> models<span class="token punctuation">.</span>ForeignKey<span class="token punctuation">(</span>to<span class="token operator">=</span><span class="token string">'Publish'</span><span class="token punctuation">)</span> <span class="token comment"># 默认与出版社的主键字段做外键关联</span>
<span class="token comment"># 多对多（默认会自动创建第三张表）：</span>
authors <span class="token operator">=</span> models<span class="token punctuation">.</span>ManyToManyField<span class="token punctuation">(</span>to<span class="token operator">=</span><span class="token string">'Author'</span><span class="token punctuation">)</span>
<span class="token comment"># 一对一：</span>
author_detail <span class="token operator">=</span> models<span class="token punctuation">.</span>OneToOneField<span class="token punctuation">(</span>to<span class="token operator">=</span><span class="token string">'AuthorDetail'</span><span class="token punctuation">)</span>


<span class="token triple-quoted-string string">'''
ForeignKey,OneToOneField 会自动在字段后面加上_id后缀
在django1.x版本中默认都是级联删除的
多对多表关系可以有好几种创建方式，这里先只介绍一种

'''</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


