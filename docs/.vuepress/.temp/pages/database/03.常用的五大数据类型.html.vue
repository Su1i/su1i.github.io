<template><div><h1 id="_03-常用五大数据类型" tabindex="-1"><a class="header-anchor" href="#_03-常用五大数据类型" aria-hidden="true">#</a> 03.常用五大数据类型</h1>
<p>哪里去获得redis常见数据类型操作命令<a href="http://www.redis.cn/commands.html" target="_blank" rel="noopener noreferrer">http://www.redis.cn/commands.html<ExternalLinkIcon/></a></p>
<h2 id="_3-1-redis键-key" tabindex="-1"><a class="header-anchor" href="#_3-1-redis键-key" aria-hidden="true">#</a> 3.1 Redis键(key)</h2>
<p>keys *查看当前库所有key   (匹配：keys *1)</p>
<p>exists key判断某个key是否存在</p>
<p>type key 查看你的key是什么类型</p>
<p>del key    删除指定的key数据</p>
<p>unlink key  根据value选择非阻塞删除</p>
<p>仅将keys从keyspace元数据中删除，真正的删除会在后续异步操作。</p>
<p>expire key 10  10秒钟：为给定的key设置过期时间</p>
<p>ttl key 查看还有多少秒过期，-1表示永不过期，-2表示已过期</p>
<p>select命令切换数据库</p>
<p>dbsize查看当前数据库的key的数量</p>
<p>flushdb清空当前库</p>
<p>flushall通杀全部库</p>
<h2 id="_3-2-redis字符串-string" tabindex="-1"><a class="header-anchor" href="#_3-2-redis字符串-string" aria-hidden="true">#</a> 3.2 Redis字符串(String)</h2>
<h3 id="_3-2-1-简介" tabindex="-1"><a class="header-anchor" href="#_3-2-1-简介" aria-hidden="true">#</a> 3.2.1 简介</h3>
<p>String是Redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。</p>
<p>String类型是二进制安全的。意味着Redis的string可以包含任何数据。比如jpg图片或者序列化的对象。</p>
<p>String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是512M</p>
<h3 id="_3-2-2-常用命令" tabindex="-1"><a class="header-anchor" href="#_3-2-2-常用命令" aria-hidden="true">#</a> 3.2.2 常用命令</h3>
<p>添加键值对：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">set</span>  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940769.jpg" alt="img" loading="lazy"></p>
<ul>
<li>
<p>NX：当数据库中key不存在时，可以将key-value添加数据库</p>
</li>
<li>
<p>XX：当数据库中key存在时，可以将key-value添加数据库，与NX参数互斥</p>
</li>
<li>
<p>EX：key的超时秒数</p>
</li>
<li>
<p>PX：key的超时毫秒数，与EX互斥</p>
</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>get  <span class="token operator">&lt;</span>key<span class="token operator">></span>查询对应键值
append  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>将给定的<span class="token operator">&lt;</span>value<span class="token operator">></span> 追加到原值的末尾
strlen  <span class="token operator">&lt;</span>key<span class="token operator">></span>获得值的长度
setnx  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>只有在 key 不存在时   设置 key 的值
incr  <span class="token operator">&lt;</span>key<span class="token operator">></span> 将 key 中储存的数字值增1，只能对数字值操作，如果为空，新增值为1
decr  <span class="token operator">&lt;</span>key<span class="token operator">></span>将 key 中储存的数字值减1，只能对数字值操作，如果为空，新增值为-1
incrby / decrby  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>步长<span class="token operator">></span>将 key 中储存的数字值增减。自定义步长。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原子性：
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940062.png" alt="img" loading="lazy">
所谓原子操作是指不会被线程调度机制打断的操作；这种操作一旦开始，就一直运行到结束，中间不会有任何 context switch （切换到另一个线程）。
（1）在单线程中， 能够在单条指令中完成的操作都可以认为是&quot;原子操作&quot;，因为中断只能发生于指令之间。
（2）在多线程中，不能被其它进程（线程）打断的操作就叫原子操作。Redis单命令的原子性主要得益于Redis的单线程。
案例：java中的i++是否是原子操作？不是i=0;两个线程分别对i进行++100次,值是多少？ 2~200i=0i++i=99 i=1 i++i=2i=0  i++ i=1 i++ i=100</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mset  <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>></span>  <span class="token punctuation">..</span><span class="token punctuation">..</span>. 
同时设置一个或多个 key-value对  

