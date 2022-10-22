<template><div><h1 id="_16-redis应用问题解决" tabindex="-1"><a class="header-anchor" href="#_16-redis应用问题解决" aria-hidden="true">#</a> 16.Redis应用问题解决</h1>
<h2 id="_16-1-缓存穿透" tabindex="-1"><a class="header-anchor" href="#_16-1-缓存穿透" aria-hidden="true">#</a> 16.1 缓存穿透</h2>
<h3 id="_16-1-1-问题描述" tabindex="-1"><a class="header-anchor" href="#_16-1-1-问题描述" aria-hidden="true">#</a> 16.1.1 问题描述</h3>
<p>key对应的数据在数据源并不存在，每次针对此key的请求从缓存获取不到，请求都会压到数据源，从而可能压垮数据源。比如用一个不存在的用户id获取用户信息，不论缓存还是数据库都没有，若黑客利用此漏洞进行攻击可能压垮数据库。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637558.jpg" alt="img" loading="lazy"></p>
<h3 id="_16-1-2-解决方案" tabindex="-1"><a class="header-anchor" href="#_16-1-2-解决方案" aria-hidden="true">#</a> 16.1.2 解决方案</h3>
<p>一个一定不存在缓存及查询不到的数据，由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。</p>
<p>解决方案：</p>
<p>（1） 对空值缓存：如果一个查询返回的数据为空（不管是数据是否不存在），我们仍然把这个空结果（null）进行缓存，设置空结果的过期时间会很短，最长不超过五分钟</p>
<p>（2） 设置可访问的名单（白名单）：</p>
<p>使用bitmaps类型定义一个可以访问的名单，名单id作为bitmaps的偏移量，每次访问和bitmap里面的id进行比较，如果访问id不在bitmaps里面，进行拦截，不允许访问。</p>
<p>（3） 采用布隆过滤器：(布隆过滤器（Bloom Filter）是1970年由布隆提出的。它实际上是一个很长的二进制向量(位图)和一系列随机映射函数（哈希函数）。</p>
<p>布隆过滤器可以用于检索一个元素是否在一个集合中。它的优点是空间效率和查询时间都远远超过一般的算法，缺点是有一定的误识别率和删除困难。)</p>
<p>将所有可能存在的数据哈希到一个足够大的bitmaps中，一个一定不存在的数据会被 这个bitmaps拦截掉，从而避免了对底层存储系统的查询压力。</p>
<p>（4） 进行实时监控：当发现Redis的命中率开始急速降低，需要排查访问对象和访问的数据，和运维人员配合，可以设置黑名单限制服务</p>
<h2 id="_16-2-缓存击穿" tabindex="-1"><a class="header-anchor" href="#_16-2-缓存击穿" aria-hidden="true">#</a> 16.2 缓存击穿</h2>
<h3 id="_16-2-1-问题描述" tabindex="-1"><a class="header-anchor" href="#_16-2-1-问题描述" aria-hidden="true">#</a> 16.2.1 问题描述</h3>
<p>key对应的数据存在，但在redis中过期，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端DB压垮。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637752.jpg" alt="img" loading="lazy"></p>
<h3 id="_16-2-2-解决方案" tabindex="-1"><a class="header-anchor" href="#_16-2-2-解决方案" aria-hidden="true">#</a> 16.2.2 解决方案</h3>
<p>key可能会在某些时间点被超高并发地访问，是一种非常“热点”的数据。这个时候，需要考虑一个问题：缓存被“击穿”的问题。</p>
<p>解决问题：</p>
<p>（1）预先设置热门数据：在redis高峰访问之前，把一些热门数据提前存入到redis里面，加大这些热门数据key的时长</p>
<p>（2）实时调整：现场监控哪些数据热门，实时调整key的过期时长</p>
<p>（3）使用锁：</p>
<pre><code>（1） 就是在缓存失效的时候（判断拿出来的值为空），不是立即去load db。

（2） 先使用缓存工具的某些带成功操作返回值的操作（比如Redis的SETNX）去set一个mutex key

