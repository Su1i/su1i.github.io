<template><div><h1 id="_11-redis-事务-秒杀案例" tabindex="-1"><a class="header-anchor" href="#_11-redis-事务-秒杀案例" aria-hidden="true">#</a> 11.Redis_事务_秒杀案例</h1>
<h2 id="_11-1-解决计数器和人员记录的事务操作" tabindex="-1"><a class="header-anchor" href="#_11-1-解决计数器和人员记录的事务操作" aria-hidden="true">#</a> 11.1 解决计数器和人员记录的事务操作</h2>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048699.png" alt="img" loading="lazy"></p>
<h2 id="_11-2-redis事务-秒杀并发模拟" tabindex="-1"><a class="header-anchor" href="#_11-2-redis事务-秒杀并发模拟" aria-hidden="true">#</a> 11.2 Redis事务--秒杀并发模拟</h2>
<p>使用工具ab模拟测试</p>
<p>CentOS6 默认安装</p>
<p>CentOS7需要手动安装</p>
<h3 id="_11-2-1-联网" tabindex="-1"><a class="header-anchor" href="#_11-2-1-联网" aria-hidden="true">#</a> 11.2.1 联网：</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> httpd-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_11-2-2-无网络" tabindex="-1"><a class="header-anchor" href="#_11-2-2-无网络" aria-hidden="true">#</a> 11.2.2 无网络</h3>
<p>（1） 进入cd  /run/media/root/CentOS 7 x86_64/Packages（路径跟centos6不同）</p>
<p>（2） 顺序安装</p>
<p>apr-1.4.8-3.el7.x86_64.rpm</p>
<p>apr-util-1.5.2-6.el7.x86_64.rpm</p>
<p>httpd-tools-2.4.6-67.el7.centos.x86_64.rpm</p>
<h3 id="_11-2-3-测试及结果" tabindex="-1"><a class="header-anchor" href="#_11-2-3-测试及结果" aria-hidden="true">#</a> 11.2.3 测试及结果</h3>
<h4 id="_11-2-3-1-通过ab测试" tabindex="-1"><a class="header-anchor" href="#_11-2-3-1-通过ab测试" aria-hidden="true">#</a> 11.2.3.1 通过ab测试</h4>
<p>vim postfile 模拟表单提交参数,以&amp;符号结尾;存放当前目录。</p>
<p>内容：prodid=0101&amp;</p>
<p>ab -n 2000 -c 200 -k -p ~/postfile -T application/x-www-form-urlencoded <a href="http://192.168.2.115:8081/Seckill/doseckill" target="_blank" rel="noopener noreferrer">http://192.168.2.115:8081/Seckill/doseckill<ExternalLinkIcon/></a></p>
<h4 id="_11-2-3-2-超卖" tabindex="-1"><a class="header-anchor" href="#_11-2-3-2-超卖" aria-hidden="true">#</a> 11.2.3.2 超卖</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048431.png" alt="img" loading="lazy">
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048539.png" alt="img" loading="lazy"></p>
<h2 id="_11-3-超卖问题" tabindex="-1"><a class="header-anchor" href="#_11-3-超卖问题" aria-hidden="true">#</a> 11.3 超卖问题</h2>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048358.png" alt="img" loading="lazy"></p>
<h2 id="_11-4-利用乐观锁淘汰用户-解决超卖问题。" tabindex="-1"><a class="header-anchor" href="#_11-4-利用乐观锁淘汰用户-解决超卖问题。" aria-hidden="true">#</a> 11.4 利用乐观锁淘汰用户，解决超卖问题。</h2>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048178.png" alt="img" loading="lazy"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//增加乐观锁</span>
jedis<span class="token punctuation">.</span><span class="token function">watch</span><span class="token punctuation">(</span>qtkey<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//3.判断库存</span>
        
<span class="token class-name">String</span> qtkeystr <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>qtkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>qtkeystr<span class="token operator">==</span><span class="token keyword">null</span> <span class="token operator">||</span> <span class="token string">""</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>qtkeystr<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"未初始化库存"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
<span class="token keyword">int</span> qt <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>qtkeystr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>qt<span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"已经秒光"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 

                                                                                                                       
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048899.png" alt="img" loading="lazy"></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//增加事务</span>
<span class="token class-name">Transaction</span> multi <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">multi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//4.减少库存</span>
jedis<span class="token punctuation">.</span><span class="token function">decr</span><span class="token punctuation">(</span>qtkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
multi<span class="token punctuation">.</span><span class="token function">decr</span><span class="token punctuation">(</span>qtkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//5.加人</span>
jedis<span class="token punctuation">.</span><span class="token function">sadd</span><span class="token punctuation">(</span>usrkey<span class="token punctuation">,</span> uid<span class="token punctuation">)</span><span class="token punctuation">;</span>
multi<span class="token punctuation">.</span><span class="token function">sadd</span><span class="token punctuation">(</span>usrkey<span class="token punctuation">,</span> uid<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">//执行事务</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> multi<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//判断事务提交是否失败</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>list<span class="token operator">==</span><span class="token keyword">null</span> <span class="token operator">||</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"秒杀失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>err<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"秒杀成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048957.png" alt="img" loading="lazy"></p>
<h2 id="_11-5-继续增加并发测试" tabindex="-1"><a class="header-anchor" href="#_11-5-继续增加并发测试" aria-hidden="true">#</a> 11.5 继续增加并发测试</h2>
<h3 id="_11-5-1-连接有限制" tabindex="-1"><a class="header-anchor" href="#_11-5-1-连接有限制" aria-hidden="true">#</a> 11.5.1 连接有限制</h3>
<p>ab -n 2000 -c 200 -k -p postfile -T 'application/x-www-form-urlencoded' <a href="http://192.168.140.1:8080/seckill/doseckill" target="_blank" rel="noopener noreferrer">http://192.168.140.1:8080/seckill/doseckill<ExternalLinkIcon/></a></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048524.png" alt="img" loading="lazy"></p>
<p>增加-r参数，-r  Don't exit on socket receive errors.</p>
<p>ab -n 2000 -c 100 -r -p postfile -T 'application/x-www-form-urlencoded' <a href="http://192.168.140.1:8080/seckill/doseckill" target="_blank" rel="noopener noreferrer">http://192.168.140.1:8080/seckill/doseckill<ExternalLinkIcon/></a></p>
<h3 id="_11-5-2-已经秒光-可是还有库存" tabindex="-1"><a class="header-anchor" href="#_11-5-2-已经秒光-可是还有库存" aria-hidden="true">#</a> 11.5.2 已经秒光，可是还有库存</h3>
<p>ab -n 2000 -c 100 -p postfile -T 'application/x-www-form-urlencoded' <a href="http://192.168.137.1:8080/seckill/doseckill" target="_blank" rel="noopener noreferrer">http://192.168.137.1:8080/seckill/doseckill<ExternalLinkIcon/></a></p>
<p>已经秒光，可是还有库存。原因，就是乐观锁导致很多请求都失败。先点的没秒到，后点的可能秒到了。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048840.png" alt="img" loading="lazy"></p>
<h3 id="_11-5-3-连接超时-通过连接池解决" tabindex="-1"><a class="header-anchor" href="#_11-5-3-连接超时-通过连接池解决" aria-hidden="true">#</a> 11.5.3 连接超时，通过连接池解决</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048372.png" alt="img" loading="lazy"></p>
<h3 id="_11-5-4-连接池" tabindex="-1"><a class="header-anchor" href="#_11-5-4-连接池" aria-hidden="true">#</a> 11.5.4 连接池</h3>
<p>节省每次连接redis服务带来的消耗，把连接好的实例反复利用。</p>
<p>通过参数管理连接的行为</p>
<p>代码见项目中</p>
<ul>
<li>
<p>链接池参数</p>
<ul>
<li>
<p>MaxTotal：控制一个pool可分配多少个jedis实例，通过pool.getResource()来获取；如果赋值为-1，则表示不限制；如果pool已经分配了MaxTotal个jedis实例，则此时pool的状态为exhausted。</p>
</li>
<li>
<p>maxIdle：控制一个pool最多有多少个状态为idle(空闲)的jedis实例；</p>
</li>
<li>
<p>MaxWaitMillis：表示当borrow一个jedis实例时，最大的等待毫秒数，如果超过等待时间，则直接抛JedisConnectionException；</p>
</li>
<li>
<p>testOnBorrow：获得一个jedis实例的时候是否检查连接可用性（ping()）；如果为true，则得到的jedis实例均是可用的；</p>
</li>
</ul>
</li>
</ul>
<h2 id="_11-6-解决库存遗留问题" tabindex="-1"><a class="header-anchor" href="#_11-6-解决库存遗留问题" aria-hidden="true">#</a> 11.6 解决库存遗留问题</h2>
<h3 id="_11-6-1-lua脚本" tabindex="-1"><a class="header-anchor" href="#_11-6-1-lua脚本" aria-hidden="true">#</a> 11.6.1 LUA脚本</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048726.png" alt="img" loading="lazy"></p>
<p>Lua 是一个小巧的<a href="http://baike.baidu.com/item/%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80" target="_blank" rel="noopener noreferrer">脚本语言<ExternalLinkIcon/></a>，Lua脚本可以很容易的被C/C++ 代码调用，也可以反过来调用C/C++的函数，Lua并没有提供强大的库，一个完整的Lua解释器不过200k，所以Lua不适合作为开发独立应用程序的语言，而是作为嵌入式脚本语言。</p>
<p>很多应用程序、游戏使用LUA作为自己的嵌入式脚本语言，以此来实现可配置性、可扩展性。</p>
<p>这其中包括魔兽争霸地图、魔兽世界、博德之门、愤怒的小鸟等众多游戏插件或外挂。</p>
<p><a href="https://www.w3cschool.cn/lua/" target="_blank" rel="noopener noreferrer">https://www.w3cschool.cn/lua/<ExternalLinkIcon/></a></p>
<h3 id="_11-6-2-lua脚本在redis中的优势" tabindex="-1"><a class="header-anchor" href="#_11-6-2-lua脚本在redis中的优势" aria-hidden="true">#</a> 11.6.2 LUA脚本在Redis中的优势</h3>
<p>将复杂的或者多步的redis操作，写为一个脚本，一次提交给redis执行，减少反复连接redis的次数。提升性能。</p>
<p>LUA脚本是类似redis事务，有一定的原子性，不会被其他命令插队，可以完成一些redis事务性的操作。</p>
<p>但是注意redis的lua脚本功能，只有在Redis 2.6以上的版本才可以使用。</p>
<p>利用lua脚本淘汰用户，解决超卖问题。</p>
<p>redis 2.6版本以后，通过lua脚本解决争抢问题，实际上是redis 利用其单线程的特性，用任务队列的方式解决多任务并发问题。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048064.png" alt="img" loading="lazy"></p>
<h2 id="_11-7-redis-事务-秒杀案例-代码" tabindex="-1"><a class="header-anchor" href="#_11-7-redis-事务-秒杀案例-代码" aria-hidden="true">#</a> 11.7 Redis_事务_秒杀案例_代码</h2>
<h3 id="_11-7-1-项目结构" tabindex="-1"><a class="header-anchor" href="#_11-7-1-项目结构" aria-hidden="true">#</a> 11.7.1 项目结构</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048698.jpg" alt="img" loading="lazy"></p>
<h3 id="_11-7-2-第一版-简单版" tabindex="-1"><a class="header-anchor" href="#_11-7-2-第一版-简单版" aria-hidden="true">#</a> 11.7.2 第一版：简单版</h3>
<p>老师点10次，正常秒杀</p>
<p>同学一起点试一试，秒杀也是正常的。这是因为还达不到并发的效果。</p>
<p>使用工具ab模拟并发测试，会出现超卖情况。查看库存会出现负数。</p>
<h3 id="_11-7-3-第二版-加事务-乐观锁-解决超卖-但出现遗留库存和连接超时" tabindex="-1"><a class="header-anchor" href="#_11-7-3-第二版-加事务-乐观锁-解决超卖-但出现遗留库存和连接超时" aria-hidden="true">#</a> 11.7.3 第二版：加事务-乐观锁(解决超卖),但出现遗留库存和连接超时</h3>
<h3 id="_11-7-4-第三版-连接池解决超时问题" tabindex="-1"><a class="header-anchor" href="#_11-7-4-第三版-连接池解决超时问题" aria-hidden="true">#</a> 11.7.4 第三版：连接池解决超时问题</h3>
<h3 id="_11-7-5-第四版-解决库存依赖问题-lua脚本" tabindex="-1"><a class="header-anchor" href="#_11-7-5-第四版-解决库存依赖问题-lua脚本" aria-hidden="true">#</a> 11.7.5 第四版：解决库存依赖问题，LUA脚本</h3>
<div class="language-lua ext-lua line-numbers-mode"><pre v-pre class="language-lua"><code><span class="token keyword">local</span> userid<span class="token operator">=</span>KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span> 
<span class="token keyword">local</span> prodid<span class="token operator">=</span>KEYS<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">local</span> qtkey<span class="token operator">=</span><span class="token string">"sk:"</span><span class="token operator">..</span>prodid<span class="token operator">..</span><span class="token string">":qt"</span><span class="token punctuation">;</span>
<span class="token keyword">local</span> usersKey<span class="token operator">=</span><span class="token string">"sk:"</span><span class="token operator">..</span>prodid<span class="token punctuation">.</span>"<span class="token punctuation">:</span>usr'<span class="token punctuation">;</span> 
<span class="token keyword">local</span> userExists<span class="token operator">=</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">"sismember"</span><span class="token punctuation">,</span>usersKey<span class="token punctuation">,</span>userid<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token function">tonumber</span><span class="token punctuation">(</span>userExists<span class="token punctuation">)</span><span class="token operator">==</span><span class="token number">1</span> <span class="token keyword">then</span>
  <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>
<span class="token keyword">local</span> num<span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">"get"</span> <span class="token punctuation">,</span>qtkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token function">tonumber</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token operator">&lt;=</span><span class="token number">0</span> <span class="token keyword">then</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
  redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">"decr"</span><span class="token punctuation">,</span>qtkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">"sadd"</span><span class="token punctuation">,</span>usersKey<span class="token punctuation">,</span>userid<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>
<span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


