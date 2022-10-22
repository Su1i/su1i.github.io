<template><div><h1 id="_15-redis集群" tabindex="-1"><a class="header-anchor" href="#_15-redis集群" aria-hidden="true">#</a> 15.Redis集群</h1>
<h2 id="_15-1-问题" tabindex="-1"><a class="header-anchor" href="#_15-1-问题" aria-hidden="true">#</a> 15.1 问题</h2>
<p>容量不够，redis如何进行扩容？</p>
<p>并发写操作， redis如何分摊？</p>
<p>另外，主从模式，薪火相传模式，主机宕机，导致ip地址发生变化，应用程序中配置需要修改对应的主机地址、端口等信息。</p>
<p>之前通过代理主机来解决，但是redis3.0中提供了解决方案。就是无中心化集群配置。</p>
<h2 id="_15-2-什么是集群" tabindex="-1"><a class="header-anchor" href="#_15-2-什么是集群" aria-hidden="true">#</a> 15.2 什么是集群</h2>
<p>Redis 集群实现了对Redis的水平扩容，即启动N个redis节点，将整个数据库分布存储在这N个节点中，每个节点存储总数据的1/N。</p>
<p>Redis 集群通过分区（partition）来提供一定程度的可用性（availability）： 即使集群中有一部分节点失效或者无法进行通讯， 集群也可以继续处理命令请求。</p>
<h2 id="_15-3-删除持久化数据" tabindex="-1"><a class="header-anchor" href="#_15-3-删除持久化数据" aria-hidden="true">#</a> 15.3 删除持久化数据</h2>
<p>将rdb,aof文件都删除掉。</p>
<h2 id="_15-4-制作-6-个实例-6379-6380-6381-6389-6390-6391" tabindex="-1"><a class="header-anchor" href="#_15-4-制作-6-个实例-6379-6380-6381-6389-6390-6391" aria-hidden="true">#</a> 15.4 制作  6  个实例，  6379,6380,6381,6389,6390,6391</h2>
<h3 id="_15-4-1-配置基本信息" tabindex="-1"><a class="header-anchor" href="#_15-4-1-配置基本信息" aria-hidden="true">#</a> 15.4.1 配置基本信息</h3>
<p>开启daemonize yes</p>
<p>Pid文件名字</p>
<p>指定端口</p>
<p>Log文件名字</p>
<p>Dump.rdb名字</p>
<p>Appendonly 关掉或者换名字</p>
<h3 id="_15-4-2-redis-cluster配置修改" tabindex="-1"><a class="header-anchor" href="#_15-4-2-redis-cluster配置修改" aria-hidden="true">#</a> 15.4.2 redis cluster配置修改</h3>
<p>cluster-enabled yes  打开集群模式</p>
<p>cluster-config-file nodes-6379.conf 设定节点配置文件名</p>
<p>cluster-node-timeout 15000  设定节点失联时间，超过该时间（毫秒），集群自动进行主从切换。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>include /home/bigdata/redis.conf
port <span class="token number">6379</span>
pidfile <span class="token string">"/var/run/redis_6379.pid"</span>
dbfilename <span class="token string">"dump6379.rdb"</span>
<span class="token function">dir</span> <span class="token string">"/home/bigdata/redis_cluster"</span>
logfile <span class="token string">"/home/bigdata/redis_cluster/redis_err_6379.log"</span>
cluster-enabled <span class="token function">yes</span>
cluster-config-file nodes-6379.conf
cluster-node-timeout <span class="token number">15000</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_15-4-3-修改好redis6379-conf-文件-拷贝多个redis-conf文件" tabindex="-1"><a class="header-anchor" href="#_15-4-3-修改好redis6379-conf-文件-拷贝多个redis-conf文件" aria-hidden="true">#</a> 15.4.3 修改好redis6379  .conf  文件  ，拷贝多个redis.conf文件</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621613.png" alt="img" loading="lazy"></p>
<h3 id="_15-4-4-使用查找替换修改另外-5-个文件" tabindex="-1"><a class="header-anchor" href="#_15-4-4-使用查找替换修改另外-5-个文件" aria-hidden="true">#</a> 15.4.4 使用查找替换修改另外  5  个文件</h3>
<p>例如：:%s/6379/6380</p>
<h3 id="_15-4-5-启动-6个-redis-服务" tabindex="-1"><a class="header-anchor" href="#_15-4-5-启动-6个-redis-服务" aria-hidden="true">#</a> 15.4.5 启动  6个  redis  服务</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621021.png" alt="img" loading="lazy"></p>
<h2 id="_15-5-将六个节点合成一个集群" tabindex="-1"><a class="header-anchor" href="#_15-5-将六个节点合成一个集群" aria-hidden="true">#</a> 15.5 将六个节点合成一个集群</h2>
<p>组合之前，请确保所有redis实例启动后，nodes-xxxx.conf文件都生成正常。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621175.png" alt="img" loading="lazy"></p>
<ul>
<li>合体：</li>
</ul>
<p>cd  /opt/redis-6.2.1/src</p>
<p>redis-cli --cluster create --cluster-replicas 1 192.168.11.101:6379 192.168.11.101:6380 192.168.11.101:6381 192.168.11.101:6389 192.168.11.101:6390 192.168.11.101:6391</p>
<p>此处不要用127.0.0.1， 请用真实IP地址</p>
<p>--replicas 1 采用最简单的方式配置集群，一台主机，一台从机，正好三组。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621840.png" alt="img" loading="lazy"></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621344.png" alt="img" loading="lazy"></p>
<ul>
<li>普通方式登录</li>
</ul>
<p>可能直接进入读主机，存储数据时，会出现MOVED重定向操作。所以，应该以集群方式登录。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621726.png" alt="img" loading="lazy"></p>
<h2 id="_15-6-c-采用集群策略连接-设置数据会自动切换到相应的写主机" tabindex="-1"><a class="header-anchor" href="#_15-6-c-采用集群策略连接-设置数据会自动切换到相应的写主机" aria-hidden="true">#</a> 15.6 -c 采用集群策略连接，设置数据会自动切换到相应的写主机</h2>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621143.png" alt="img" loading="lazy"></p>
<h2 id="_15-7-通过-cluster-nodes-命令查看集群信息" tabindex="-1"><a class="header-anchor" href="#_15-7-通过-cluster-nodes-命令查看集群信息" aria-hidden="true">#</a> 15.7 通过 cluster nodes 命令查看集群信息</h2>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621476.png" alt="img" loading="lazy"></p>
<h2 id="_15-8-redis-cluster-如何分配这六个节点" tabindex="-1"><a class="header-anchor" href="#_15-8-redis-cluster-如何分配这六个节点" aria-hidden="true">#</a> 15.8 redis cluster 如何分配这六个节点?</h2>
<p>一个集群至少要有三个主节点。</p>
<p>选项 --cluster-replicas 1 表示我们希望为集群中的每个主节点创建一个从节点。</p>
<p>分配原则尽量保证每个主数据库运行在不同的IP地址，每个从库和主库不在一个IP地址上。</p>
<h2 id="_15-9-什么是-slots" tabindex="-1"><a class="header-anchor" href="#_15-9-什么是-slots" aria-hidden="true">#</a> 15.9 什么是  slots</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>OK<span class="token punctuation">]</span> All nodes agree about slots configuration. 

