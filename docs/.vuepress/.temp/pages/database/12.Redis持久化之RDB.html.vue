<template><div><h1 id="_12-redis持久化之rdb" tabindex="-1"><a class="header-anchor" href="#_12-redis持久化之rdb" aria-hidden="true">#</a> 12.Redis持久化之RDB</h1>
<h2 id="_12-1-总体介绍" tabindex="-1"><a class="header-anchor" href="#_12-1-总体介绍" aria-hidden="true">#</a> 12.1 总体介绍</h2>
<p>官网介绍：<a href="http://www.redis.io" target="_blank" rel="noopener noreferrer">http://www.redis.io<ExternalLinkIcon/></a></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115958.png" alt="img" loading="lazy"></p>
<p>Redis 提供了2个不同形式的持久化方式。</p>
<ul>
<li>
<p>RDB（Redis DataBase）</p>
</li>
<li>
<p>AOF（Append Of File）</p>
</li>
</ul>
<h2 id="_12-2-rdb-redis-database" tabindex="-1"><a class="header-anchor" href="#_12-2-rdb-redis-database" aria-hidden="true">#</a> 12.2 RDB（Redis DataBase）</h2>
<h3 id="_12-2-1-官网介绍" tabindex="-1"><a class="header-anchor" href="#_12-2-1-官网介绍" aria-hidden="true">#</a> 12.2.1 官网介绍</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115168.png" alt="img" loading="lazy"></p>
<h3 id="_12-2-2-是什么" tabindex="-1"><a class="header-anchor" href="#_12-2-2-是什么" aria-hidden="true">#</a> 12.2.2 是什么</h3>
<p>在指定的时间间隔内将内存中的数据集快照写入磁盘， 也就是行话讲的Snapshot快照，它恢复时是将快照文件直接读到内存里</p>
<h3 id="_12-2-3-备份是如何执行的" tabindex="-1"><a class="header-anchor" href="#_12-2-3-备份是如何执行的" aria-hidden="true">#</a> 12.2.3 备份是如何执行的</h3>
<p>Redis会单独创建（fork）一个子进程来进行持久化，会先将数据写入到 一个临时文件中，待持久化过程都结束了，再用这个临时文件替换上次持久化好的文件。 整个过程中，主进程是不进行任何IO操作的，这就确保了极高的性能 如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那RDB方式要比AOF方式更加的高效。<em>RDB的缺点是最后一次持久化后的数据可能丢失</em>。</p>
<h3 id="_12-2-4-fork" tabindex="-1"><a class="header-anchor" href="#_12-2-4-fork" aria-hidden="true">#</a> 12.2.4 Fork</h3>
<ul>
<li>
<p>Fork的作用是复制一个与当前进程一样的进程。新进程的所有数据（变量、环境变量、程序计数器等） 数值都和原进程一致，但是是一个全新的进程，并作为原进程的子进程</p>
</li>
<li>
<p>在Linux程序中，fork()会产生一个和父进程完全相同的子进程，但子进程在此后多会exec系统调用，出于效率考虑，Linux中引入了“写时复制技术”</p>
</li>
<li>
<p>一般情况父进程和子进程会共用同一段物理内存，只有进程空间的各段的内容要发生变化时，才会将父进程的内容复制一份给子进程。</p>
</li>
</ul>
<h3 id="_12-2-5-rdb持久化流程" tabindex="-1"><a class="header-anchor" href="#_12-2-5-rdb持久化流程" aria-hidden="true">#</a> 12.2.5 RDB持久化流程</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115484.jpg" alt="img" loading="lazy"></p>
<h3 id="_12-2-6-dump-rdb文件" tabindex="-1"><a class="header-anchor" href="#_12-2-6-dump-rdb文件" aria-hidden="true">#</a> 12.2.6 dump.rdb文件</h3>
<p>在redis.conf中配置文件名称，默认为dump.rdb</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115402.jpg" alt="img" loading="lazy"></p>
<h3 id="_12-2-7-配置位置" tabindex="-1"><a class="header-anchor" href="#_12-2-7-配置位置" aria-hidden="true">#</a> 12.2.7 配置位置</h3>
<p>rdb文件的保存路径，也可以修改。默认为Redis启动时命令行所在的目录下</p>
<p>dir &quot;/myredis/&quot;</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115587.jpg" alt="img" loading="lazy"></p>
<h3 id="_12-2-8-如何触发rdb快照-保持策略" tabindex="-1"><a class="header-anchor" href="#_12-2-8-如何触发rdb快照-保持策略" aria-hidden="true">#</a> 12.2.8 如何触发RDB快照；保持策略</h3>
<h4 id="_12-2-8-1-配置文件中默认的快照配置" tabindex="-1"><a class="header-anchor" href="#_12-2-8-1-配置文件中默认的快照配置" aria-hidden="true">#</a> 12.2.8.1 配置文件中默认的快照配置</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115740.jpg" alt="img" loading="lazy"></p>
<h4 id="_12-2-8-2-命令save-vs-bgsave" tabindex="-1"><a class="header-anchor" href="#_12-2-8-2-命令save-vs-bgsave" aria-hidden="true">#</a> 12.2.8.2 命令save VS bgsave</h4>
<p>save ：save时只管保存，其它不管，全部阻塞。手动保存。不建议。</p>
<p>bgsave：Redis会在后台异步进行快照操作， 快照同时还可以响应客户端请求。</p>
<p>可以通过lastsave 命令获取最后一次成功执行快照的时间</p>
<h4 id="_12-2-8-3-flushall命令" tabindex="-1"><a class="header-anchor" href="#_12-2-8-3-flushall命令" aria-hidden="true">#</a> 12.2.8.3 flushall命令</h4>
<p>执行flushall命令，也会产生dump.rdb文件，但里面是空的，无意义</p>
<h4 id="_12-2-8-4-snapshotting快照" tabindex="-1"><a class="header-anchor" href="#_12-2-8-4-snapshotting快照" aria-hidden="true">#</a> 12.2.8.4 SNAPSHOTTING快照</h4>
<h4 id="_12-2-8-5-save" tabindex="-1"><a class="header-anchor" href="#_12-2-8-5-save" aria-hidden="true">#</a> 12.2.8.5 Save</h4>
<p>格式：save 秒钟 写操作次数</p>
<p>RDB是整个内存的压缩过的Snapshot，RDB的数据结构，可以配置复合的快照触发条件，</p>
<p><em>默认是1分钟内改了1万次，或5分钟内改了10次，或15分钟内改了1次。</em></p>
<p>禁用</p>
<p>不设置save指令，或者给save传入空字符串</p>
<h4 id="_12-2-8-6-stop-writes-on-bgsave-error" tabindex="-1"><a class="header-anchor" href="#_12-2-8-6-stop-writes-on-bgsave-error" aria-hidden="true">#</a> 12.2.8.6 stop-writes-on-bgsave-error</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115484.jpg" alt="img" loading="lazy"></p>
<p>当Redis无法写入磁盘的话，直接关掉Redis的写操作。推荐yes.</p>
<h4 id="_12-2-8-7-rdbcompression压缩文件" tabindex="-1"><a class="header-anchor" href="#_12-2-8-7-rdbcompression压缩文件" aria-hidden="true">#</a> 12.2.8.7 rdbcompression压缩文件</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115134.jpg" alt="img" loading="lazy"></p>
<p>对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，redis会采用LZF算法进行压缩。</p>
<p>如果你不想消耗CPU来进行压缩的话，可以设置为关闭此功能。推荐yes.</p>
<h4 id="_12-2-8-8-rdbchecksum检查完整性" tabindex="-1"><a class="header-anchor" href="#_12-2-8-8-rdbchecksum检查完整性" aria-hidden="true">#</a> 12.2.8.8 rdbchecksum检查完整性</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115163.jpg" alt="img" loading="lazy"></p>
<p>在存储快照后，还可以让redis使用CRC64算法来进行数据校验，</p>
<p>但是这样做会增加大约10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能</p>
<p>推荐yes.</p>
<h4 id="_12-2-8-9-rdb的备份" tabindex="-1"><a class="header-anchor" href="#_12-2-8-9-rdb的备份" aria-hidden="true">#</a> 12.2.8.9 rdb的备份</h4>
<p>先通过config get dir  查询rdb文件的目录</p>
<p>将*.rdb的文件拷贝到别的地方</p>
<p>rdb的恢复</p>
<ul>
<li>
<p>关闭Redis</p>
</li>
<li>
<p>先把备份的文件拷贝到工作目录下 cp dump2.rdb dump.rdb</p>
</li>
<li>
<p>启动Redis, 备份数据会直接加载</p>
</li>
</ul>
<h3 id="_12-2-9-优势" tabindex="-1"><a class="header-anchor" href="#_12-2-9-优势" aria-hidden="true">#</a> 12.2.9 优势</h3>
<ul>
<li>
<p>适合大规模的数据恢复</p>
</li>
<li>
<p>对数据完整性和一致性要求不高更适合使用</p>
</li>
<li>
<p>节省磁盘空间</p>
</li>
<li>
<p>恢复速度快</p>
</li>
</ul>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115296.png" alt="img" loading="lazy"></p>
<h3 id="_12-2-10-劣势" tabindex="-1"><a class="header-anchor" href="#_12-2-10-劣势" aria-hidden="true">#</a> 12.2.10 劣势</h3>
<ul>
<li>
<p>Fork的时候，内存中的数据被克隆了一份，大致2倍的膨胀性需要考虑</p>
</li>
<li>
<p>虽然Redis在fork时使用了写时拷贝技术,但是如果数据庞大时还是比较消耗性能。</p>
</li>
<li>
<p>在备份周期在一定间隔时间做一次备份，所以如果Redis意外down掉的话，就会丢失最后一次快照后的所有修改。</p>
</li>
</ul>
<h3 id="_12-2-11-如何停止" tabindex="-1"><a class="header-anchor" href="#_12-2-11-如何停止" aria-hidden="true">#</a> 12.2.11 如何停止</h3>
<p>动态停止RDB：redis-cli config set save &quot;&quot;#save后给空值，表示禁用保存策略</p>
<h3 id="_12-2-12-小总结" tabindex="-1"><a class="header-anchor" href="#_12-2-12-小总结" aria-hidden="true">#</a> 12.2.12 小总结</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212115523.png" alt="img" loading="lazy"></p>
</div></template>


