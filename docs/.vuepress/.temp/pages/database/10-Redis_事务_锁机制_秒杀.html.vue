<template><div><h1 id="_10-redis-事务-锁机制-秒杀" tabindex="-1"><a class="header-anchor" href="#_10-redis-事务-锁机制-秒杀" aria-hidden="true">#</a> 10.Redis_事务_锁机制_秒杀</h1>
<h2 id="_10-1-redis的事务定义" tabindex="-1"><a class="header-anchor" href="#_10-1-redis的事务定义" aria-hidden="true">#</a> 10.1 Redis的事务定义</h2>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036537.png" alt="img" loading="lazy"></p>
<p>Redis事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。</p>
<p>Redis事务的主要作用就是串联多个命令防止别的命令插队。</p>
<h2 id="_10-2-multi、exec、discard" tabindex="-1"><a class="header-anchor" href="#_10-2-multi、exec、discard" aria-hidden="true">#</a> 10.2 Multi、Exec、discard</h2>
<p>从输入Multi命令开始，输入的命令都会依次进入命令队列中，但不会执行，直到输入Exec后，Redis会将之前的命令队列中的命令依次执行。</p>
<p>组队的过程中可以通过discard来放弃组队。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036422.jpg" alt="img" loading="lazy"></p>
<p><em>案例：</em></p>
<table>
<thead>
<tr>
<th><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036646.png" alt="img" loading="lazy"> 组队成功，提交成功</th>
</tr>
</thead>
<tbody>
<tr>
<td><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036815.png" alt="img" loading="lazy"> 组队阶段报错，提交失败</td>
</tr>
<tr>
<td><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036908.png" alt="img" loading="lazy"> 组队成功，提交有成功有失败情况</td>
</tr>
</tbody>
</table>
<h2 id="_10-3-事务的错误处理" tabindex="-1"><a class="header-anchor" href="#_10-3-事务的错误处理" aria-hidden="true">#</a> 10.3 事务的错误处理</h2>
<p>组队中某个命令出现了报告错误，执行时整个的所有队列都会被取消。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036001.png" alt="img" loading="lazy"></p>
<p>如果执行阶段某个命令报出了错误，则只有报错的命令不会被执行，而其他的命令都会执行，不会回滚。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036969.png" alt="img" loading="lazy"></p>
<h2 id="_10-4-为什么要做成事务" tabindex="-1"><a class="header-anchor" href="#_10-4-为什么要做成事务" aria-hidden="true">#</a> 10.4 为什么要做成事务</h2>
<p>想想一个场景：有很多人有你的账户,同时去参加双十一抢购</p>
<h2 id="_10-5-事务冲突的问题" tabindex="-1"><a class="header-anchor" href="#_10-5-事务冲突的问题" aria-hidden="true">#</a> 10.5 事务冲突的问题</h2>
<h3 id="_10-5-1-例子" tabindex="-1"><a class="header-anchor" href="#_10-5-1-例子" aria-hidden="true">#</a> 10.5.1 例子</h3>
<p>一个请求想给金额减8000</p>
<p>一个请求想给金额减5000</p>
<p>一个请求想给金额减1000</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036328.png" alt="img" loading="lazy"></p>
<h3 id="_10-5-2-悲观锁" tabindex="-1"><a class="header-anchor" href="#_10-5-2-悲观锁" aria-hidden="true">#</a> 10.5.2 悲观锁</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036613.png" alt="img" loading="lazy"></p>
<p><em>悲观锁(Pessimistic Lock)</em>, 顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会block直到它拿到锁。<em>传统的关系型数据库里边就用到了很多这种锁机制</em>，比如<em>行锁</em>，<em>表锁</em>等，<em>读锁</em>，<em>写锁</em>等，都是在做操作之前先上锁。</p>
<h3 id="_10-5-3-乐观锁" tabindex="-1"><a class="header-anchor" href="#_10-5-3-乐观锁" aria-hidden="true">#</a> 10.5.3 乐观锁</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036172.png" alt="img" loading="lazy"></p>
<p><em>乐观锁(Optimistic Lock)</em>,顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。<em>乐观锁适用于多读的应用类型，这样可以提高吞吐量</em>。Redis就是利用这种check-and-set机制实现事务的。</p>
<h3 id="_10-5-4-watch-key-key" tabindex="-1"><a class="header-anchor" href="#_10-5-4-watch-key-key" aria-hidden="true">#</a> 10.5.4 WATCH key [key ...]</h3>
<p>在执行multi之前，先执行watch key1 [key2],可以监视一个(或多个) key ，如果在事务<em>执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。</em></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212036652.png" alt="img" loading="lazy"></p>
<h3 id="_10-5-5-unwatch" tabindex="-1"><a class="header-anchor" href="#_10-5-5-unwatch" aria-hidden="true">#</a> 10.5.5 unwatch</h3>
<p>取消 WATCH 命令对所有 key 的监视。</p>
<p>如果在执行 WATCH 命令之后，EXEC 命令或DISCARD 命令先被执行了的话，那么就不需要再执行UNWATCH 了。</p>
<p><a href="http://doc.redisfans.com/transaction/exec.html" target="_blank" rel="noopener noreferrer">http://doc.redisfans.com/transaction/exec.html<ExternalLinkIcon/></a></p>
<h2 id="_10-6-redis事务三特性" tabindex="-1"><a class="header-anchor" href="#_10-6-redis事务三特性" aria-hidden="true">#</a> 10.6 Redis事务三特性</h2>
<ul>
<li>
<p>单独的隔离操作</p>
<ul>
<li>事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。</li>
</ul>
</li>
<li>
<p>没有隔离级别的概念</p>
<ul>
<li>队列中的命令没有提交之前都不会实际被执行，因为事务提交前任何指令都不会被实际执行</li>
</ul>
</li>
<li>
<p>不保证原子性</p>
<ul>
<li>事务中如果有一条命令执行失败，其后的命令仍然会被执行，没有回滚</li>
</ul>
</li>
</ul>
</div></template>