（3） 当操作返回成功时，再进行load db的操作，并回设缓存,最后删除mutex key；

（4） 当操作返回失败，证明有线程在load db，当前线程睡眠一段时间再重试整个get缓存的方法。
</code></pre>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637638.jpg" alt="img" loading="lazy"></p>
<h2 id="_16-3-缓存雪崩" tabindex="-1"><a class="header-anchor" href="#_16-3-缓存雪崩" aria-hidden="true">#</a> 16.3 缓存雪崩</h2>
<h3 id="_16-3-1-问题描述" tabindex="-1"><a class="header-anchor" href="#_16-3-1-问题描述" aria-hidden="true">#</a> 16.3.1 问题描述</h3>
<p>key对应的数据存在，但在redis中过期，此时若有大量并发请求过来，这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存，这个时候大并发的请求可能会瞬间把后端DB压垮。</p>
<p>缓存雪崩与缓存击穿的区别在于这里针对很多key缓存，前者则是某一个key</p>
<p>正常访问</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637913.jpg" alt="img" loading="lazy"></p>
<p>缓存失效瞬间</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637833.jpg" alt="img" loading="lazy"></p>
<h3 id="_16-3-2-解决方案" tabindex="-1"><a class="header-anchor" href="#_16-3-2-解决方案" aria-hidden="true">#</a> 16.3.2 解决方案</h3>
<p>缓存失效时的雪崩效应对底层系统的冲击非常可怕！</p>
<p>解决方案：</p>
<p>（1） 构建多级缓存架构：nginx缓存 + redis缓存 +其他缓存（ehcache等）</p>
<p>（2） 使用锁或队列：</p>
<p>用加锁或者队列的方式保证来保证不会有大量的线程对数据库一次性进行读写，从而避免失效时大量的并发请求落到底层存储系统上。不适用高并发情况</p>
<p>（3） 设置过期标志更新缓存：</p>
<p>记录缓存数据是否过期（设置提前量），如果过期会触发通知另外的线程在后台去更新实际key的缓存。</p>
<p>（4） 将缓存失效时间分散开：</p>
<p>比如我们可以在原有的失效时间基础上增加一个随机值，比如1-5分钟随机，这样每一个缓存的过期时间的重复率就会降低，就很难引发集体失效的事件。</p>
<h2 id="_16-4-分布式锁" tabindex="-1"><a class="header-anchor" href="#_16-4-分布式锁" aria-hidden="true">#</a> 16.4 分布式锁</h2>
<h3 id="_16-4-1-问题描述" tabindex="-1"><a class="header-anchor" href="#_16-4-1-问题描述" aria-hidden="true">#</a> 16.4.1 问题描述</h3>
<p>随着业务发展的需要，原单体单机部署的系统被演化成分布式集群系统后，由于分布式系统多线程、多进程并且分布在不同机器上，这将使原单机部署情况下的并发控制锁策略失效，单纯的Java API并不能提供分布式锁的能力。为了解决这个问题就需要一种跨JVM的互斥机制来控制共享资源的访问，这就是分布式锁要解决的问题！</p>
<p>分布式锁主流的实现方案：</p>
<ol>
<li>
<p>基于数据库实现分布式锁</p>
</li>
<li>
<p>基于缓存（Redis等）</p>
</li>
<li>
<p>基于Zookeeper</p>
</li>
</ol>
<p>每一种分布式锁解决方案都有各自的优缺点：</p>
<ol>
<li>
<p>性能：redis最高</p>
</li>
<li>
<p>可靠性：zookeeper最高</p>
</li>
</ol>
<p>这里，我们就基于redis实现分布式锁。</p>
<h3 id="_16-4-2-解决方案-使用redis实现分布式锁" tabindex="-1"><a class="header-anchor" href="#_16-4-2-解决方案-使用redis实现分布式锁" aria-hidden="true">#</a> 16.4.2 解决方案：使用redis实现分布式锁</h3>
<p>redis:命令</p>
<p><code v-pre># set sku:1:info “OK” NX PX 10000</code></p>
<p>EX second ：设置键的过期时间为 second 秒。 SET key value EX second 效果等同于 SETEX key second value 。</p>
<p>PX millisecond ：设置键的过期时间为 millisecond 毫秒。 SET key value PX millisecond 效果等同于 PSETEX key millisecond value 。</p>
<p>NX ：只在键不存在时，才对键进行设置操作。 SET key value NX 效果等同于 SETNX key value 。</p>
<p>XX ：只在键已经存在时，才对键进行设置操作。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637269.jpg" alt="img" loading="lazy"></p>
<ol>
<li>
<p>多个客户端同时获取锁（setnx）</p>
</li>
<li>
<p>获取成功，执行业务逻辑{从db获取数据，放入缓存}，执行完成释放锁（del）</p>
</li>
<li>
<p>其他客户端等待重试</p>
</li>
</ol>
<h3 id="_16-4-3-编写代码" tabindex="-1"><a class="header-anchor" href="#_16-4-3-编写代码" aria-hidden="true">#</a> 16.4.3 编写代码</h3>
<p>Redis: set num 0</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span> <span class="token string">"testLock"</span> <span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span>  <span class="token function">testLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//1获取锁，setne</span>
        <span class="token class-name">Boolean</span> lock <span class="token operator">=</span>  redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span> <span class="token string">"lock"</span> <span class="token punctuation">,</span>  <span class="token string">"111"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//2获取锁成功、查询num的值</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">Object</span> value <span class="token operator">=</span>  redisTemplate <span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span> <span class="token string">"num"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//2.1判断num为空return</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//2.2有值就转成成int</span>
            <span class="token keyword">int</span>  num <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>value<span class="token operator">+</span> <span class="token string">""</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//2.3把redis的num加1</span>
            redisTemplate <span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span> <span class="token string">"num"</span> <span class="token punctuation">,</span> <span class="token operator">++</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//2.4释放锁，del</span>
            redisTemplate <span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span> <span class="token string">"lock"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">//3获取锁失败、每隔0.1秒再获取</span>
            <span class="token keyword">try</span>  <span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">testLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>  <span class="token keyword">catch</span>  <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启，服务集群，通过网关压力测试：</p>
