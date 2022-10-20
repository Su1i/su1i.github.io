---
title: 07.Redis_Jedis_测试
index: true
category:
- database
---
# 07.Redis_Jedis_测试

## 7.1 Jedis所需要的jar包

```xml
    <dependency> 
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.2.0</version> 
    </dependency>
```


 

## 7.2 连接Redis注意事项

禁用Linux的防火墙：Linux(CentOS7)里执行命令
```shell
systemctl stop/disable firewalld.service 
```


redis.conf中注释掉bind 127.0.0.1 ,然后 
```shell
protected-mode no
```


## 7.3 Jedis常用操作

### 7.3.1 创建动态的工程

 

### 7.3.2 创建测试程序

```java
package com.atguigu.jedis;
import redis.clients.jedis.Jedis;
public class Demo01 {
    public static void main(String[] args) {
        Jedis jedis = new Jedis("192.168.137.3",6379);
        String pong = jedis.ping();System.out.println("连接成功："+pong);
        jedis.close();
    }
}
```


## 7.4 测试相关数据类型

### 7.4.1 Jedis-API:   Key

```java

jedis.set("k1", "v1");
jedis.set("k2", "v2");
jedis.set("k3", "v3");
Set<String> keys = jedis.keys("*");
System.out.println(keys.size());
for (String key : keys) {
    System.out.println(key);
}
System.out.println(jedis.exists("k1"));
System.out.println(jedis.ttl("k1"));
System.out.println(jedis.get("k1"));

```

### 7.4.2 Jedis-API:   String

```java

jedis.mset("str1","v1","str2","v2","str3","v3");
System.out.println(jedis.mget("str1","str2","str3"));

```

### 7.4.3 Jedis-API:   List

```java
List<String> list = jedis.lrange("mylist",0,-1);
for (String element : list) {
    System.out.println(element);
}

```

### 7.4.4 Jedis-API:   set

```java
jedis.sadd("orders", "order01");
jedis.sadd("orders", "order02");
jedis.sadd("orders", "order03");
jedis.sadd("orders", "order04");
Set<String> smembers = jedis.smembers("orders");
for (String order : smembers) {
    System.out.println(order);
}
jedis.srem("orders", "order02");

```

### 7.4.5 Jedis-API:   hash

```java
jedis.hset("hash1","userName","lisi");
System.out.println(jedis.hget("hash1","userName"));
Map<String,String> map = new HashMap<String,String>();
map.put("telphone","13810169999");
map.put("address","atguigu");
map.put("email","abc@163.com");
jedis.hmset("hash2",map);
List<String> result = jedis.hmget("hash2", "telphone","email");
for (String element : result) {
    System.out.println(element);
}

```

### 7.4.6 Jedis-API:   zset

```java
jedis.zadd("zset01", 100d, "z3");
jedis.zadd("zset01", 90d, "l4");
jedis.zadd("zset01", 80d, "w5");
jedis.zadd("zset01", 70d, "z6");
Set<String> zrange = jedis.zrange("zset01", 0, -1);
for (String e : zrange) {
    System.out.println(e);
}

```
