<template><div><h1 id="_05-redis的发布和订阅" tabindex="-1"><a class="header-anchor" href="#_05-redis的发布和订阅" aria-hidden="true">#</a> 05.Redis的发布和订阅</h1>
<h2 id="_5-1-什么是发布和订阅" tabindex="-1"><a class="header-anchor" href="#_5-1-什么是发布和订阅" aria-hidden="true">#</a> 5.1 什么是发布和订阅</h2>
<p>Redis 发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。</p>
<p>Redis 客户端可以订阅任意数量的频道。</p>
<h2 id="_5-2-redis的发布和订阅" tabindex="-1"><a class="header-anchor" href="#_5-2-redis的发布和订阅" aria-hidden="true">#</a> 5.2 Redis的发布和订阅</h2>
<p>1、客户端可以订阅频道如下图</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202128030.jpg" alt="img" loading="lazy"></p>
<p>2、当给这个频道发布消息后，消息就会发送给订阅的客户端</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202128145.jpg" alt="img" loading="lazy"></p>
<h2 id="_5-3-发布订阅命令行实现" tabindex="-1"><a class="header-anchor" href="#_5-3-发布订阅命令行实现" aria-hidden="true">#</a> 5.3 发布订阅命令行实现</h2>
<p>1、 打开一个客户端订阅channel1</p>
<p>SUBSCRIBE channel1</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202128258.jpg" alt="img" loading="lazy"></p>
<p>2、打开另一个客户端，给channel1发布消息hello</p>
<p>publish channel1 hello</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202128350.jpg" alt="img" loading="lazy"></p>
<p>返回的1是订阅者数量</p>
<p>3、打开第一个客户端可以看到发送的消息</p>
<p><img src="https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210202128606.jpg" alt="img" loading="lazy"></p>
<p>注：发布的消息没有持久化，如果在订阅的客户端收不到hello，只能收到订阅后发布的消息</p>
</div></template>