mget  <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">3</span>></span> <span class="token punctuation">..</span><span class="token punctuation">..</span>.
同时获取一个或多个 value  

msetnx <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>></span>  <span class="token punctuation">..</span><span class="token punctuation">..</span>. 
同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原子性，有一个失败则都失败</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>getrange  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>起始位置<span class="token operator">></span><span class="token operator">&lt;</span>结束位置<span class="token operator">></span>
获得值的范围，类似java中的substring，***<span class="token punctuation">\</span>*前包，后包<span class="token punctuation">\</span>****

setrange  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>起始位置<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>
用 <span class="token operator">&lt;</span>value<span class="token operator">></span>  覆写<span class="token operator">&lt;</span>key<span class="token operator">></span>所储存的字符串值，从<span class="token operator">&lt;</span>起始位置<span class="token operator">></span>开始<span class="token punctuation">(</span>***<span class="token punctuation">\</span>*索引从0开始<span class="token punctuation">\</span>****<span class="token punctuation">)</span>。

setex  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>过期时间<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>
设置键值的同时，设置过期时间，单位秒。

getset <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>
以新换旧，设置了新值同时获得旧值。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-3-数据结构" tabindex="-1"><a class="header-anchor" href="#_3-2-3-数据结构" aria-hidden="true">#</a> 3.2.3 数据结构</h3>
<p>String的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配.</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940847.jpg" alt="img" loading="lazy"></p>
<p>如图中所示，内部为当前字符串实际分配的空间capacity一般要高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。</p>
<h2 id="_3-3-redis列表-list" tabindex="-1"><a class="header-anchor" href="#_3-3-redis列表-list" aria-hidden="true">#</a> 3.3 Redis列表(List)</h2>
<h3 id="_3-3-1-简介" tabindex="-1"><a class="header-anchor" href="#_3-3-1-简介" aria-hidden="true">#</a> 3.3.1 简介</h3>
<p>单键多值</p>
<p>Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。</p>
<p>它的底层实际是个双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940229.png" alt="img" loading="lazy"></p>
<h3 id="_3-3-2-常用命令" tabindex="-1"><a class="header-anchor" href="#_3-3-2-常用命令" aria-hidden="true">#</a> 3.3.2 常用命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>lpush/rpush  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">3</span>></span> <span class="token punctuation">..</span><span class="token punctuation">..</span> 从左边/右边插入一个或多个值。

lpop/rpop  <span class="token operator">&lt;</span>key<span class="token operator">></span>从左边/右边吐出一个值。值在键在，值光键亡。

rpoplpush  <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>></span>从<span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span>列表右边吐出一个值，插到<span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>></span>列表左边。

lrange <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>start<span class="token operator">></span><span class="token operator">&lt;</span>stop<span class="token operator">></span>按照索引下标获得元素<span class="token punctuation">(</span>从左到右<span class="token punctuation">)</span>

lrange mylist <span class="token number">0</span> <span class="token parameter variable">-1</span>  <span class="token number">0</span>左边第一个，-1右边第一个，（0-1表示获取所有）

lindex <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>index<span class="token operator">></span>按照索引下标获得元素<span class="token punctuation">(</span>从左到右<span class="token punctuation">)</span>

llen <span class="token operator">&lt;</span>key<span class="token operator">></span>获得列表长度 

linsert <span class="token operator">&lt;</span>key<span class="token operator">></span>  before <span class="token operator">&lt;</span>value<span class="token operator">></span><span class="token operator">&lt;</span>newvalue<span class="token operator">></span>在<span class="token operator">&lt;</span>value<span class="token operator">></span>的后面插入<span class="token operator">&lt;</span>newvalue<span class="token operator">></span>插入值

lrem <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>n<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>从左边删除n个value<span class="token punctuation">(</span>从左到右<span class="token punctuation">)</span>

