<template><div><h1 id="_2-redis概述安装" tabindex="-1"><a class="header-anchor" href="#_2-redis概述安装" aria-hidden="true">#</a> 2. Redis概述安装</h1>
<ul>
<li>
<p>Redis是一个开源的key-value存储系统。</p>
</li>
<li>
<p>和Memcached类似，它支持存储的value类型相对更多，包括string(字符串)、list(链表)、set(集合)、zset(sorted set --有序集合)和hash（哈希类型）。</p>
</li>
<li>
<p>这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是原子性的。</p>
</li>
<li>
<p>在此基础上，Redis支持各种不同方式的排序。</p>
</li>
<li>
<p>与memcached一样，为了保证效率，数据都是缓存在内存中。</p>
</li>
<li>
<p>区别的是Redis会周期性的把更新的数据写入磁盘或者把修改操作写入追加的记录文件。</p>
</li>
<li>
<p>并且在此基础上实现了master-slave(主从)同步。</p>
</li>
</ul>
<h2 id="_2-1-应用场景" tabindex="-1"><a class="header-anchor" href="#_2-1-应用场景" aria-hidden="true">#</a> 2.1 应用场景</h2>
<h3 id="_2-1-1-配合关系型数据库做高速缓存" tabindex="-1"><a class="header-anchor" href="#_2-1-1-配合关系型数据库做高速缓存" aria-hidden="true">#</a> 2.1.1 配合关系型数据库做高速缓存</h3>
<ul>
<li>
<p>高频次，热门访问的数据，降低数据库IO</p>
</li>
<li>
<p>分布式架构，做session共享</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101454.png" alt="img" loading="lazy"></p>
<h3 id="_2-1-2-多样的数据结构存储持久化数据" tabindex="-1"><a class="header-anchor" href="#_2-1-2-多样的数据结构存储持久化数据" aria-hidden="true">#</a> 2.1.2 多样的数据结构存储持久化数据</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101362.png" alt="img" loading="lazy"></p>
<h2 id="_2-2-redis安装" tabindex="-1"><a class="header-anchor" href="#_2-2-redis安装" aria-hidden="true">#</a> 2.2 Redis安装</h2>
<table>
<thead>
<tr>
<th>Redis官方网站</th>
<th>Redis中文官方网站</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="http://redis.io" target="_blank" rel="noopener noreferrer">http://redis.io<ExternalLinkIcon/></a></td>
<td><a href="http://redis.cn/" target="_blank" rel="noopener noreferrer">http://redis.cn/<ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101612.jpg" alt="img" loading="lazy"></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101014.jpg" alt="img" loading="lazy"></p>
<h3 id="_2-2-1-安装版本" tabindex="-1"><a class="header-anchor" href="#_2-2-1-安装版本" aria-hidden="true">#</a> 2.2.1 安装版本</h3>
<ul>
<li>
<p>6.2.1 for Linux（redis-6.2.1.tar.gz）</p>
</li>
<li>
<p>不用考虑在windows环境下对Redis的支持</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101107.png" alt="img" loading="lazy"></p>
<h3 id="_2-2-2-安装步骤" tabindex="-1"><a class="header-anchor" href="#_2-2-2-安装步骤" aria-hidden="true">#</a> 2.2.2 安装步骤</h3>
<h4 id="_2-2-2-1-准备工作-下载安装最新版的gcc编译器" tabindex="-1"><a class="header-anchor" href="#_2-2-2-1-准备工作-下载安装最新版的gcc编译器" aria-hidden="true">#</a> 2.2.2.1 准备工作：下载安装最新版的gcc编译器</h4>
<p>安装C 语言的编译环境</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> centos-release-scl scl-utils-build

yum <span class="token function">install</span> <span class="token parameter variable">-y</span> devtoolset-8-toolchain

