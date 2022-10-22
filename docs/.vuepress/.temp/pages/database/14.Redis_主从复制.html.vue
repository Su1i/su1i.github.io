<template><div><h1 id="_14-redis-主从复制" tabindex="-1"><a class="header-anchor" href="#_14-redis-主从复制" aria-hidden="true">#</a> 14.Redis_主从复制</h1>
<h2 id="_14-1-是什么" tabindex="-1"><a class="header-anchor" href="#_14-1-是什么" aria-hidden="true">#</a> 14.1 是什么</h2>
<p>主机数据更新后根据配置和策略， 自动同步到备机的master/slaver机制，Master以写为主， Slave 以读为主</p>
<h2 id="_14-2-能干嘛" tabindex="-1"><a class="header-anchor" href="#_14-2-能干嘛" aria-hidden="true">#</a> 14.2 能干嘛</h2>
<ul>
<li>
<p>读写分离，性能扩展</p>
</li>
<li>
<p>容灾快速恢复</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503981.png" alt="img" loading="lazy"></p>
<h2 id="_14-3-怎么玩-主从复制" tabindex="-1"><a class="header-anchor" href="#_14-3-怎么玩-主从复制" aria-hidden="true">#</a> 14.3 怎么玩：主从复制</h2>
<p>拷贝多个redis.conf文件include(写绝对路径)</p>
<p>开启daemonize yes</p>
<p>Pid文件名字pidfile</p>
<p>指定端口port</p>
<p>Log文件名字</p>
<p>dump.rdb名字dbfilename</p>
<p>Appendonly 关掉或者换名字</p>
<h3 id="_14-3-1-新建redis6379-conf-填写以下内容" tabindex="-1"><a class="header-anchor" href="#_14-3-1-新建redis6379-conf-填写以下内容" aria-hidden="true">#</a> 14.3.1 新建redis6379.conf，填写以下内容</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>include /myredis/redis.conf

pidfile /var/run/redis_6379.pid

port <span class="token number">6379</span>