lset<span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>index<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>将列表key下标为index的值替换成value

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-3-数据结构" tabindex="-1"><a class="header-anchor" href="#_3-3-3-数据结构" aria-hidden="true">#</a> 3.3.3 数据结构</h3>
<p>List的数据结构为快速链表quickList。</p>
<p>首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是ziplist，也即是压缩列表。</p>
<p>它将所有的元素紧挨着一起存储，分配的是一块连续的内存。</p>
<p>当数据量比较多的时候才会改成quicklist。</p>
<p>因为普通的链表需要的附加指针空间太大，会比较浪费空间。比如这个列表里存的只是int类型的数据，结构上还需要两个额外的指针prev和next。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940965.jpg" alt="img" loading="lazy"></p>
<p>Redis将链表和ziplist结合起来组成了quicklist。也就是将多个ziplist使用双向指针串起来使用。这样既满足了快速的插入删除性能，又不会出现太大的空间冗余。</p>
<h2 id="_3-4-redis集合-set" tabindex="-1"><a class="header-anchor" href="#_3-4-redis集合-set" aria-hidden="true">#</a> 3.4 Redis集合(Set)</h2>
<h3 id="_3-4-1-简介" tabindex="-1"><a class="header-anchor" href="#_3-4-1-简介" aria-hidden="true">#</a> 3.4.1 简介</h3>
<p>Redis set对外提供的功能与list类似是一个列表的功能，特殊之处在于set是可以自动排重的，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list所不能提供的。</p>
<p>Redis的Set是string类型的无序集合。它底层其实是一个value为null的hash表，所以添加，删除，查找的复杂度都是O(1)。</p>
<p>一个算法，随着数据的增加，执行时间的长短，如果是O(1)，数据增加，查找数据的时间不变</p>
<h3 id="_3-4-2-常用命令" tabindex="-1"><a class="header-anchor" href="#_3-4-2-常用命令" aria-hidden="true">#</a> 3.4.2 常用命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sadd <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>></span> <span class="token punctuation">..</span><span class="token punctuation">..</span>. 
将一个或多个 member 元素加入到集合 key 中，已经存在的 member 元素将被忽略

smembers <span class="token operator">&lt;</span>key<span class="token operator">></span>取出该集合的所有值。

sismember <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>判断集合<span class="token operator">&lt;</span>key<span class="token operator">></span>是否为含有该<span class="token operator">&lt;</span>value<span class="token operator">></span>值，有1，没有0

scard<span class="token operator">&lt;</span>key<span class="token operator">></span>返回该集合的元素个数。

srem <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>></span> <span class="token punctuation">..</span><span class="token punctuation">..</span> 删除集合中的某个元素。

spop <span class="token operator">&lt;</span>key<span class="token operator">></span>***<span class="token punctuation">\</span>*随机从该集合中吐出一个值。

srandmember <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>n<span class="token operator">></span>随机从该集合中取出n个值。不会从集合中删除 。

smove <span class="token operator">&lt;</span>source<span class="token operator">></span><span class="token operator">&lt;</span>destination<span class="token operator">></span>value把集合中一个值从一个集合移动到另一个集合

sinter <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>></span>返回两个集合的交集元素。

sunion <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>></span>返回两个集合的并集元素。