<span class="token operator">>></span><span class="token operator">></span> Check <span class="token keyword">for</span> <span class="token function">open</span> slots<span class="token punctuation">..</span>. 

<span class="token operator">>></span><span class="token operator">></span> Check slots coverage<span class="token punctuation">..</span>. 

<span class="token punctuation">[</span>OK<span class="token punctuation">]</span> All   <span class="token number">16384</span>   slots covered.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 Redis 集群包含 16384 个插槽（hash slot）， 数据库中的每个键都属于这 16384 个插槽的其中一个，</p>
<p>集群使用公式 CRC16(key) % 16384 来计算键 key 属于哪个槽， 其中 CRC16(key) 语句用于计算键 key 的 CRC16 校验和 。</p>
<p>集群中的每个节点负责处理一部分插槽。 举个例子， 如果一个集群可以有主节点， 其中：</p>
<p>节点 A 负责处理 0 号至 5460 号插槽。</p>
<p>节点 B 负责处理 5461 号至 10922 号插槽。</p>
<p>节点 C 负责处理 10923 号至 16383 号插槽。</p>
<h2 id="_15-10-在集群中录入值" tabindex="-1"><a class="header-anchor" href="#_15-10-在集群中录入值" aria-hidden="true">#</a> 15.10 在集群中录入值</h2>
<p>在redis-cli每次录入、查询键值，redis都会计算出该key应该送往的插槽，如果不是该客户端对应服务器的插槽，redis会报错，并告知应前往的redis实例地址和端口。</p>
<p>redis-cli客户端提供了 –c 参数实现自动重定向。</p>
<p>如 redis-cli  -c –p 6379 登入后，再录入、查询键值对可以自动重定向。</p>
<p>不在一个slot下的键值，是不能使用mget,mset等多键操作。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621721.png" alt="img" loading="lazy"></p>
<p>可以通过{}来定义组的概念，从而使key中{}内相同内容的键值对放到一个slot中去。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621979.png" alt="img" loading="lazy"></p>
<h2 id="_15-11-查询集群中的值" tabindex="-1"><a class="header-anchor" href="#_15-11-查询集群中的值" aria-hidden="true">#</a> 15.11 查询集群中的值</h2>
<p><code v-pre>CLUSTER GETKEYSINSLOT &lt;slot&gt;&lt;count&gt; </code>返回 count 个 slot 槽中的键。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621472.png" alt="img" loading="lazy"></p>
<h2 id="_15-12-故障恢复" tabindex="-1"><a class="header-anchor" href="#_15-12-故障恢复" aria-hidden="true">#</a> 15.12 故障恢复</h2>
<p>如果主节点下线？从节点能否自动升为主节点？注意： 15秒超时</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621755.png" alt="img" loading="lazy"></p>
<p>主节点恢复后，主从关系会如何？主节点回来变成从机。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221621199.png" alt="img" loading="lazy"></p>
<p>如果所有某一段插槽的主从节点都宕掉，redis服务是否还能继续?</p>
<p>如果某一段插槽的主从都挂掉，而cluster-require-full-coverage 为yes ，那么 ，整个集群都挂掉</p>
<p>如果某一段插槽的主从都挂掉，而cluster-require-full-coverage 为no ，那么，该插槽数据全都不能使用，也无法存储。</p>
<p>redis.conf中的参数  cluster-require-full-coverage</p>
<h2 id="_15-13-集群的-jedis-开发" tabindex="-1"><a class="header-anchor" href="#_15-13-集群的-jedis-开发" aria-hidden="true">#</a> 15.13 集群的  Jedis  开发</h2>
<p>即使连接的不是主机，集群会自动切换主机存储。主机写，从机读。</p>
<p>无中心化主从集群。无论从哪台主机写的数据，其他主机上都能读到数据。</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JedisClusterTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HostAndPort</span><span class="token punctuation">></span></span>set <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HostAndPort</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HostAndPort</span><span class="token punctuation">(</span><span class="token string">"192.168.31.211"</span><span class="token punctuation">,</span><span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JedisCluster</span> jedisCluster<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">JedisCluster</span><span class="token punctuation">(</span>set<span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedisCluster<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"k1"</span><span class="token punctuation">,</span> <span class="token string">"v1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedisCluster<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"k1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_15-4-redis集群提供了以下好处" tabindex="-1"><a class="header-anchor" href="#_15-4-redis集群提供了以下好处" aria-hidden="true">#</a> 15.4 Redis集群提供了以下好处</h2>
<p>实现扩容</p>
<p>分摊压力</p>
<p>无中心配置相对简单</p>
<h2 id="_15-15-redis集群的不足" tabindex="-1"><a class="header-anchor" href="#_15-15-redis集群的不足" aria-hidden="true">#</a> 15.15 Redis集群的不足</h2>
<p>多键操作是不被支持的</p>
<p>多键的Redis事务是不被支持的。lua脚本不被支持</p>
<p>由于集群方案出现较晚，很多公司已经采用了其他的集群方案，而代理或者客户端分片的方案想要迁移至redis cluster，需要整体迁移而不是逐步过渡，复杂度较大。</p>
</div></template>