scl <span class="token builtin class-name">enable</span> devtoolset-8 <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试gcc版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gcc <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101209.jpg" alt="img" loading="lazy"></p>
<h4 id="_2-2-2-2-下载redis-6-2-1-tar-gz放-opt目录" tabindex="-1"><a class="header-anchor" href="#_2-2-2-2-下载redis-6-2-1-tar-gz放-opt目录" aria-hidden="true">#</a> 2.2.2.2 下载redis-6.2.1.tar.gz放/opt目录</h4>
<h4 id="_2-2-2-3-解压命令-tar-zxvf-redis-6-2-1-tar-gz" tabindex="-1"><a class="header-anchor" href="#_2-2-2-3-解压命令-tar-zxvf-redis-6-2-1-tar-gz" aria-hidden="true">#</a> 2.2.2.3 解压命令：tar -zxvf redis-6.2.1.tar.gz</h4>
<h4 id="_2-2-2-4-解压完成后进入目录-cd-redis-6-2-1" tabindex="-1"><a class="header-anchor" href="#_2-2-2-4-解压完成后进入目录-cd-redis-6-2-1" aria-hidden="true">#</a> 2.2.2.4 解压完成后进入目录：cd redis-6.2.1****</h4>
<h4 id="_2-2-2-5-在redis-6-2-1目录下再次执行make命令-只是编译好" tabindex="-1"><a class="header-anchor" href="#_2-2-2-5-在redis-6-2-1目录下再次执行make命令-只是编译好" aria-hidden="true">#</a> 2.2.2.5 在redis-6.2.1目录下再次执行make命令（只是编译好）</h4>
<h4 id="_2-2-2-6-如果没有准备好c语言编译环境-make会报错—jemalloc-jemalloc-h-没有那个文件" tabindex="-1"><a class="header-anchor" href="#_2-2-2-6-如果没有准备好c语言编译环境-make会报错—jemalloc-jemalloc-h-没有那个文件" aria-hidden="true">#</a> 2.2.2.6 如果没有准备好C语言编译环境，make会报错—Jemalloc/jemalloc.h：没有那个文件</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101866.png" alt="img" loading="lazy"></p>
<h4 id="_2-2-2-7-解决方案-运行make-distclean" tabindex="-1"><a class="header-anchor" href="#_2-2-2-7-解决方案-运行make-distclean" aria-hidden="true">#</a> 2.2.2.7 解决方案：运行make distclean</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101432.png" alt="img" loading="lazy"></p>
<h4 id="_2-2-2-8-在redis-6-2-1目录下再次执行make命令-只是编译好" tabindex="-1"><a class="header-anchor" href="#_2-2-2-8-在redis-6-2-1目录下再次执行make命令-只是编译好" aria-hidden="true">#</a> 2.2.2.8 在redis-6.2.1目录下再次执行make命令（只是编译好）</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101927.png" alt="img" loading="lazy"></p>
<h4 id="_2-2-2-9-跳过make-test-继续执行-make-install" tabindex="-1"><a class="header-anchor" href="#_2-2-2-9-跳过make-test-继续执行-make-install" aria-hidden="true">#</a> 2.2.2.9 跳过make test 继续执行: make install</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101572.png" alt="img" loading="lazy"></p>
<h3 id="_2-2-3-安装目录-usr-local-bin" tabindex="-1"><a class="header-anchor" href="#_2-2-3-安装目录-usr-local-bin" aria-hidden="true">#</a> 2.2.3 安装目录：/usr/local/bin</h3>
<p>查看默认安装目录：</p>
<p>redis-benchmark:性能测试工具，可以在自己本子运行，看看自己本子性能如何</p>
<p>redis-check-aof：修复有问题的AOF文件，rdb和aof后面讲</p>
<p>redis-check-dump：修复有问题的dump.rdb文件</p>
<p>redis-sentinel：Redis集群使用</p>
<p>redis-server：Redis服务器启动命令</p>
<p>redis-cli：客户端，操作入口</p>
<h3 id="_2-2-4-前台启动-不推荐" tabindex="-1"><a class="header-anchor" href="#_2-2-4-前台启动-不推荐" aria-hidden="true">#</a> 2.2.4 前台启动（不推荐）</h3>
<p>前台启动，命令行窗口不能关闭，否则服务器停止</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101194.png" alt="img" loading="lazy"></p>
<h3 id="_2-2-5-后台启动-推荐" tabindex="-1"><a class="header-anchor" href="#_2-2-5-后台启动-推荐" aria-hidden="true">#</a> 2.2.5 后台启动（推荐）</h3>
<h4 id="_2-2-5-1-备份redis-conf" tabindex="-1"><a class="header-anchor" href="#_2-2-5-1-备份redis-conf" aria-hidden="true">#</a> 2.2.5.1 备份redis.conf</h4>
<p>拷贝一份redis.conf到其他目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span>  /opt/redis-3.2.5/redis.conf  /myredis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-2-5-2-后台启动设置-daemonize-no-改成-yes" tabindex="-1"><a class="header-anchor" href="#_2-2-5-2-后台启动设置-daemonize-no-改成-yes" aria-hidden="true">#</a> 2.2.5.2 后台启动设置*<strong><strong><strong>*daemonize no*</strong></strong></strong>*改成****<em><strong>*yes*</strong></em></h4>
<p>修改redis.conf(128行)文件将里面的daemonize no 改成 yes，让服务在后台启动</p>
<h4 id="_2-2-5-3-redis启动" tabindex="-1"><a class="header-anchor" href="#_2-2-5-3-redis启动" aria-hidden="true">#</a> 2.2.5.3 Redis启动</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis-server/myredis/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101335.png" alt="img" loading="lazy"></p>
<h4 id="_2-2-5-4-用客户端访问-redis-cli" tabindex="-1"><a class="header-anchor" href="#_2-2-5-4-用客户端访问-redis-cli" aria-hidden="true">#</a> 2.2.5.4 用客户端访问：redis-cli</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101619.png" alt="img" loading="lazy"></p>
<h4 id="_2-2-5-5-多个端口可以-redis-cli-p-6379" tabindex="-1"><a class="header-anchor" href="#_2-2-5-5-多个端口可以-redis-cli-p-6379" aria-hidden="true">#</a> 2.2.5.5 多个端口可以：redis-cli -p 6379</h4>
<h4 id="_2-2-5-6-测试验证-ping" tabindex="-1"><a class="header-anchor" href="#_2-2-5-6-测试验证-ping" aria-hidden="true">#</a> 2.2.5.6 测试验证：ping</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101229.png" alt="img" loading="lazy"></p>
<h4 id="_2-2-5-7-redis关闭" tabindex="-1"><a class="header-anchor" href="#_2-2-5-7-redis关闭" aria-hidden="true">#</a> 2.2.5.7 Redis关闭</h4>
<p>单实例关闭：redis-cli shutdown</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101530.png" alt="img" loading="lazy"></p>
<p>也可以进入终端后再关闭</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101178.png" alt="img" loading="lazy"></p>
<p>多实例关闭，指定端口关闭：redis-cli -p 6379 shutdown</p>
<h3 id="_2-2-6-redis介绍相关知识" tabindex="-1"><a class="header-anchor" href="#_2-2-6-redis介绍相关知识" aria-hidden="true">#</a> 2.2.6 Redis介绍相关知识</h3>
<p>端口6379从何而来Alessia  Merz
<img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101623.png" alt="img" loading="lazy"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>- 默认16个数据库，类似数组下标从0开始，初始默认使用0号库
- 使用命令 <span class="token keyword">select</span>  <span class="token operator">&lt;</span>dbid<span class="token operator">></span>来切换数据库。 如: <span class="token keyword">select</span> <span class="token number">8</span> 
- 统一密码管理，所有库同样密码。
- dbsize查看当前数据库的key的数量
- flushdb清空当前库
- flushall通杀全部库
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Redis是单线程+多路IO复用技术</p>
<p>多路复用是指使用一个线程来检查多个文件描述符（Socket）的就绪状态，比如调用select和poll函数，传入多个文件描述符，如果有一个文件描述符就绪，则返回，否则阻塞直到超时。得到就绪状态后进行真正的操作可以在同一个线程里执行，也可以启动线程执行（比如使用线程池）</p>
<p>串行  vs  多线程+锁（memcached） vs  单线程+多路IO复用(Redis)</p>
<p>（与Memcache三点不同: 支持多数据类型，支持持久化，单线程+多路IO复用）</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210182101075.png" alt="img" loading="lazy"></p>
</div></template>