<span class="token function">sdiff</span> <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">2</span>></span>返回两个集合的差集元素<span class="token punctuation">(</span>key1中的，不包含key2中的<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-3-数据结构" tabindex="-1"><a class="header-anchor" href="#_3-4-3-数据结构" aria-hidden="true">#</a> 3.4.3 数据结构</h3>
<p>Set数据结构是dict字典，字典是用哈希表实现的。</p>
<p>Java中HashSet的内部实现使用的是HashMap，只不过所有的value都指向同一个对象。Redis的set结构也是一样，它的内部也使用hash结构，所有的value都指向同一个内部值。</p>
<h2 id="_3-5-redis哈希-hash" tabindex="-1"><a class="header-anchor" href="#_3-5-redis哈希-hash" aria-hidden="true">#</a> 3.5 Redis哈希(Hash)</h2>
<h3 id="_3-5-1-简介" tabindex="-1"><a class="header-anchor" href="#_3-5-1-简介" aria-hidden="true">#</a> 3.5.1 简介</h3>
<p>Redis hash 是一个键值对集合。</p>
<p>Redis hash是一个string类型的field和value的映射表，hash特别适合用于存储对象。</p>
<p>类似Java里面的Map&lt;String,Object&gt;</p>
<p>用户ID为查找的key，存储的value用户对象包含姓名，年龄，生日等信息，如果用普通的key/value结构来存储</p>
<p>主要有以下2种存储方式：</p>
<table>
<thead>
<tr>
<th><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940556.png" alt="img" loading="lazy"> 每次修改用户的某个属性需要，先反序列化改好后再序列化回去。开销较大。</th>
<th><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940938.png" alt="img" loading="lazy"> 用户ID数据冗余</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940496.png" alt="img" loading="lazy">通过key(用户ID) + field(属性标签)就可以操作对应属性数据了，既不需要重复存储数据，也不会带来序列化和并发修改控制的问题</p>
<h3 id="_3-5-2-常用命令" tabindex="-1"><a class="header-anchor" href="#_3-5-2-常用命令" aria-hidden="true">#</a> 3.5.2 常用命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>hset <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>field<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>给<span class="token operator">&lt;</span>key<span class="token operator">></span>集合中的  <span class="token operator">&lt;</span>field<span class="token operator">></span>键赋值<span class="token operator">&lt;</span>value<span class="token operator">></span>

hget <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>field<span class="token operator">></span>从<span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span>集合<span class="token operator">&lt;</span>field<span class="token operator">></span>取出 value 

hmset <span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>field<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>field<span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token punctuation">..</span>. 批量设置hash的值

hexists<span class="token operator">&lt;</span>key<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>field<span class="token operator">></span>查看哈希表 key 中，给定域 field 是否存在。 

hkeys <span class="token operator">&lt;</span>key<span class="token operator">></span>列出该hash集合的所有field

hvals <span class="token operator">&lt;</span>key<span class="token operator">></span>列出该hash集合的所有value

hincrby <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>field<span class="token operator">></span><span class="token operator">&lt;</span>increment<span class="token operator">></span>为哈希表 key 中的域 field 的值加上增量 <span class="token number">1</span>  <span class="token parameter variable">-1</span>

hsetnx <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>field<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在 <span class="token builtin class-name">.</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-3-数据结构" tabindex="-1"><a class="header-anchor" href="#_3-5-3-数据结构" aria-hidden="true">#</a> 3.5.3 数据结构</h3>
<p>Hash类型对应的数据结构是两种：ziplist（压缩列表），hashtable（哈希表）。当field-value长度较短且个数较少时，使用ziplist，否则使用hashtable。</p>
<h2 id="_3-6-redis有序集合zset-sorted-set" tabindex="-1"><a class="header-anchor" href="#_3-6-redis有序集合zset-sorted-set" aria-hidden="true">#</a> 3.6 Redis有序集合Zset(sorted set)</h2>
<h3 id="_3-6-1-简介" tabindex="-1"><a class="header-anchor" href="#_3-6-1-简介" aria-hidden="true">#</a> 3.6.1 简介</h3>
<p>Redis有序集合zset与普通集合set非常相似，是一个没有重复元素的字符串集合。</p>
<p>不同之处是有序集合的每个成员都关联了一个评分（score）,这个评分（score）被用来按照从最低分到最高分的方式排序集合中的成员。集合的成员是唯一的，但是评分可以是重复了 。</p>
<p>因为元素是有序的, 所以你也可以很快的根据评分（score）或者次序（position）来获取一个范围的元素。</p>
<p>访问有序集合的中间元素也是非常快的,因此你能够使用有序集合作为一个没有重复成员的智能列表。</p>
<h3 id="_3-6-2-常用命令" tabindex="-1"><a class="header-anchor" href="#_3-6-2-常用命令" aria-hidden="true">#</a> 3.6.2 常用命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>zadd  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>score<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token operator">&lt;</span>score<span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token operator">&lt;</span>value<span class="token operator"><span class="token file-descriptor important">2</span>></span>…
将一个或多个 member 元素及其 score 值加入到有序集 key 当中。

