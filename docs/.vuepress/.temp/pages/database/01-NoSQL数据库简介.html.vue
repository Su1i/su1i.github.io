<template><div><h1 id="_1-nosql数据库简介" tabindex="-1"><a class="header-anchor" href="#_1-nosql数据库简介" aria-hidden="true">#</a> 1. NoSQL数据库简介</h1>
<h2 id="_1-1-技术发展" tabindex="-1"><a class="header-anchor" href="#_1-1-技术发展" aria-hidden="true">#</a> 1.1 技术发展</h2>
<h3 id="_1-1-1-技术的分类" tabindex="-1"><a class="header-anchor" href="#_1-1-1-技术的分类" aria-hidden="true">#</a> 1.1.1 技术的分类</h3>
<ol>
<li>
<p>解决功能性的问题：Java、Jsp、RDBMS、Tomcat、HTML、Linux、JDBC、SVN</p>
</li>
<li>
<p>解决扩展性的问题：Struts、Spring、SpringMVC、Hibernate、Mybatis</p>
</li>
<li>
<p>解决性能的问题：NoSQL、Java线程、Hadoop、Nginx、MQ、ElasticSearch</p>
</li>
</ol>
<h3 id="_1-1-2-web1-0时代" tabindex="-1"><a class="header-anchor" href="#_1-1-2-web1-0时代" aria-hidden="true">#</a> 1.1.2 Web1.0时代</h3>
<p>Web1.0的时代，数据访问量很有限，用一夫当关的高性能的单点服务器可以解决大部分问题。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846422.jpg" alt="img" loading="lazy"></p>
<h3 id="_1-1-3-web2-0时代" tabindex="-1"><a class="header-anchor" href="#_1-1-3-web2-0时代" aria-hidden="true">#</a> 1.1.3 Web2.0时代</h3>
<p>随着Web2.0的时代的到来，用户访问量大幅度提升，同时产生了大量的用户数据。加上后来的智能移动设备的普及，所有的互联网平台都面临了巨大的性能挑战。</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846931.jpg" alt="img" loading="lazy"></p>
<h3 id="_1-1-4-解决cpu及内存压力" tabindex="-1"><a class="header-anchor" href="#_1-1-4-解决cpu及内存压力" aria-hidden="true">#</a> 1.1.4 解决CPU及内存压力</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846300.png" alt="img" loading="lazy"></p>
<h3 id="_1-1-5-解决io压力" tabindex="-1"><a class="header-anchor" href="#_1-1-5-解决io压力" aria-hidden="true">#</a> 1.1.5 解决IO压力</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846498.png" alt="img" loading="lazy"></p>
<h2 id="_1-2-nosql数据库" tabindex="-1"><a class="header-anchor" href="#_1-2-nosql数据库" aria-hidden="true">#</a> 1.2 NoSQL数据库</h2>
<h3 id="_1-2-1-nosql数据库概述" tabindex="-1"><a class="header-anchor" href="#_1-2-1-nosql数据库概述" aria-hidden="true">#</a> 1.2.1 NoSQL数据库概述</h3>
<p>NoSQL(NoSQL = Not Only SQL)，意即“不仅仅是SQL”，泛指非关系型的数据库。</p>
<p>NoSQL 不依赖业务逻辑方式存储，而以简单的key-value模式存储。因此大大的增加了数据库的扩展能力。</p>
<ul>
<li>
<p>不遵循SQL标准。</p>
</li>
<li>
<p>不支持ACID。</p>
</li>
<li>
<p>远超于SQL的性能。</p>
</li>
</ul>
<h3 id="_1-2-2-nosql适用场景" tabindex="-1"><a class="header-anchor" href="#_1-2-2-nosql适用场景" aria-hidden="true">#</a> 1.2.2 NoSQL适用场景</h3>
<ul>
<li>
<p>对数据高并发的读写</p>
</li>
<li>
<p>海量数据的读写</p>
</li>
<li>
<p>对数据高可扩展性的</p>
</li>
</ul>
<h3 id="_1-2-3-nosql不适用场景" tabindex="-1"><a class="header-anchor" href="#_1-2-3-nosql不适用场景" aria-hidden="true">#</a> 1.2.3 NoSQL不适用场景</h3>
<ul>
<li>
<p>需要事务支持</p>
</li>
<li>
<p>基于sql的结构化查询存储，处理复杂的关系,需要即席查询。</p>
</li>
<li>
<p>（用不着sql的和用了sql也不行的情况，请考虑用NoSql）</p>
</li>
</ul>
<h3 id="_1-2-4-memcache" tabindex="-1"><a class="header-anchor" href="#_1-2-4-memcache" aria-hidden="true">#</a> 1.2.4 Memcache</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846065.png" alt="img" loading="lazy"></p>
<ul>
<li>很早出现的NoSql数据库</li>
<li>数据都在内存中，一般不持久化</li>
<li>支持简单的key-value模式，支持类型单一</li>
<li>一般是作为缓存数据库辅助持久化的数据库
|</li>
</ul>
<h3 id="_1-2-5-redis" tabindex="-1"><a class="header-anchor" href="#_1-2-5-redis" aria-hidden="true">#</a> 1.2.5 Redis</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846855.png" alt="img" loading="lazy"></p>
<ul>
<li>几乎覆盖了Memcached的绝大部分功能</li>
<li>数据都在内存中，支持持久化，主要用作备份恢复</li>
<li>除了支持简单的key-value模式，还支持多种数据结构的存储，比如 list、set、hash、zset等。</li>
<li>一般是作为缓存数据库辅助持久化的数据库
|</li>
</ul>
<h3 id="_1-2-6-mongodb" tabindex="-1"><a class="header-anchor" href="#_1-2-6-mongodb" aria-hidden="true">#</a> 1.2.6 MongoDB</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846495.png" alt="img" loading="lazy"></p>
<ul>
<li>高性能、开源、模式自由(schema  free)的文档型数据库</li>
<li>数据都在内存中， 如果内存不足，把不常用的数据保存到硬盘</li>
<li>虽然是key-value模式，但是对value（尤其是json）提供了丰富的查询功能</li>
<li>支持二进制数据及大型对象</li>
<li>可以根据数据的特点替代RDBMS，成为独立的数据库。或者配合RDBMS，存储特定的数据。
|</li>
</ul>
<h2 id="_1-3-行式存储数据库-大数据时代" tabindex="-1"><a class="header-anchor" href="#_1-3-行式存储数据库-大数据时代" aria-hidden="true">#</a> 1.3 行式存储数据库（大数据时代）</h2>
<h3 id="_1-3-1-行式数据库" tabindex="-1"><a class="header-anchor" href="#_1-3-1-行式数据库" aria-hidden="true">#</a> 1.3.1 行式数据库</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846452.png" alt="img" loading="lazy"></p>
<h3 id="_1-3-2-列式数据库" tabindex="-1"><a class="header-anchor" href="#_1-3-2-列式数据库" aria-hidden="true">#</a> 1.3.2 列式数据库</h3>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846281.png" alt="img" loading="lazy"></p>
<h4 id="_1-3-2-1-hbase" tabindex="-1"><a class="header-anchor" href="#_1-3-2-1-hbase" aria-hidden="true">#</a> 1.3.2.1 Hbase</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846677.png" alt="img" loading="lazy"></p>
<p>HBase是Hadoop项目中的数据库。它用于需要对大量的数据进行随机、实时的读写操作的场景中。</p>
<p>HBase的目标就是处理数据量非常庞大的表，可以用普通的计算机处理超过10亿行数据，还可处理有数百万列元素的数据表。</p>
<h4 id="_1-3-2-2-cassandra-kəˈsændrə" tabindex="-1"><a class="header-anchor" href="#_1-3-2-2-cassandra-kəˈsændrə" aria-hidden="true">#</a> 1.3.2.2 Cassandra[kəˈsændrə]</h4>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171846252.png" alt="img" loading="lazy"></p>
<p>Apache Cassandra是一款免费的开源NoSQL数据库，其设计目的在于管理由大量商用服务器构建起来的庞大集群上的****海量数据集(数据量通常达到*<strong><strong><strong>*PB*</strong></strong></strong>*级别****<em><strong>*)*</strong></em>。在众多显著特性当中，Cassandra最为卓越的长处是对写入及读取操作进行规模调整，而且其不强调主集群的设计思路能够以相对直观的方式简化各集群的创建与扩展流程。</p>
<p>计算机存储单位 计算机存储单位一般用B，KB，MB，GB，TB，EB，ZB，YB，BB来表示，它们之间的关系是：位 bit (比特)(Binary Digits)：存放一位二进制数，即 0 或 1，最小的存储单位。字节 byte：8个二进制位为一个字节(B)，最常用的单位。1KB (Kilobyte 千字节)=1024B，1MB (Megabyte 兆字节 简称“兆”)=1024KB，1GB (Gigabyte 吉字节 又称“千兆”)=1024MB，1TB (Trillionbyte 万亿字节 太字节)=1024GB，其中1024=2^10 ( 2 的10次方)，1PB（Petabyte 千万亿字节 拍字节）=1024TB，1EB（Exabyte 百亿亿字节 艾字节）=1024PB，1ZB (Zettabyte 十万亿亿字节 泽字节)= 1024 EB,1YB (Jottabyte 一亿亿亿字节 尧字节)= 1024 ZB,1BB (Brontobyte 一千亿亿亿字节)= 1024 YB.注：“兆”为百万级数量单位。</p>
<h2 id="_1-4-图关系型数据库" tabindex="-1"><a class="header-anchor" href="#_1-4-图关系型数据库" aria-hidden="true">#</a> 1.4 图关系型数据库</h2>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171847870.png" alt="img" loading="lazy"></p>
<p>主要应用：社会关系，公共交通网络，地图及网络拓谱(n*(n-1)/2)</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171847322.png" alt="img" loading="lazy"></p>
<h2 id="_1-5-db-engines数据库排名" tabindex="-1"><a class="header-anchor" href="#_1-5-db-engines数据库排名" aria-hidden="true">#</a> 1.5 DB-Engines数据库排名</h2>
<p><a href="http://db-engines.com/en/ranking" target="_blank" rel="noopener noreferrer">http://db-engines.com/en/ranking<ExternalLinkIcon/></a></p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210171847692.jpg" alt="img" loading="lazy"></p>
</div></template>


