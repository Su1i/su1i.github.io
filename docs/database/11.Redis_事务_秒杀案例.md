---
title: 11.Redis_事务_秒杀案例
index: true
category:
- database
---
# 11.Redis_事务_秒杀案例

## 11.1 解决计数器和人员记录的事务操作

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048699.png) 

## 11.2 Redis事务--秒杀并发模拟

使用工具ab模拟测试

CentOS6 默认安装

CentOS7需要手动安装

### 11.2.1 联网：
```shell
yum install httpd-tools
```

### 11.2.2 无网络

（1） 进入cd  /run/media/root/CentOS 7 x86_64/Packages（路径跟centos6不同）

（2） 顺序安装

apr-1.4.8-3.el7.x86_64.rpm

apr-util-1.5.2-6.el7.x86_64.rpm

httpd-tools-2.4.6-67.el7.centos.x86_64.rpm  

### 11.2.3 测试及结果

#### 11.2.3.1 通过ab测试

vim postfile 模拟表单提交参数,以&符号结尾;存放当前目录。

内容：prodid=0101&

ab -n 2000 -c 200 -k -p ~/postfile -T application/x-www-form-urlencoded http://192.168.2.115:8081/Seckill/doseckill

 

#### 11.2.3.2 超卖

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048431.png)
![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048539.png)
                                                                                                           

 

## 11.3 超卖问题

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048358.png) 

## 11.4 利用乐观锁淘汰用户，解决超卖问题。

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048178.png) 

```java
//增加乐观锁
jedis.watch(qtkey);

//3.判断库存
        
String qtkeystr = jedis.get(qtkey);
if(qtkeystr==null || "".equals(qtkeystr.trim())) {
    System.out.println("未初始化库存");
    jedis.close();
    return false ;
} 
int qt = Integer.parseInt(qtkeystr);
if(qt<=0) {
    System.err.println("已经秒光");
    jedis.close();
    return false;
} 

                                                                                                                       
```
![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048899.png)

```java
//增加事务
Transaction multi = jedis.multi();
//4.减少库存
jedis.decr(qtkey);
multi.decr(qtkey);
//5.加人
jedis.sadd(usrkey, uid);
multi.sadd(usrkey, uid); 
//执行事务
List<Object> list = multi.exec();
//判断事务提交是否失败
if(list==null || list.size()==0) {
    System.out.println("秒杀失败");
    jedis.close();
    return false;
}
System.err.println("秒杀成功");
jedis.close(); 

```
![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048957.png)

## 11.5 继续增加并发测试

### 11.5.1 连接有限制

ab -n 2000 -c 200 -k -p postfile -T 'application/x-www-form-urlencoded' http://192.168.140.1:8080/seckill/doseckill

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048524.png) 

增加-r参数，-r  Don't exit on socket receive errors.

ab -n 2000 -c 100 -r -p postfile -T 'application/x-www-form-urlencoded' http://192.168.140.1:8080/seckill/doseckill

### 11.5.2 已经秒光，可是还有库存

ab -n 2000 -c 100 -p postfile -T 'application/x-www-form-urlencoded' http://192.168.137.1:8080/seckill/doseckill

已经秒光，可是还有库存。原因，就是乐观锁导致很多请求都失败。先点的没秒到，后点的可能秒到了。

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048840.png) 

### 11.5.3 连接超时，通过连接池解决

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048372.png) 

### 11.5.4 连接池

节省每次连接redis服务带来的消耗，把连接好的实例反复利用。

通过参数管理连接的行为

代码见项目中

- 链接池参数

  - MaxTotal：控制一个pool可分配多少个jedis实例，通过pool.getResource()来获取；如果赋值为-1，则表示不限制；如果pool已经分配了MaxTotal个jedis实例，则此时pool的状态为exhausted。

  - maxIdle：控制一个pool最多有多少个状态为idle(空闲)的jedis实例；

  - MaxWaitMillis：表示当borrow一个jedis实例时，最大的等待毫秒数，如果超过等待时间，则直接抛JedisConnectionException；

  - testOnBorrow：获得一个jedis实例的时候是否检查连接可用性（ping()）；如果为true，则得到的jedis实例均是可用的；

## 11.6 解决库存遗留问题

### 11.6.1 LUA脚本

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048726.png) 

Lua 是一个小巧的[脚本语言](http://baike.baidu.com/item/脚本语言)，Lua脚本可以很容易的被C/C++ 代码调用，也可以反过来调用C/C++的函数，Lua并没有提供强大的库，一个完整的Lua解释器不过200k，所以Lua不适合作为开发独立应用程序的语言，而是作为嵌入式脚本语言。

很多应用程序、游戏使用LUA作为自己的嵌入式脚本语言，以此来实现可配置性、可扩展性。

这其中包括魔兽争霸地图、魔兽世界、博德之门、愤怒的小鸟等众多游戏插件或外挂。

https://www.w3cschool.cn/lua/

### 11.6.2 LUA脚本在Redis中的优势

将复杂的或者多步的redis操作，写为一个脚本，一次提交给redis执行，减少反复连接redis的次数。提升性能。

LUA脚本是类似redis事务，有一定的原子性，不会被其他命令插队，可以完成一些redis事务性的操作。

但是注意redis的lua脚本功能，只有在Redis 2.6以上的版本才可以使用。

利用lua脚本淘汰用户，解决超卖问题。

redis 2.6版本以后，通过lua脚本解决争抢问题，实际上是redis 利用其单线程的特性，用任务队列的方式解决多任务并发问题。

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048064.png) 

 

## 11.7 Redis_事务_秒杀案例_代码

### 11.7.1 项目结构

![img](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210212048698.jpg) 

### 11.7.2 第一版：简单版

老师点10次，正常秒杀

同学一起点试一试，秒杀也是正常的。这是因为还达不到并发的效果。

使用工具ab模拟并发测试，会出现超卖情况。查看库存会出现负数。

### 11.7.3 第二版：加事务-乐观锁(解决超卖),但出现遗留库存和连接超时

### 11.7.4 第三版：连接池解决超时问题

### 11.7.5 第四版：解决库存依赖问题，LUA脚本

```lua
local userid=KEYS[1]; 
local prodid=KEYS[2];
local qtkey="sk:"..prodid..":qt";
local usersKey="sk:"..prodid.":usr'; 
local userExists=redis.call("sismember",usersKey,userid);
if tonumber(userExists)==1 then
  return 2;
end
local num= redis.call("get" ,qtkey);
if tonumber(num)<=0 then
  return 0;
else
  redis.call("decr",qtkey);
redis.call("sadd",usersKey,userid);
end
return 1;

```
