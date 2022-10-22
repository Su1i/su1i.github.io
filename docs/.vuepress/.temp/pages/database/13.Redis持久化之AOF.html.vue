<template><div><h1 id="_13-redis持久化之aof" tabindex="-1"><a class="header-anchor" href="#_13-redis持久化之aof" aria-hidden="true">#</a> 13.Redis持久化之AOF</h1>
<h2 id="_13-1-aof-append-only-file" tabindex="-1"><a class="header-anchor" href="#_13-1-aof-append-only-file" aria-hidden="true">#</a> 13.1 AOF（Append Only File）</h2>
<h3 id="_13-1-1-是什么" tabindex="-1"><a class="header-anchor" href="#_13-1-1-是什么" aria-hidden="true">#</a> 13.1.1 是什么</h3>
<p>以日志的形式来记录每个写操作（增量保存），将Redis执行过的所有写指令记录下来(读操作不记录)， 只许追加文件但不可以改写文件，redis启动之初会读取该文件重新构建数据，换言之，redis 重启的话就根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作</p>
<h3 id="_13-1-2-aof持久化流程" tabindex="-1"><a class="header-anchor" href="#_13-1-2-aof持久化流程" aria-hidden="true">#</a> 13.1.2 AOF持久化流程</h3>
<p>（1）客户端的请求写命令会被append追加到AOF缓冲区内；</p>
<p>（2）AOF缓冲区根据AOF持久化策略[always,everysec,no]将操作sync同步到磁盘的AOF文件中；</p>
<p>（3）AOF文件大小超过重写策略或手动重写时，会对AOF文件rewrite重写，压缩AOF文件容量；</p>
<p>（4）Redis服务重启时，会重新load加载AOF文件中的写操作达到数据恢复的目的；</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221449478.jpg" alt="img" loading="lazy"></p>
<h3 id="_13-1-3-aof默认不开启" tabindex="-1"><a class="header-anchor" href="#_13-1-3-aof默认不开启" aria-hidden="true">#</a> 13.1.3 AOF默认不开启</h3>
<p>可以在redis.conf中配置文件名称，默认为 appendonly.aof</p>
<p>AOF文件的保存路径，同RDB的路径一致。</p>
<h3 id="_13-1-4-aof和rdb同时开启-redis听谁的" tabindex="-1"><a class="header-anchor" href="#_13-1-4-aof和rdb同时开启-redis听谁的" aria-hidden="true">#</a> 13.1.4 AOF和RDB同时开启，redis听谁的？</h3>
<p>AOF和RDB同时开启，系统默认取AOF的数据（数据不会存在丢失）</p>
<h3 id="_13-1-5-aof启动-修复-恢复" tabindex="-1"><a class="header-anchor" href="#_13-1-5-aof启动-修复-恢复" aria-hidden="true">#</a> 13.1.5 AOF启动/修复/恢复</h3>
<ul>
<li>
<p>AOF的备份机制和性能虽然和RDB不同, 但是备份和恢复的操作同RDB一样，都是拷贝备份文件，需要恢复时再拷贝到Redis工作目录下，启动系统即加载。</p>
</li>
<li>
<p>正常恢复</p>
<ul>
<li>
<p>修改默认的appendonly no，改为yes</p>
</li>
<li>
<p>将有数据的aof文件复制一份保存到对应目录(查看目录：config get dir)</p>
</li>
<li>
<p>恢复：重启redis然后重新加载</p>
</li>
</ul>
</li>
<li>
<p>异常恢复</p>
<ul>
<li>
<p>修改默认的appendonly no，改为yes</p>
</li>
<li>
<p>如遇到AOF文件损坏，通过/usr/local/bin/redis-check-aof--fix appendonly.aof进行恢复</p>
</li>
<li>
<p>备份被写坏的AOF文件</p>
</li>
<li>
<p>恢复：重启redis，然后重新加载</p>
</li>
</ul>
</li>
</ul>
<h3 id="_13-1-6-aof同步频率设置" tabindex="-1"><a class="header-anchor" href="#_13-1-6-aof同步频率设置" aria-hidden="true">#</a> 13.1.6 AOF同步频率设置</h3>
<p>appendfsync always</p>
<p>始终同步，每次Redis的写入都会立刻记入日志；性能较差但数据完整性比较好</p>
<p>appendfsync everysec</p>
<p>每秒同步，每秒记入日志一次，如果宕机，本秒的数据可能丢失。</p>
<p>appendfsync no</p>
<p>redis不主动进行同步，把同步时机交给操作系统。</p>
<h3 id="_13-1-7-rewrite压缩" tabindex="-1"><a class="header-anchor" href="#_13-1-7-rewrite压缩" aria-hidden="true">#</a> 13.1.7 Rewrite压缩</h3>
<p>1、是什么：</p>
<p>AOF采用文件追加方式，文件会越来越大为避免出现此种情况，新增了重写机制, 当AOF文件的大小超过所设定的阈值时，Redis就会启动AOF文件的内容压缩， 只保留可以恢复数据的最小指令集.可以使用命令bgrewriteaof</p>
<p>2、重写原理，如何实现重写</p>
<p>AOF文件持续增长而过大时，会fork出一条新进程来将文件重写(也是先写临时文件最后再rename)，redis4.0版本后的重写，是指上就是把rdb 的快照，以二级制的形式附在新的aof头部，作为已有的历史数据，替换掉原来的流水账操作。</p>
<p>no-appendfsync-on-rewrite：</p>
<p>如果 no-appendfsync-on-rewrite=yes ,不写入aof文件只写入缓存，用户请求不会阻塞，但是在这段时间如果宕机会丢失这段时间的缓存数据。（降低数据安全性，提高性能）</p>
<p>如果 no-appendfsync-on-rewrite=no,  还是会把数据往磁盘里刷，但是遇到重写操作，可能会发生阻塞。（数据安全，但是性能降低）</p>
<p>触发机制，何时重写</p>
<p>Redis会记录上次重写时的AOF大小，默认配置是当AOF文件大小是上次rewrite后大小的一倍且文件大于64M时触发</p>
<p>重写虽然可以节约大量磁盘空间，减少恢复时间。但是每次重写还是有一定的负担的，因此设定Redis要满足一定条件才会进行重写。</p>
<p>auto-aof-rewrite-percentage：设置重写的基准值，文件达到100%时开始重写（文件是原来重写后文件的2倍时触发）</p>
<p>auto-aof-rewrite-min-size：设置重写的基准值，最小文件64MB。达到这个值开始重写。</p>
<p>例如：文件达到70MB开始重写，降到50MB，下次什么时候开始重写？100MB</p>
<p>系统载入时或者上次重写完毕时，Redis会记录此时AOF大小，设为base_size,</p>
<p>如果Redis的AOF当前大小&gt;= base_size +base_size*100% (默认)且当前大小&gt;=64mb(默认)的情况下，Redis会对AOF进行重写。</p>
<p>3、重写流程</p>
<p>（1）bgrewriteaof触发重写，判断是否当前有bgsave或bgrewriteaof在运行，如果有，则等待该命令结束后再继续执行。</p>
<p>（2）主进程fork出子进程执行重写操作，保证主进程不会阻塞。</p>
<p>（3）子进程遍历redis内存中数据到临时文件，客户端的写请求同时写入aof_buf缓冲区和aof_rewrite_buf重写缓冲区保证原AOF文件完整以及新AOF文件生成期间的新的数据修改动作不会丢失。</p>
<p>（4）1).子进程写完新的AOF文件后，向主进程发信号，父进程更新统计信息。2).主进程把aof_rewrite_buf中的数据写入到新的AOF文件。</p>
<p>（5）使用新的AOF文件覆盖旧的AOF文件，完成AOF重写。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221449573.jpg" alt="img" loading="lazy"></p>
<h3 id="_13-1-8-优势" tabindex="-1"><a class="header-anchor" href="#_13-1-8-优势" aria-hidden="true">#</a> 13.1.8 优势</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221449681.png" alt="img" loading="lazy"></p>
<ul>
<li>
<p>备份机制更稳健，丢失数据概率更低。</p>
</li>
<li>
<p>可读的日志文本，通过操作AOF稳健，可以处理误操作。</p>
</li>
</ul>
<h3 id="_13-1-9-劣势" tabindex="-1"><a class="header-anchor" href="#_13-1-9-劣势" aria-hidden="true">#</a> 13.1.9 劣势</h3>
<ul>
<li>
<p>比起RDB占用更多的磁盘空间。</p>
</li>
<li>
<p>恢复备份速度要慢。</p>
</li>
<li>
<p>每次读写都同步的话，有一定的性能压力。</p>
</li>
<li>
<p>存在个别Bug，造成恢复不能。</p>
</li>
</ul>
<h3 id="_13-1-10-小总结" tabindex="-1"><a class="header-anchor" href="#_13-1-10-小总结" aria-hidden="true">#</a> 13.1.10 小总结</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221449991.png" alt="img" loading="lazy"></p>
<h2 id="_13-2-总结-which-one" tabindex="-1"><a class="header-anchor" href="#_13-2-总结-which-one" aria-hidden="true">#</a> 13.2 总结(Which one)</h2>
<h3 id="_13-2-1-用哪个好" tabindex="-1"><a class="header-anchor" href="#_13-2-1-用哪个好" aria-hidden="true">#</a> 13.2.1 用哪个好</h3>
<p>官方推荐两个都启用。</p>
<p>如果对数据不敏感，可以选单独用RDB。</p>
<p>不建议单独用 AOF，因为可能会出现Bug。</p>
<p>如果只是做纯内存缓存，可以都不用。</p>
<h3 id="_13-2-2-官网建议" tabindex="-1"><a class="header-anchor" href="#_13-2-2-官网建议" aria-hidden="true">#</a> 13.2.2 官网建议</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210221449173.png" alt="img" loading="lazy"></p>
<ul>
<li>
<p>RDB持久化方式能够在指定的时间间隔能对你的数据进行快照存储</p>
</li>
<li>
<p>AOF持久化方式记录每次对服务器写的操作,当服务器重启的时候会重新执行这些命令来恢复原始的数据,AOF命令以redis协议追加保存每次写的操作到文件末尾.</p>
</li>
<li>
<p>Redis还能对AOF文件进行后台重写,使得AOF文件的体积不至于过大</p>
</li>
<li>
<p>只做缓存：如果你只希望你的数据在服务器运行的时候存在,你也可以不使用任何持久化方式.</p>
</li>
<li>
<p>同时开启两种持久化方式</p>
</li>
<li>
<p>在这种情况下,当redis重启的时候会优先载入AOF文件来恢复原始的数据, 因为在通常情况下AOF文件保存的数据集要比RDB文件保存的数据集要完整.</p>
</li>
<li>
<p>RDB的数据不实时，同时使用两者时服务器重启也只会找AOF文件。那要不要只使用AOF呢？</p>
</li>
<li>
<p>建议不要，因为RDB更适合用于备份数据库(AOF在不断变化不好备份)， 快速重启，而且不会有AOF可能潜在的bug，留着作为一个万一的手段。</p>
</li>
<li>
<p>性能建议</p>
</li>
</ul>
<p>因为RDB文件只用作后备用途，建议只在Slave上持久化RDB文件，而且只要15分钟备份一次就够了，只保留save 900 1这条规则。 如果使用AOF，好处是在最恶劣情况下也只会丢失不超过两秒数据，启动脚本较简单只load自己的AOF文件就可以了。代价,一是带来了持续的IO，二是AOF rewrite的最后将rewrite过程中产生的新数据写到新文件造成的阻塞几乎是不可避免的。只要硬盘许可，应该尽量减少AOF rewrite的频率，AOF重写的基础大小默认值64M太小了，可以设到5G以上。默认超过原大小100%大小时重写可以改到适当的数值。</p>
</div></template>


