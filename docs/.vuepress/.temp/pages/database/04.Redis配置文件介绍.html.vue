<template><div><h1 id="_04-redis配置文件介绍" tabindex="-1"><a class="header-anchor" href="#_04-redis配置文件介绍" aria-hidden="true">#</a> 04.Redis配置文件介绍</h1>
<p>自定义目录：/myredis/redis.conf</p>
<h2 id="_4-1-units单位" tabindex="-1"><a class="header-anchor" href="#_4-1-units单位" aria-hidden="true">#</a> 4.1 ###Units单位###</h2>
<p>配置大小单位,开头定义了一些基本的度量单位，只支持bytes，不支持bit</p>
<p>大小写不敏感</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112235.png" alt="img" loading="lazy"></p>
<h2 id="_4-2-includes包含" tabindex="-1"><a class="header-anchor" href="#_4-2-includes包含" aria-hidden="true">#</a> 4.2 ###INCLUDES包含###</h2>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112107.png" alt="img" loading="lazy"></p>
<p>类似jsp中的include，多实例的情况可以把公用的配置文件提取出来</p>
<h2 id="_4-3-网络相关配置" tabindex="-1"><a class="header-anchor" href="#_4-3-网络相关配置" aria-hidden="true">#</a> 4.3 ###网络相关配置###</h2>
<h3 id="_4-3-1-bind" tabindex="-1"><a class="header-anchor" href="#_4-3-1-bind" aria-hidden="true">#</a> 4.3.1 bind</h3>
<p>默认情况bind=127.0.0.1只能接受本机的访问请求</p>
<p>不写的情况下，无限制接受任何ip地址的访问</p>
<p>生产环境肯定要写你应用服务器的地址；服务器是需要远程访问的，所以需要将其注释掉</p>
<p>如果开启了protected-mode，那么在没有设定bind ip且没有设密码的情况下，Redis只允许接受本机的响应</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112522.png" alt="img" loading="lazy"></p>
<p>保存配置，停止服务，重启启动查看进程，不再是本机访问了。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112896.png" alt="img" loading="lazy"></p>
<h3 id="_4-3-2-protected-mode" tabindex="-1"><a class="header-anchor" href="#_4-3-2-protected-mode" aria-hidden="true">#</a> 4.3.2 protected-mode</h3>
<p>将本机访问保护模式设置no</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112745.png" alt="img" loading="lazy"></p>
<h3 id="_4-3-3-port" tabindex="-1"><a class="header-anchor" href="#_4-3-3-port" aria-hidden="true">#</a> 4.3.3 Port</h3>
<p>端口号，默认 6379</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112015.png" alt="img" loading="lazy"></p>
<h3 id="_4-3-4-tcp-backlog" tabindex="-1"><a class="header-anchor" href="#_4-3-4-tcp-backlog" aria-hidden="true">#</a> 4.3.4 tcp-backlog</h3>
<p>设置tcp的backlog，backlog其实是一个连接队列，backlog队列总和=未完成三次握手队列 + 已经完成三次握手队列。</p>
<p>在高并发环境下你需要一个高backlog值来避免慢客户端连接问题。</p>
<p>注意Linux内核会将这个值减小到/proc/sys/net/core/somaxconn的值（128），所以需要确认增大/proc/sys/net/core/somaxconn和/proc/sys/net/ipv4/tcp_max_syn_backlog（128）两个值来达到想要的效果</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112899.png" alt="img" loading="lazy"></p>
<h3 id="_4-3-5-timeout" tabindex="-1"><a class="header-anchor" href="#_4-3-5-timeout" aria-hidden="true">#</a> 4.3.5 timeout</h3>
<p>一个空闲的客户端维持多少秒会关闭，0表示关闭该功能。即永不关闭。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112516.png" alt="img" loading="lazy"></p>
<h3 id="_4-3-6-tcp-keepalive" tabindex="-1"><a class="header-anchor" href="#_4-3-6-tcp-keepalive" aria-hidden="true">#</a> 4.3.6 tcp-keepalive</h3>
<p>对访问客户端的一种心跳检测，每个n秒检测一次。</p>
<p>单位为秒，如果设置为0，则不会进行Keepalive检测，建议设置成60</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112018.png" alt="img" loading="lazy"></p>
<h2 id="_4-4-general通用" tabindex="-1"><a class="header-anchor" href="#_4-4-general通用" aria-hidden="true">#</a> 4.4 ###GENERAL通用###</h2>
<h3 id="_4-4-1-daemonize" tabindex="-1"><a class="header-anchor" href="#_4-4-1-daemonize" aria-hidden="true">#</a> 4.4.1 daemonize</h3>
<p>是否为后台进程，设置为yes</p>
<p>守护进程，后台启动</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112008.png" alt="img" loading="lazy"></p>
<h3 id="_4-4-2-pidfile" tabindex="-1"><a class="header-anchor" href="#_4-4-2-pidfile" aria-hidden="true">#</a> 4.4.2 pidfile</h3>
<p>存放pid文件的位置，每个实例会产生一个不同的pid文件</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112379.png" alt="img" loading="lazy"></p>
<h3 id="_4-4-3-loglevel" tabindex="-1"><a class="header-anchor" href="#_4-4-3-loglevel" aria-hidden="true">#</a> 4.4.3 loglevel</h3>
<p>指定日志记录级别，Redis总共支持四个级别：debug、verbose、notice、warning，默认为notice</p>
<p>四个级别根据使用阶段来选择，生产环境选择notice 或者warning</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112021.png" alt="img" loading="lazy"></p>
<h3 id="_4-4-3-logfile" tabindex="-1"><a class="header-anchor" href="#_4-4-3-logfile" aria-hidden="true">#</a> 4.4.3 logfile</h3>
<p>日志文件名称</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112507.png" alt="img" loading="lazy"></p>
<h3 id="_4-4-5-databases-16" tabindex="-1"><a class="header-anchor" href="#_4-4-5-databases-16" aria-hidden="true">#</a> 4.4.5 databases 16</h3>
<p>设定库的数量 默认16，默认数据库为0，可以使用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>SELECT <span class="token operator">&lt;</span>dbid<span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令在连接上指定数据库id</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112754.png" alt="img" loading="lazy"></p>
<h2 id="_4-5-security安全" tabindex="-1"><a class="header-anchor" href="#_4-5-security安全" aria-hidden="true">#</a> 4.5 ###SECURITY安全###</h2>
<h3 id="_4-5-1-设置密码" tabindex="-1"><a class="header-anchor" href="#_4-5-1-设置密码" aria-hidden="true">#</a> 4.5.1 设置密码</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112185.png" alt="img" loading="lazy"></p>
<p>访问密码的查看、设置和取消</p>
<p>在命令中设置密码，只是临时的。重启redis服务器，密码就还原了。</p>
<p>永久设置，需要再配置文件中进行设置。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112686.png" alt="img" loading="lazy"></p>
<h2 id="_4-6-limits限制" tabindex="-1"><a class="header-anchor" href="#_4-6-limits限制" aria-hidden="true">#</a> 4.6 #### LIMITS限制###</h2>
<h3 id="_4-6-1-maxclients" tabindex="-1"><a class="header-anchor" href="#_4-6-1-maxclients" aria-hidden="true">#</a> 4.6.1 maxclients</h3>
<ul>
<li>
<p>设置redis同时可以与多少个客户端进行连接。</p>
</li>
<li>
<p>默认情况下为10000个客户端。</p>
</li>
<li>
<p>如果达到了此限制，redis则会拒绝新的连接请求，并且向这些连接请求方发出“max number of clients reached”以作回应。</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112689.png" alt="img" loading="lazy"></p>
<h3 id="_4-6-2-maxmemory" tabindex="-1"><a class="header-anchor" href="#_4-6-2-maxmemory" aria-hidden="true">#</a> 4.6.2 maxmemory</h3>
<ul>
<li>
<p>建议必须设置，否则，将内存占满，造成服务器宕机</p>
</li>
<li>
<p>设置redis可以使用的内存量。一旦到达内存使用上限，redis将会试图移除内部数据，移除规则可以通过maxmemory-policy来指定。</p>
</li>
<li>
<p>如果redis无法根据移除规则来移除内存中的数据，或者设置了“不允许移除”，那么redis则会针对那些需要申请内存的指令返回错误信息，比如SET、LPUSH等。</p>
</li>
<li>
<p>但是对于无内存申请的指令，仍然会正常响应，比如GET等。如果你的redis是主redis（说明你的redis有从redis），那么在设置内存使用上限时，需要在系统中留出一些内存空间给同步队列缓存，只有在你设置的是“不移除”的情况下，才不用考虑这个因素。</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112109.png" alt="img" loading="lazy"></p>
<h3 id="_4-6-3-maxmemory-policy" tabindex="-1"><a class="header-anchor" href="#_4-6-3-maxmemory-policy" aria-hidden="true">#</a> 4.6.3 maxmemory-policy</h3>
<ul>
<li>
<p>volatile-lru：使用LRU算法移除key，只对设置了过期时间的键；（最近最少使用）</p>
</li>
<li>
<p>allkeys-lru：在所有集合key中，使用LRU算法移除key</p>
</li>
<li>
<p>volatile-random：在过期集合中移除随机的key，只对设置了过期时间的键</p>
</li>
<li>
<p>allkeys-random：在所有集合key中，移除随机的key</p>
</li>
<li>
<p>volatile-ttl：移除那些TTL值最小的key，即那些最近要过期的key</p>
</li>
<li>
<p>noeviction：不进行移除。针对写操作，只是返回错误信息</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112979.png" alt="img" loading="lazy"></p>
<h3 id="_4-6-4-maxmemory-samples" tabindex="-1"><a class="header-anchor" href="#_4-6-4-maxmemory-samples" aria-hidden="true">#</a> 4.6.4 maxmemory-samples</h3>
<ul>
<li>
<p>设置样本数量，LRU算法和最小TTL算法都并非是精确的算法，而是估算值，所以你可以设置样本的大小，redis默认会检查这么多个key并选择其中LRU的那个。</p>
</li>
<li>
<p>一般设置3到7的数字，数值越小样本越不准确，但性能消耗越小。</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202112433.png" alt="img" loading="lazy"></p>
</div></template>


