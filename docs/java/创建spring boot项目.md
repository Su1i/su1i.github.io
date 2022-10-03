打开idea，选择创建项目：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2725910/1650965173099-99806cac-f3ed-4f51-8739-f591f466bc69.png#clientId=u25870090-c119-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=695&id=u87a94d5f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=869&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=145975&status=done&style=none&taskId=u65d605db-7432-4900-9813-9af8dcc5454&title=&width=864)<br />设置好后点击下一步：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2725910/1650965205618-7a102012-02d1-4db5-9df1-d1678d47027a.png#clientId=u25870090-c119-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=695&id=u1614919f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=869&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=144602&status=done&style=none&taskId=u82f89536-8cf4-45d6-a9a8-3635e2bf6ac&title=&width=864)<br />选择spring web之后点击创建：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2725910/1650965245417-747cb22d-9e6e-4b0f-b703-ef0b39f0896d.png#clientId=u25870090-c119-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=590&id=u8a111f88&margin=%5Bobject%20Object%5D&name=image.png&originHeight=738&originWidth=486&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65852&status=done&style=none&taskId=uf603b0d2-e5df-447f-bd2c-e0619fa301c&title=&width=388.8)<br />项目结构如上，然后右键pom.xml选择maven->创建setting.xml并打开该文件，在文件中添加阿里云源，解决依赖下载失败的问题。<br />setting.xml：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <mirrors>
        <mirror>
            <id>alimaven</id>
            <name>aliyun maven</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
    </mirrors>

</settings>
```
然后在com.example.MyShop包下面创建HelloController类，并添加如下内容：
```java
package com.example.myshop;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @RequestMapping("/hello")
    public String hello() {
        return "Hello Spring Boot!";
    }
}

```
右键项目运行类启动项目：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2725910/1650965547466-ec920c80-277e-4718-9b70-583d2ec2fec6.png#clientId=u25870090-c119-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=125&id=uf815d371&margin=%5Bobject%20Object%5D&name=image.png&originHeight=156&originWidth=416&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16618&status=done&style=none&taskId=ue96c0917-92cb-4df1-9e81-be917b83199&title=&width=332.8)<br />输出如下：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2725910/1650965618659-3042c713-6a49-42ae-872c-2d2c24dfad5e.png#clientId=u25870090-c119-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=622&id=ubda2077e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=778&originWidth=1802&originalType=binary&ratio=1&rotation=0&showTitle=false&size=213158&status=done&style=none&taskId=u1691ea5a-4cbc-45b3-939d-5d515fcc6b6&title=&width=1441.6)<br />访问127.0.0.1:8080/hello：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/2725910/1650965657384-63272590-06c7-43e7-a358-7de8b822cbad.png#clientId=u25870090-c119-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=174&id=uc41c2a66&margin=%5Bobject%20Object%5D&name=image.png&originHeight=218&originWidth=526&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18618&status=done&style=none&taskId=u4c433cde-b28c-404a-9eb7-0595e7efe1e&title=&width=420.8)<br />项目创建成功。