<p>ab -n 1000 -c 100 <a href="http://192.168.140.1:8080/test/testLock" target="_blank" rel="noopener noreferrer">http://192.168.140.1:8080/test/testLock<ExternalLinkIcon/></a></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637674.jpg" alt="img" loading="lazy"></p>
<p>查看redis中num的值：</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637929.jpg" alt="img" loading="lazy"></p>
<p>基本实现。</p>
<p>问题：setnx刚好获取到锁，业务逻辑出现异常，导致锁无法释放</p>
<p>解决：设置过期时间，自动释放锁。</p>
<h3 id="_16-4-4-优化之设置锁的过期时间" tabindex="-1"><a class="header-anchor" href="#_16-4-4-优化之设置锁的过期时间" aria-hidden="true">#</a> 16.4.4 优化之设置锁的过期时间</h3>
<p>设置过期时间有两种方式：</p>
<ol>
<li>
<p>首先想到通过expire设置过期时间（缺乏原子性：如果在setnx和expire之间出现异常，锁也无法释放）</p>
</li>
<li>
<p>在set时指定过期时间（推荐）</p>
</li>
</ol>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221709813.png" alt="image-20221022170900718" loading="lazy"></p>
<p>设置过期时间：</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637709.jpg" alt="img" loading="lazy"></p>
<p>压力测试肯定也没有问题。自行测试</p>
<p>问题：可能会释放其他服务器的锁。</p>
<p>场景：如果业务逻辑的执行时间是7s。执行流程如下</p>
<ol>
<li>
<p>index1业务逻辑没执行完，3秒后锁被自动释放。</p>
</li>
<li>
<p>index2获取到锁，执行业务逻辑，3秒后锁被自动释放。</p>
</li>
<li>
<p>index3获取到锁，执行业务逻辑</p>
</li>
<li>
<p>index1业务逻辑执行完成，开始调用del释放锁，这时释放的是index3的锁，导致index3的业务只执行1s就被别人释放。</p>
</li>
</ol>
<p>最终等于没锁的情况。</p>
<p>解决：setnx获取锁时，设置一个指定的唯一值（例如：uuid）；释放前获取这个值，判断是否自己的锁</p>
<h3 id="_16-4-5-优化之uuid防误删" tabindex="-1"><a class="header-anchor" href="#_16-4-5-优化之uuid防误删" aria-hidden="true">#</a> 16.4.5 优化之UUID防误删</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637950.jpg" alt="img" loading="lazy"></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637235.jpg" alt="img" loading="lazy"></p>
<p>问题：删除操作缺乏原子性。</p>
<p>场景：</p>
<ol>
<li>index1执行删除时，查询到的lock值确实和uuid相等</li>
</ol>
<p>uuid=v1</p>
<p>set(lock,uuid)；</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637560.jpg" alt="img" loading="lazy"></p>
<ol start="2">
<li>index1执行删除前，lock刚好过期时间已到，被redis自动释放</li>
</ol>
<p>在redis中没有了lock，没有了锁。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637713.jpg" alt="img" loading="lazy"></p>
<ol start="3">
<li>index2获取了lock</li>
</ol>
<p>index2线程获取到了cpu的资源，开始执行方法</p>
<p>uuid=v2</p>
<p>set(lock,uuid)；</p>
<ol start="4">
<li>index1执行删除，此时会把index2的lock删除</li>
</ol>
<p>index1 因为已经在方法中了，所以不需要重新上锁。index1有执行的权限。index1已经比较完成了，这个时候，开始执行</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637991.jpg" alt="img" loading="lazy"></p>
<p>删除的index2的锁！</p>
<h3 id="_16-4-6-优化之lua脚本保证删除的原子性" tabindex="-1"><a class="header-anchor" href="#_16-4-6-优化之lua脚本保证删除的原子性" aria-hidden="true">#</a> 16.4.6 优化之LUA脚本保证删除的原子性</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span> <span class="token string">"testLockLua"</span> <span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span>  <span class="token function">testLockLua</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//1 声明一个uuid ,将做为一个value 放入我们的key所对应的值中</span>
    <span class="token class-name">String</span> uuid <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//2 定义一个锁：lua 脚本可以使用同一把锁，来实现删除！</span>
    <span class="token class-name">String</span> skuId <span class="token operator">=</span>  <span class="token string">"25"</span> <span class="token punctuation">;</span> <span class="token comment">// 访问skuId 为25号的商品 100008348542</span>
    <span class="token class-name">String</span> locKey <span class="token operator">=</span>  <span class="token string">"lock:"</span>  <span class="token operator">+</span> skuId<span class="token punctuation">;</span> <span class="token comment">// 锁住的是每个商品的数据</span>
    <span class="token comment">// 3 获取锁</span>
    <span class="token class-name">Boolean</span> lock <span class="token operator">=</span>  redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span>locKey<span class="token punctuation">,</span> uuid<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span> <span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 第一种： lock 与过期时间中间不写任何的代码。</span>
    <span class="token comment">// redisTemplate.expire("lock",10, TimeUnit.SECONDS);//设置过期时间</span>
    <span class="token comment">// 如果true</span>
    <span class="token keyword">if</span>  <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行的业务逻辑开始   </span>
        <span class="token comment">// 获取缓存中的num 数据</span>
        <span class="token class-name">Object</span> value <span class="token operator">=</span>  redisTemplate <span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span> <span class="token string">"num"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 如果是空直接返回</span>
        <span class="token keyword">if</span>  <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>  
        <span class="token comment">// 不是空 如果说在这出现了异常！ 那么delete 就删除失败！ 也就是说锁永远存在！</span>
        <span class="token keyword">int</span>  num <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>value <span class="token operator">+</span>  <span class="token string">""</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 使num 每次+1 放入缓存</span>
        redisTemplate <span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span> <span class="token string">"num"</span> <span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token operator">++</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/*使用lua脚本来锁*/</span>
        <span class="token comment">// 定义lua 脚本</span>
        <span class="token class-name">String</span> script <span class="token operator">=</span>  <span class="token string">"if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end"</span> <span class="token punctuation">;</span>
        <span class="token comment">// 使用redis执行lua执行</span>
        <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> redisScript <span class="token operator">=</span>  <span class="token keyword">new</span>  <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisScript<span class="token punctuation">.</span><span class="token function">setScriptText</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token comment">// 设置一下返回值类型 为Long   </span>
        <span class="token comment">// 因为删除判断的时候，返回的0,给其封装为数据类型。如果不封装那么默认返回String 类型，</span>
        <span class="token comment">// 那么返回字符串与0 会有发生错误。</span>
        redisScript<span class="token punctuation">.</span><span class="token function">setResultType</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span> <span class="token keyword">class</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>    
        <span class="token comment">// 第一个要是script 脚本 ，第二个需要判断的key，第三个就是key所对应的值。</span>
        redisTemplate <span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>redisScript<span class="token punctuation">,</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>locKey<span class="token punctuation">)</span><span class="token punctuation">,</span> uuid<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>  <span class="token keyword">else</span>  <span class="token punctuation">{</span>     
        <span class="token comment">// 其他线程等待</span>
            <span class="token keyword">try</span>  <span class="token punctuation">{</span>       
                <span class="token comment">// 睡眠</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span>*<span class="token operator">*</span>sleep<span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 睡醒了之后，调用方法。</span>
                <span class="token function">testLockLua</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>  <span class="token keyword">catch</span>  <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
        


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lua 脚本详解：</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637193.jpg" alt="img" loading="lazy"></p>
<p>项目中正确使用：</p>
<ol>
<li>定义key，key应该是为每个sku定义的，也就是每个sku有一把锁。</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code> <span class="token class-name">String</span> locKey <span class="token operator">=</span><span class="token string">"lock:"</span><span class="token operator">+</span>skuId<span class="token punctuation">;</span> 
<span class="token comment">//锁住的是每个商品的数据</span>
<span class="token class-name">Boolean</span> lock <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span>locKey<span class="token punctuation">,</span> uuid<span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221637594.jpg" alt="img" loading="lazy"></p>
<p>总结</p>
<p>1、加锁</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 1.从redis中获取锁,set k1 v1 px 20000 nx </span>
<span class="token class-name">String</span> uuid <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Boolean</span> lock <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span><span class="token string">"lock"</span><span class="token punctuation">,</span> uuid<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、使用lua释放锁</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 2.释放锁 del</span>
<span class="token class-name">String</span> script <span class="token operator">=</span> <span class="token string">"if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end"</span><span class="token punctuation">;</span>
<span class="token comment">//设置lua脚本返回的数据类型 </span>
<span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> redisScript <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//设置lua脚本返回类型为Long</span>
redisScript<span class="token punctuation">.</span><span class="token function">setResultType</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
redisScript<span class="token punctuation">.</span><span class="token function">setScriptText</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>
redisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>redisScript<span class="token punctuation">,</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">"lock"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>uuid<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、重试</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">testLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了确保分布式锁可用，我们至少要确保锁的实现同时满足以下四个条件：</p>
<ul>
<li>
<p>互斥性。在任意时刻，只有一个客户端能持有锁。</p>
</li>
<li>
<p>不会发生死锁。即使有一个客户端在持有锁的期间崩溃而没有主动解锁，也能保证后续其他客户端能加锁。</p>
</li>
<li>
<p>解铃还须系铃人。加锁和解锁必须是同一个客户端，客户端自己不能把别人加的锁给解了。</p>
</li>
<li>
<p>加锁和解锁必须具有原子性。</p>
</li>
</ul>
</div></template>


