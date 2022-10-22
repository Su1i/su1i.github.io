<template><div><h1 id="_17-redis6-0新功能" tabindex="-1"><a class="header-anchor" href="#_17-redis6-0新功能" aria-hidden="true">#</a> 17.Redis6.0新功能</h1>
<h2 id="_17-1-acl" tabindex="-1"><a class="header-anchor" href="#_17-1-acl" aria-hidden="true">#</a> 17.1 ACL</h2>
<h3 id="_17-1-1-简介" tabindex="-1"><a class="header-anchor" href="#_17-1-1-简介" aria-hidden="true">#</a> 17.1.1 简介</h3>
<p>Redis ACL是Access Control List（访问控制列表）的缩写，该功能允许根据可以执行的命令和可以访问的键来限制某些连接。</p>
<p>在Redis 5版本之前，Redis 安全规则只有密码控制 还有通过rename 来调整高危命令比如 flushdb ， KEYS* ， shutdown 等。Redis 6 则提供ACL的功能对用户进行更细粒度的权限控制 ：</p>
<p>（1）接入权限:用户名和密码</p>
<p>（2）可以执行的命令</p>
<p>（3）可以操作的 KEY</p>
<p>参考官网：<a href="https://redis.io/topics/acl" target="_blank" rel="noopener noreferrer">https://redis.io/topics/acl<ExternalLinkIcon/></a></p>
<h3 id="_17-1-2-命令" tabindex="-1"><a class="header-anchor" href="#_17-1-2-命令" aria-hidden="true">#</a> 17.1.2 命令</h3>
<p>1、使用acl list命令展现用户权限列表</p>
<p>（1）数据说明</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715686.jpg" alt="img" loading="lazy"></p>
<p>2、使用acl cat命令</p>
<p>（1）查看添加权限指令类别</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715790.jpg" alt="img" loading="lazy"></p>
<p>（2）加参数类型名可以查看类型下具体命令</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715863.jpg" alt="img" loading="lazy"></p>
<p>3、使用acl whoami命令查看当前用户</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715587.jpg" alt="img" loading="lazy"></p>
<p>4、使用aclsetuser命令创建和编辑用户ACL</p>
<p>（1）ACL规则</p>
<p>下面是有效ACL规则的列表。某些规则只是用于激活或删除标志，或对用户ACL执行给定更改的单个单词。其他规则是字符前缀，它们与命令或类别名称、键模式等连接在一起。</p>
<table>
<thead>
<tr>
<th>ACL规则</th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>类型</td>
<td>参数</td>
<td>说明</td>
</tr>
<tr>
<td>启动和禁用用户</td>
<td>on</td>
<td>激活某用户账号</td>
</tr>
<tr>
<td>off</td>
<td>禁用某用户账号。注意，已验证的连接仍然可以工作。如果默认用户被标记为off，则新连接将在未进行身份验证的情况下启动，并要求用户使用AUTH选项发送AUTH或HELLO，以便以某种方式进行身份验证。</td>
<td></td>
</tr>
<tr>
<td>权限的添加删除</td>
<td><code v-pre>+&lt;command&gt; </code></td>
<td>将指令添加到用户可以调用的指令列表中</td>
</tr>
<tr>
<td><code v-pre>-&lt;command&gt; </code></td>
<td>从用户可执行指令列表移除指令</td>
<td></td>
</tr>
<tr>
<td><code v-pre>+@&lt;category&gt;</code></td>
<td>添加该类别中用户要调用的所有指令，有效类别为@admin、@set、@sortedset…等，通过调用ACL CAT命令查看完整列表。特殊类别@all表示所有命令，包括当前存在于服务器中的命令，以及将来将通过模块加载的命令。</td>
<td></td>
</tr>
<tr>
<td><code v-pre>-@&lt;actegory&gt;</code></td>
<td>从用户可调用指令中移除类别</td>
<td></td>
</tr>
<tr>
<td>allcommands</td>
<td>+@all的别名</td>
<td></td>
</tr>
<tr>
<td>nocommand</td>
<td>-@all的别名</td>
<td></td>
</tr>
<tr>
<td>可操作键的添加或删除</td>
<td><code v-pre>~&lt;pattern&gt;</code></td>
<td>添加可作为用户可操作的键的模式。例如~*允许所有的键</td>
</tr>
</tbody>
</table>
<p>（2）通过命令创建新用户默认权限</p>
<p>acl setuser user1</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715936.jpg" alt="img" loading="lazy"></p>
<p>在上面的示例中，我根本没有指定任何规则。如果用户不存在，这将使用just created的默认属性来创建用户。如果用户已经存在，则上面的命令将不执行任何操作。</p>
<p>（3）设置有用户名、密码、ACL权限、并启用的用户</p>
<p>acl setuser user2 on &gt;password ~cached:* +get</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715147.jpg" alt="img" loading="lazy"></p>
<p>(4)切换用户，验证权限</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715933.jpg" alt="img" loading="lazy"></p>
<h2 id="_17-2-io多线程" tabindex="-1"><a class="header-anchor" href="#_17-2-io多线程" aria-hidden="true">#</a> 17.2 IO多线程</h2>
<h3 id="_17-2-1-简介" tabindex="-1"><a class="header-anchor" href="#_17-2-1-简介" aria-hidden="true">#</a> 17.2.1 简介</h3>
<p>Redis6终于支撑多线程了，告别单线程了吗？</p>
<p>IO多线程其实指 客户端交互部分 的 网络IO 交互处理模块 多线程 ，而非 执行命令多线程 。Redis6执行命令依然是单线程。</p>
<h3 id="_17-2-2-原理架构" tabindex="-1"><a class="header-anchor" href="#_17-2-2-原理架构" aria-hidden="true">#</a> 17.2.2 原理架构</h3>
<p>Redis 6 加入多线程,但跟 Memcached 这种从 IO处理到数据访问多线程的实现模式有些差异。Redis 的多线程部分只是用来处理网络数据的读写和协议解析，执行命令仍然是单线程。之所以这么设计是不想因为多线程而变得复杂，需要去控制 key、lua、事务，LPUSH/LPOP 等等的并发问题。整体的设计大体如下:</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715056.jpg" alt="img" loading="lazy"></p>
<p>另外，多线程IO默认也是不开启的，需要再配置文件中配置</p>
<p>io-threads-do-reads  yes</p>
<p>io-threads 4</p>
<h2 id="_17-3-工具支持-cluster" tabindex="-1"><a class="header-anchor" href="#_17-3-工具支持-cluster" aria-hidden="true">#</a> 17.3 工具支持 Cluster</h2>
<p>之前老版Redis想要搭集群需要单独安装ruby环境，Redis 5 将 redis-trib.rb 的功能集成到 redis-cli 。另外官方 redis-benchmark 工具开始支持 cluster 模式了，通过多线程的方式对多个分片进行压测。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221715157.jpg" alt="img" loading="lazy"></p>
<h2 id="_17-4-redis新功能持续关注" tabindex="-1"><a class="header-anchor" href="#_17-4-redis新功能持续关注" aria-hidden="true">#</a> 17.4 Redis新功能持续关注</h2>
<p>Redis6新功能还有：</p>
<p>1、RESP3新的 Redis 通信协议：优化服务端与客户端之间通信</p>
<p>2、Client side caching客户端缓存：基于 RESP3 协议实现的客户端缓存功能。为了进一步提升缓存的性能，将客户端经常访问的数据cache到客户端。减少TCP网络交互。</p>
<p>3、Proxy集群代理模式：Proxy 功能，让 Cluster 拥有像单实例一样的接入方式，降低大家使用cluster的门槛。不过需要注意的是代理不改变 Cluster 的功能限制，不支持的命令还是不会支持，比如跨 slot 的多Key操作。</p>
<p>4、Modules API</p>
<p>Redis 6中模块API开发进展非常大，因为Redis Labs为了开发复杂的功能，从一开始就用上Redis模块。Redis可以变成一个框架，利用Modules来构建不同系统，而不需要从头开始写然后还要BSD许可。Redis一开始就是一个向编写各种系统开放的平台。</p>
</div></template>