zrange <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>start<span class="token operator">></span><span class="token operator">&lt;</span>stop<span class="token operator">></span>  <span class="token punctuation">[</span>WITHSCORES<span class="token punctuation">]</span> 
返回有序集 key 中，下标在<span class="token operator">&lt;</span>start<span class="token operator">></span><span class="token operator">&lt;</span>stop<span class="token operator">></span>之间的元素

带WITHSCORES，可以让分数一起和值返回到结果集。
zrangebyscore key minmax <span class="token punctuation">[</span>withscores<span class="token punctuation">]</span> <span class="token punctuation">[</span>limit offset count<span class="token punctuation">]</span>

返回有序集 key 中，所有 score 值介于 min 和 max 之间<span class="token punctuation">(</span>包括等于 min 或 max <span class="token punctuation">)</span>的成员。有序集成员按 score 值递增<span class="token punctuation">(</span>从小到大<span class="token punctuation">)</span>次序排列。 

zrevrangebyscore key maxmin <span class="token punctuation">[</span>withscores<span class="token punctuation">]</span> <span class="token punctuation">[</span>limit offset count<span class="token punctuation">]</span>        
同上，改为从大到小排列。 

zincrby <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>increment<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>    为元素的score加上增量

zrem  <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>删除该集合下，指定值的元素 

zcount <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>min<span class="token operator">></span><span class="token operator">&lt;</span>max<span class="token operator">></span>统计该集合，分数区间内的元素个数 

zrank <span class="token operator">&lt;</span>key<span class="token operator">></span><span class="token operator">&lt;</span>value<span class="token operator">></span>返回该值在集合中的排名，从0开始。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>案例：如何利用zset实现一个文章访问量的排行榜？</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940201.png" alt="img" loading="lazy"></p>
<h3 id="_3-6-3-数据结构" tabindex="-1"><a class="header-anchor" href="#_3-6-3-数据结构" aria-hidden="true">#</a> 3.6.3 数据结构</h3>
<p>SortedSet(zset)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构Map&lt;String, Double&gt;，可以给每一个元素value赋予一个权重score，另一方面它又类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名次，还可以通过score的范围来获取元素的列表。</p>
<p>zset底层使用了两个数据结构</p>
<p>（1）hash，hash的作用就是关联元素value和权重score，保障元素value的唯一性，可以通过元素value找到相应的score值。</p>
<p>（2）跳跃表，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。</p>
<h3 id="_3-6-4-跳跃表-跳表" tabindex="-1"><a class="header-anchor" href="#_3-6-4-跳跃表-跳表" aria-hidden="true">#</a> 3.6.4 跳跃表（跳表）</h3>
<p>1、简介</p>
<p>​	有序集合在生活中比较常见，例如根据成绩对学生排名，根据得分对玩家排名等。对于有序集合的底层实现，可以用数组、平衡树、链表等。数组不便元素的插入、删除；平衡树或红黑树虽然效率高但结构复杂；链表查询需要遍历所有效率低。Redis采用的是跳跃表。跳跃表效率堪比红黑树，实现远比红黑树简单。</p>
<p>2、实例</p>
<p>​	对比有序链表和跳跃表，从链表中查询出51</p>
<p>（1） 有序链表</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940538.jpg" alt="img" loading="lazy"></p>
<p>要查找值为51的元素，需要从第一个元素开始依次查找、比较才能找到。共需要6次比较。</p>
<p>（2） 跳跃表</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210191940170.jpg" alt="img" loading="lazy"></p>
<p>从第2层开始，1节点比51节点小，向后比较。</p>
<p>21节点比51节点小，继续向后比较，后面就是NULL了，所以从21节点向下到第1层</p>
<p>在第1层，41节点比51节点小，继续向后，61节点比51节点大，所以从41向下</p>
<p>在第0层，51节点为要查找的节点，节点被找到，共查找4次。</p>
<p>从此可以看出跳跃表比有序链表效率要高</p>
</div></template>