dbfilename dump6379.rdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503905.png" alt="img" loading="lazy"></p>
<h3 id="_14-3-2-新建redis6380-conf-填写以下内容" tabindex="-1"><a class="header-anchor" href="#_14-3-2-新建redis6380-conf-填写以下内容" aria-hidden="true">#</a> 14.3.2 新建redis6380.conf，填写以下内容</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503153.png" alt="img" loading="lazy"></p>
<h3 id="_14-3-3-新建redis6381-conf-填写以下内容" tabindex="-1"><a class="header-anchor" href="#_14-3-3-新建redis6381-conf-填写以下内容" aria-hidden="true">#</a> 14.3.3 新建redis6381.conf，填写以下内容</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503360.png" alt="img" loading="lazy"></p>
<p>slave-priority 10</p>
<p>设置从机的优先级，值越小，优先级越高，用于选举主机时使用。默认100</p>
<h3 id="_14-3-4-启动三台redis服务器" tabindex="-1"><a class="header-anchor" href="#_14-3-4-启动三台redis服务器" aria-hidden="true">#</a> 14.3.4 启动三台redis服务器</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503283.png" alt="img" loading="lazy"></p>
<h3 id="_14-3-5-查看系统进程-看看三台服务器是否启动" tabindex="-1"><a class="header-anchor" href="#_14-3-5-查看系统进程-看看三台服务器是否启动" aria-hidden="true">#</a> 14.3.5 查看系统进程，看看三台服务器是否启动</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503415.png" alt="img" loading="lazy"></p>
<h3 id="_14-3-6-查看三台主机运行情况" tabindex="-1"><a class="header-anchor" href="#_14-3-6-查看三台主机运行情况" aria-hidden="true">#</a> 14.3.6 查看三台主机运行情况</h3>
<p>info replication</p>
<p>打印主从复制的相关信息</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503772.png" alt="img" loading="lazy"></p>
<h3 id="_14-3-7-配从-库-不配主-库" tabindex="-1"><a class="header-anchor" href="#_14-3-7-配从-库-不配主-库" aria-hidden="true">#</a> 14.3.7 配从(库) 不配主(库)</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>slaveof  <span class="token operator">&lt;</span>ip<span class="token operator">></span><span class="token operator">&lt;</span>port<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>成为某个实例的从服务器</p>
<p>1、在6380和6381上执行: slaveof 127.0.0.1 6379</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503006.png" alt="img" loading="lazy"></p>
<p>2、在主机上写，在从机上可以读取数据</p>
<p>在从机上写数据报错</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503509.png" alt="img" loading="lazy"></p>
<p>3、主机挂掉，重启就行，一切如初</p>
<p>4、从机重启需重设：slaveof 127.0.0.1 6379</p>
<p>可以将配置增加到文件中。永久生效。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503723.png" alt="img" loading="lazy"></p>
<h2 id="_14-4-常用3招" tabindex="-1"><a class="header-anchor" href="#_14-4-常用3招" aria-hidden="true">#</a> 14.4 常用3招</h2>
<h3 id="_14-4-1-一主二仆" tabindex="-1"><a class="header-anchor" href="#_14-4-1-一主二仆" aria-hidden="true">#</a> 14.4.1 一主二仆</h3>
<p>切入点问题？slave1、slave2是从头开始复制还是从切入点开始复制?比如从k4进来，那之前的k1,k2,k3是否也可以复制？</p>
<p>从机是否可以写？set可否？</p>
<p>主机shutdown后情况如何？从机是上位还是原地待命？</p>
<p>主机又回来了后，主机新增记录，从机还能否顺利复制？</p>
<p>其中一台从机down后情况如何？依照原有它能跟上大部队吗？</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503854.png" alt="img" loading="lazy"></p>
<h3 id="_14-4-2-薪火相传" tabindex="-1"><a class="header-anchor" href="#_14-4-2-薪火相传" aria-hidden="true">#</a> 14.4.2 薪火相传</h3>
<p>上一个Slave可以是下一个slave的Master，Slave同样可以接收其他 slaves的连接和同步请求，那么该slave作为了链条中下一个的master, 可以有效减轻master的写压力,去中心化降低风险。</p>
<p>用 <code v-pre>slaveof  &lt;ip&gt;&lt;port&gt;</code></p>
<p>中途变更转向:会清除之前的数据，重新建立拷贝最新的</p>
<p>风险是一旦某个slave宕机，后面的slave都没法备份</p>
<p>主机挂了，从机还是从机，无法写数据了</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503148.png" alt="img" loading="lazy"></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503909.png" alt="img" loading="lazy"></p>
<h3 id="_14-4-3-反客为主" tabindex="-1"><a class="header-anchor" href="#_14-4-3-反客为主" aria-hidden="true">#</a> 14.4.3 反客为主</h3>
<p>当一个master宕机后，后面的slave可以立刻升为master，其后面的slave不用做任何修改。</p>
<p>用 slaveof  no one  将从机变为主机。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503200.png" alt="img" loading="lazy"></p>
<h2 id="_14-5-复制原理" tabindex="-1"><a class="header-anchor" href="#_14-5-复制原理" aria-hidden="true">#</a> 14.5 复制原理</h2>
<ul>
<li>
<p>Slave启动成功连接到master后会发送一个sync命令</p>
</li>
<li>
<p>Master接到命令启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令， 在后台进程执行完毕之后，master将传送整个数据文件到slave,以完成一次完全同步</p>
</li>
<li>
<p>全量复制：而slave服务在接收到数据库文件数据后，将其存盘并加载到内存中。</p>
</li>
<li>
<p>增量复制：Master继续将新的所有收集到的修改命令依次传给slave,完成同步</p>
</li>
<li>
<p>但是只要是重新连接master,一次完全同步（全量复制)将被自动执行</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503454.png" alt="img" loading="lazy"></p>
<h2 id="_14-6-哨兵模式-sentinel" tabindex="-1"><a class="header-anchor" href="#_14-6-哨兵模式-sentinel" aria-hidden="true">#</a> 14.6 哨兵模式(sentinel)</h2>
<h3 id="_14-6-1-是什么" tabindex="-1"><a class="header-anchor" href="#_14-6-1-是什么" aria-hidden="true">#</a> 14.6.1 是什么</h3>
<p>反客为主的自动版 ，能够后台监控主机是否故障，如果故障了根据投票数自动将从库转换为主库</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503738.png" alt="img" loading="lazy"></p>
<h3 id="_14-6-2-怎么玩-使用步骤" tabindex="-1"><a class="header-anchor" href="#_14-6-2-怎么玩-使用步骤" aria-hidden="true">#</a> 14.6.2 怎么玩(使用步骤)</h3>
<h4 id="_14-6-2-1-调整为一主二仆模式-6379-带着-6380-、-6381" tabindex="-1"><a class="header-anchor" href="#_14-6-2-1-调整为一主二仆模式-6379-带着-6380-、-6381" aria-hidden="true">#</a> 14.6.2.1 调整为一主二仆模式，  6379  带着  6380  、  6381</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503015.png" alt="img" loading="lazy"></p>
<h4 id="_14-6-2-2-自定义的-myredis-目录下新建-sentinel-conf-文件-名字绝不能错" tabindex="-1"><a class="header-anchor" href="#_14-6-2-2-自定义的-myredis-目录下新建-sentinel-conf-文件-名字绝不能错" aria-hidden="true">#</a> 14.6.2.2 自定义的  /myredis  目录下新建  sentinel.conf  文件，名字绝不能错</h4>
<h4 id="_14-6-2-3-配置哨兵-填写内容" tabindex="-1"><a class="header-anchor" href="#_14-6-2-3-配置哨兵-填写内容" aria-hidden="true">#</a> 14.6.2.3 配置哨兵,填写内容</h4>
<p>sentinel monitor mymaster 127.0.0.1 6379 1</p>
<p>其中mymaster为监控对象起的服务器名称， 1 为至少有多少个哨兵同意迁移的数量。</p>
<h4 id="_14-6-2-4-启动哨兵" tabindex="-1"><a class="header-anchor" href="#_14-6-2-4-启动哨兵" aria-hidden="true">#</a> 14.6.2.4 启动哨兵</h4>
<p>/usr/local/bin</p>
<p>redis做压测可以用自带的redis-benchmark工具</p>
<p>执行redis-sentinel  /myredis/sentinel.conf</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503318.png" alt="img" loading="lazy"></p>
<h4 id="_14-6-2-5-当主机挂掉-从机选举中产生新的主机" tabindex="-1"><a class="header-anchor" href="#_14-6-2-5-当主机挂掉-从机选举中产生新的主机" aria-hidden="true">#</a> 14.6.2.5 当主机挂掉，从机选举中产生新的主机</h4>
<p>(大概10秒左右可以看到哨兵窗口日志，切换了新的主机)</p>
<p>哪个从机会被选举为主机呢？根据优先级别：slave-priority</p>
<p>原主机重启后会变为从机。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503745.png" alt="img" loading="lazy"></p>
<h4 id="_14-6-2-6-复制延时" tabindex="-1"><a class="header-anchor" href="#_14-6-2-6-复制延时" aria-hidden="true">#</a> 14.6.2.6 复制延时</h4>
<p>由于所有的写操作都是先在Master上操作，然后同步更新到Slave上，所以从Master同步到Slave机器有一定的延迟，当系统很繁忙的时候，延迟问题会更加严重，Slave机器数量的增加也会使这个问题更加严重。</p>
<h3 id="_14-6-3-故障恢复" tabindex="-1"><a class="header-anchor" href="#_14-6-3-故障恢复" aria-hidden="true">#</a> 14.6.3 故障恢复</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221503075.png" alt="img" loading="lazy"></p>
<p>优先级在redis.conf中默认：slave-priority 100，值越小优先级越高</p>
<p>偏移量是指获得原主机数据最全的</p>
<p>每个redis实例启动后都会随机生成一个40位的runid</p>
<h3 id="_14-6-4-主从复制" tabindex="-1"><a class="header-anchor" href="#_14-6-4-主从复制" aria-hidden="true">#</a> 14.6.4 主从复制</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">JedisSentinelPool</span> jedisSentinelPool<span class="token operator">=</span> <span class="token keyword">null</span> <span class="token punctuation">;</span> 
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Jedis</span> <span class="token function">getJedisFromSentinel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>  
    <span class="token keyword">if</span> <span class="token punctuation">(</span>jedisSentinelPool<span class="token operator">==</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">{</span> 
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> sentinelSet<span class="token operator">=</span> <span class="token keyword">new</span>  <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sentinelSet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span> <span class="token string">"192.168.11.103:26379"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JedisPoolConfig</span> jedisPoolConfig <span class="token operator">=</span> <span class="token keyword">new</span>  <span class="token class-name">JedisPoolConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxTotal</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//最大可用连接数</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxIdle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//最大闲置连接数</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMinIdle</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//最小闲置连接数 </span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setBlockWhenExhausted</span><span class="token punctuation">(</span> <span class="token boolean">true</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//连接耗尽是否等待</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setMaxWaitMillis</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//等待时间</span>
        jedisPoolConfig<span class="token punctuation">.</span><span class="token function">setTestOnBorrow</span><span class="token punctuation">(</span> <span class="token boolean">true</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//取连接的时候进行一下测试 ping pong</span>
        jedisSentinelPool<span class="token operator">=</span> <span class="token keyword">new</span>  <span class="token class-name">JedisSentinelPool</span><span class="token punctuation">(</span> <span class="token string">"mymaster"</span> <span class="token punctuation">,</span>sentinelSet<span class="token punctuation">,</span>jedisPoolConfig<span class="token punctuation">)</span><span class="token punctuation">;</span>  
        <span class="token keyword">return</span>  jedisSentinelPool<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     
    <span class="token punctuation">}</span> 
    <span class="token keyword">else</span> <span class="token punctuation">{</span>  
        <span class="token keyword">return</span>  jedisSentinelPool<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


