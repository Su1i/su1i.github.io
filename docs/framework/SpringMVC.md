---
title: SpringMVC
index: true
category:
- framework
---

# SpringMVC

## 1.SpringMVC概述

Spring 为展现层提供的基于 MVC 设计理念的优秀的 Web 框架，是目前最主流的MVC 框架之一。

一种轻量级的、基于MVC的Web层应用框架。它能让我们对请求数据的出来，响应数据的处理，页面的跳转等等常见的web操作变得更加简单方便。



## 2.入门案例

### ①导入相关依赖

```xml
 <dependencies>
        <!-- servlet依赖 -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
        <!--jsp依赖 -->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.1</version>
            <scope>provided</scope>
        </dependency>
        <!--springmvc的依赖-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.1.9.RELEASE</version>
        </dependency>

        <!-- jackson，帮助进行json转换-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.0</version>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <!--端口-->
                    <port>81</port>
                    <!--项目路径-->
                    <path>/</path>
                    <!--解决get请求中文乱码-->
                    <uriEncoding>utf-8</uriEncoding>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

### ②配置web.xml

```xml
	<servlet>
        <servlet-name>DispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--
            为DispatcherServlet提供初始化参数的
            设置springmvc配置文件的路径
                name是固定的，必须是contextConfigLocation
                value指的是SpringMVC配置文件的位置
         -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <!--
            指定项目启动就初始化DispatcherServlet
         -->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>DispatcherServlet</servlet-name>
        <!--
             /           表示当前servlet映射除jsp之外的所有请求（包含静态资源）
             *.do        表示.do结尾的请求路径才能被SpringMVC处理(老项目会出现)
             /*          表示当前servlet映射所有请求（包含静态资源,jsp），不应该使用其配置DispatcherServlet
         -->
        <url-pattern>/</url-pattern>
    </servlet-mapping>


    <!--乱码处理过滤器，由SpringMVC提供-->
    <!-- 处理post请求乱码 -->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <!-- name固定不变，value值根据需要设置 -->
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <!-- 所有请求都设置utf-8的编码 -->
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

### ③配置SpringMVC

在resources目录下创建mvc的配置文件spring-mvc.xml

```xml
   <!--
        SpringMVC只扫描controller包即可
    -->
    <context:component-scan base-package="com.sangeng.controller"/>
    <!-- 解决静态资源访问问题，如果不加mvc:annotation-driven会导致无法访问handler-->
    <mvc:default-servlet-handler/>
    <!--解决响应乱码-->
    <mvc:annotation-driven>
        <mvc:message-converters>
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
                <constructor-arg value="utf-8"/>
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>
```

### ④创建测试用的jsp页面

在webapp下创建success.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    成功
</body>
</html>

```

### ⑤编写Controller

定义一个类，在类上加上@Controller注解，声明其是一个Controller。主要要创建在之前注解扫描所配置的包下。

然后定义一个方法，在方法上加上@RequestMapping来指定哪些请求会被该方法所处理。

```java
@Controller
public class TestController {

    @RequestMapping("/hello")//指定请求路径是/hello的才能被该方法处理
    public String hello(){
        System.out.println("hello");
        return "/success.jsp";//跳转到success.jsp
    }

}
```



## 3.设置请求映射规则@RequestMapping

该注解可以加到方法上或者是类上。（查看其源码可知）

我们可以用其来设定所能匹配请求的要求。只有符合了设置的要求，请求才能被加了该注解的方法或类处理。



### 3.1 指定请求路径

path或者value属性都可以用来指定请求路径。

例如：

我们期望让请求的资源路径为**/test/testPath**的请求能够被**testPath**方法处理则可以写如下代码

```java
@Controller
@RequestMapping("/test")
public class TestController {
    @RequestMapping("/testPath")
    public String testPath(){
        return "/success.jsp";
    }
}
```



### 3.2 指定请求方式

method属性可以用来指定可处理的请求方式。

例如：

我们期望让请求的资源路径为**/test/testMethod**的**POST**请求能够被**testMethod**方法处理。则可以写如下代码

```java
@Controller
@RequestMapping("/test")
public class TestController {

    @RequestMapping(value = "/testMethod",method = RequestMethod.POST)
    public String testMethod(){
        System.out.println("testMethod处理了请求");
        return "/success.jsp";
    }
}

```



注意：我们可以也可以运用如下注解来进行替换

-     @PostMapping    等价于   @RequestMapping(method = RequestMethod.POST) 

- 	@GetMapping    等价于   @RequestMapping(method = RequestMethod.GET) 
- 	@PutMapping    等价于   @RequestMapping(method = RequestMethod.PUT) 
- 	@DeleteMapping    等价于   @RequestMapping(method = RequestMethod.DELETE) 

例如：

上面的需求我们可以使用下面的写法实现

```java
@Controller
@RequestMapping("/test")
public class TestController {

    @PostMapping(value = "/testMethod")
    public String testMethod(){
        System.out.println("testMethod处理了请求");
        return "/success.jsp";
    }
}
```



### 3.3 指定请求参数

我们可以使用params属性来对请求参数进行一些限制。可以要求必须具有某些参数，或者是某些参数必须是某个值，或者是某些参数必须不是某个值。



例如：

我们期望让请求的资源路径为**/test/testParams**的**GET**请求,并且请求参数中**具有code参数**的请求能够被testParams方法处理。则可以写如下代码

```java
@Controller
@RequestMapping("/test")
public class TestController {
    @RequestMapping(value = "/testParams",method = RequestMethod.GET,params = "code")
    public String testParams(){
        System.out.println("testParams处理了请求");
        return "/success.jsp";
    }
}
```

​	

如果是要求**不能有code**这个参数可以把改成如下形式

```java
@Controller
@RequestMapping("/test")
public class TestController {
    @RequestMapping(value = "/testParams",method = RequestMethod.GET,params = "!code")
    public String testParams(){
        System.out.println("testParams处理了请求");
        return "/success.jsp";
    }
}
```

​	

如果要求有code这参数，并且这参数值必须**是某个值**可以改成如下形式

```java
@Controller
@RequestMapping("/test")
public class TestController {
    @RequestMapping(value = "/testParams",method = RequestMethod.GET,params = "code=sgct")
    public String testParams(){
        System.out.println("testParams处理了请求");
        return "/success.jsp";
    }
}
```



如果要求有code这参数，并且这参数值必须**不是某个值**可以改成如下形式	

```java
@Controller
@RequestMapping("/test")
public class TestController {
    @RequestMapping(value = "/testParams",method = RequestMethod.GET,params = "code!=sgct")
    public String testParams(){
        System.out.println("testParams处理了请求");
        return "/success.jsp";
    }
}
```



### 3.4 指定请求头

我们可以使用**headers**属性来对请求头进行一些限制。



例如：

我们期望让请求的资源路径为**/test/testHeaders的**GET**请求,并且请求头中**具有**deviceType**的请求能够被testHeaders方法处理。则可以写如下代码

```java
@Controller
@RequestMapping("/test")
public class TestController {
    
    @RequestMapping(value = "/testHeaders",method = RequestMethod.GET,headers = "deviceType")
    public String testHeaders(){
        System.out.println("testHeaders处理了请求");
        return "/success.jsp";
    }
}
```



如果是要求不能有**deviceType**这个请求头可以把改成如下形式

```java
@Controller
@RequestMapping("/test")
public class TestController {
    
    @RequestMapping(value = "/testHeaders",method = RequestMethod.GET,headers = "!deviceType")
    public String testHeaders(){
        System.out.println("testHeaders处理了请求");
        return "/success.jsp";
    }
}
```



如果要求有deviceType这个请求头，并且其值必须**是某个值**可以改成如下形式

```java
@Controller
@RequestMapping("/test")
public class TestController {
    
    @RequestMapping(value = "/testHeaders",method = RequestMethod.GET,headers = "deviceType=ios")
    public String testHeaders(){
        System.out.println("testHeaders处理了请求");
        return "/success.jsp";
    }
}
```



如果要求有deviceType这个请求头，并且其值必须**不是某个值**可以改成如下形式

```java
@Controller
@RequestMapping("/test")
public class TestController {
    
    @RequestMapping(value = "/testHeaders",method = RequestMethod.GET,headers = "deviceType!=ios")
    public String testHeaders(){
        System.out.println("testHeaders处理了请求");
        return "/success.jsp";
    }
}
```



### 3.5 指定请求头Content-Type

我们可以使用**consumes**属性来对**Content-Type**这个请求头进行一些限制。



#### 范例一

我们期望让请求的资源路径为**/test/testConsumes**的POST请求,并且请求头中的Content-Type头必须为 **multipart/from-data** 的请求能够被testConsumes方法处理。则可以写如下代码

```java
    @RequestMapping(value = "/testConsumes",method = RequestMethod.POST,consumes = "multipart/from-data")
    public String testConsumes(){
        System.out.println("testConsumes处理了请求");
        return "/success.jsp";
    }
```

#### 范例二

如果我们要求请求头Content-Type的值必须**不能为某个multipart/from-data**则可以改成如下形式：

```java
    @RequestMapping(value = "/testConsumes",method = RequestMethod.POST,consumes = "!multipart/from-data")
    public String testConsumes(){
        System.out.println("testConsumes处理了请求");
        return "/success.jsp";
    }
```



## 4.RestFul风格

RestFul是一种网络应用程序的设计风格和开发方式 。现在很多互联网企业的网络**接口**定义都会符合其风格。



主要规则如下：

- 每一个URI代表1种资源
- 客户端使用GET、POST、PUT、DELETE 4个表示操作方式的动词对服务端资源进行操作：GET用来获取资源，POST用来新建资源，PUT用来更新资源，DELETE用来删除资源； 
- 简单参数例如id等写到url路径上  例如： /user/1 HTTP GET：获取id=1的user信息      /user/1 HTTP DELETE ：删除id=1的user信息    
- 复杂的参数转换成json或者xml（现在基本都是json）写到请求体中。





## 5.获取请求参数

### 5.1 获取路径参数

RestFul风格的接口一些参数是在请求路径上的。类似： /user/1  这里的1就是id。

如果我们想获取这种格式的数据可以使用**@PathVariable**来实现。



#### 范例一

要求定义个RestFul风格的接口，该接口可以用来根据id查询用户。请求路径要求为  /user  ，请求方式要求为GET。

而请求参数id要写在请求路径上，例如  /user/1   这里的1就是id。

我们可以定义如下方法，通过如下方式来获取路径参数：

```java
@Controller
public class UserController {

    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    public String findUserById( @PathVariable("id")Integer id){
        System.out.println("findUserById");
        System.out.println(id);
        return "/success.jsp";
    }
}
```

#### 范例二

如果这个接口，想根据id和username查询用户。请求路径要求为  /user  ，请求方式要求为GET。

而请求参数id和name要写在请求路径上，例如  /user/1/zs   这里的1就是id，zs是name

我们可以定义如下方法，通过如下方式来获取路径参数：

```java
@Controller
public class UserController {
    @RequestMapping(value = "/user/{id}/{name}",method = RequestMethod.GET)
    public String findUser(@PathVariable("id") Integer id,@PathVariable("name") String name){
        System.out.println("findUser");
        System.out.println(id);
        System.out.println(name);
        return "/success.jsp";
    }
}

```





### 5.2 获取请求体中的Json格式参数

RestFul风格的接口一些比较复杂的参数会转换成Json通过请求体传递过来。这种时候我们可以使用**@RequestBody**注解获取请求体中的数据。

#### 5.2.1 配置

SpringMVC可以帮我们把json数据转换成我们需要的类型。但是需要进行一些基本配置。SpringMVC默认会使用jackson来进行json的解析。所以我们需要导入jackson的依赖（前面我们已经导入过）。

```xml
        <!-- jackson，帮助进行json转换-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.0</version>
        </dependency>
```

然后还要配置注解驱动（前面已经配置过）

```xml
    <mvc:annotation-driven>
    </mvc:annotation-driven>
```



#### 5.2.2 使用

##### 范例一

要求定义个RestFul风格的接口，该接口可以用来新建用户。请求路径要求为  /user  ，请求方式要求为POST。

用户数据会转换成json通过请求体传递。
	请求体数据

```json
{"name":"三更","age":15}
```

​	

###### 	1.获取参数封装成实体对象

如果我们想把Json数据获取出来封装User对象,我们可以这样定义方法：

```java
@Controller
public class UserController {
    @RequestMapping(value = "/user",method = RequestMethod.POST)
    public String insertUser(@RequestBody User user){
        System.out.println("insertUser");
        System.out.println(user);
        return "/success.jsp";
    }
}
```

User实体类如下：

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer id;
    private String name;
    private Integer age;
}

```

​	

###### 	2.获取参数封装成Map集合

也可以把该数据获取出来封装成Map集合：

```java
    @RequestMapping(value = "/user",method = RequestMethod.POST)
    public String insertUser(@RequestBody Map map){
        System.out.println("insertUser");
        System.out.println(map);
        return "/success.jsp";
    }
```



##### 范例二

如果请求体传递过来的数据是一个User集合转换成的json，Json数据可以这样定义：

```java
[{"name":"三更1","age":14},{"name":"三更2","age":15},{"name":"三更3","age":16}]
```

方法定义：

```java
    @RequestMapping(value = "/users",method = RequestMethod.POST)
    public String insertUsers(@RequestBody List<User> users){
        System.out.println("insertUsers");
        System.out.println(users);
        return "/success.jsp";
    }
```



#### 5.2.3 注意事项

如果需要使用**@RequestBody**来获取请求体中Json并且进行转换，要求请求头 Content-Type 的值要为： application/json 。



### 5.3 获取QueryString格式参数 

如果接口的参数是使用QueryString的格式的话，我们也可以使用SpringMVC快速获取参数。

我们可以使用**@RequestParam**来获取QueryString格式的参数。



#### 5.3.1 使用

##### 范例一

要求定义个接口，该接口请求路径要求为  /testRequestParam，请求方式无要求。参数为id和name和likes。使用QueryString的格式传递。

###### 	1.参数单独的获取

如果我们想把id，name，likes单独获取出来可以使用如下写法：

在方法中定义方法参数，方法参数名要和请求参数名一致，这种情况下我们可以省略**@RequestParam**注解。

```java
    @RequestMapping("/testRquestParam")
    public String testRquestParam(Integer id, String name, String[] likes){
        System.out.println("testRquestParam");
        System.out.println(id);
        System.out.println(name);
        System.out.println(Arrays.toString(likes));
        return "/success.jsp";
    }
```

如果方法参数名和请求参数名不一致，我们可以加上**@RequestParam**注解例如：

```java
    @RequestMapping("/testRquestParam")
    public String testRquestParam(@RequestParam("id") Integer uid,@RequestParam("name") String name, @RequestParam("likes")String[] likes){
        System.out.println("testRquestParam");
        System.out.println(uid);
        System.out.println(name);
        System.out.println(Arrays.toString(likes));
        return "/success.jsp";
    }
```



###### 	2.获取参数封装成实体对象

如果我们想把这些参数封装到一个User对象中可以使用如下写法：

```java
    @RequestMapping("/testRquestParam")
    public String testRquestParam(User user){
        System.out.println("testRquestParam");
        System.out.println(user);
        return "/success.jsp";
    }
```

User类定义如下：

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private String[] likes;
}
```

测试时请求url如下：

```java
http://localhost:81/testRquestParam?id=1&name=三更草堂&likes=编程&likes=录课&likes=烫头
```



**注意：实体类中的成员变量要和请求参数名对应上。并且要提供对应的set/get方法。**



### 5.4 相关注解其他属性

#### 5.4.1 required

代表是否必须，默认值为true也就是必须要有对应的参数。如果没有就会报错。

如果对应的参数可传可不传则可以把去设置为fasle

例如：

```java
    @RequestMapping("/testRquestParam")
    public String testRquestParam(@RequestParam(value = "id",required = false) Integer uid,@RequestParam("name") String name, @RequestParam("likes")String[] likes){
        System.out.println("testRquestParam");
        System.out.println(uid);
        System.out.println(name);
        System.out.println(Arrays.toString(likes));
        return "/success.jsp";
    }
```



#### 5.4.2 defaultValue

如果对应的参数没有，我们可以用defaultValue属性设置默认值。

例如：

```java
    @RequestMapping("/testRquestParam")
    public String testRquestParam(@RequestParam(value = "id",required = false,defaultValue = "777") Integer uid,@RequestParam("name") String name, @RequestParam("likes")String[] likes){
        System.out.println("testRquestParam");
        System.out.println(uid);
        System.out.println(name);
        System.out.println(Arrays.toString(likes));
        return "/success.jsp";
    }
```






## 6.类型转换器

虽然我们前面在获取参数时看起来非常轻松，但是在这个过程中是有可能出现一些问题的。

例如，请求参数为success=1 我们期望把这个请求参数获取出来赋值给一个Boolean类型的变量。

这里就会涉及到  Stirng-——>Boolean的类型转换了。实际上SpringMVC中内置了很多类型转换器来进行类型转换。也有专门进行Stirng-——>Boolean类型转换的转换器**StringToBooleanConverter**。

如果是符合SpringMVC内置转换器的转换规则就可以很轻松的实现转换。但是如果不符合转换器的规则呢？

例如，请求参数为birthday=2004-12-12 我们期望把这个请求参数获取出来赋值给一个Date类型的变量。就不符合内置的规则了。内置的可以把 2004/12/12 这种格式进行转换。这种情况下我们就可以选择自定义类型转换。



### 6.1 自定义类型转换器

#### ①创建类实现Converter接口

```java
public class StringToDateConverter implements Converter<String, Date> {
    public Date convert(String source) {
        return null;
    }
}
```

#### ②实现convert方法

```java
public class StringToDateConverter implements Converter<String, Date> {
    public Date convert(String source) {
        //String->Date   2005-12-12 
        Date date = null;
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            date = simpleDateFormat.parse(source);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
```

#### ③配置让SpringMVC使用自定义转换器

```xml
    <!--解决响应乱码-->
    <mvc:annotation-driven conversion-service="myConversionService">
        <mvc:message-converters>
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
                <constructor-arg value="utf-8"/>
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>

    <bean class="org.springframework.context.support.ConversionServiceFactoryBean" id="myConversionService">
        <property name="converters">
            <set>
                <bean class="com.sangeng.converter.StringToDateConverter"></bean>
            </set>
        </property>
    </bean>
```





### 6.2 日期转换简便解决方案

如果是String到Date的转换我们也可以使用另外一种更方便的方式。使用@DateTimeFormat来指定字符串的格式。

```java
    @RequestMapping("/testDateConverter")
    public String testDateConverter(@DateTimeFormat(pattern = "yyyy-MM-dd") Date birthday){
        System.out.println("testDateConverter");
        System.out.println(birthday);
        return "/success.jsp";
    }
```


## 7.响应体响应数据（重点）

无论是RestFul风格还是我们之前web阶段接触过的异步请求，都需要把数据转换成Json放入响应体中。



### 7.1 数据放到响应体

我们的SpringMVC为我们提供了**@ResponseBody**来非常方便的把Json放到响应体中。

**@ResponseBody**可以加在哪些东西上面？类上和方法上

具体代码请参考范例。



### 7.2 数据转换成Json

SpringMVC可以把我们进行Json的转换，不过需要进行相应配置（已经配置过）。



#### 7.2.1 配置

##### ①导入jackson依赖

```xml
        <!-- jackson，帮助进行json转换-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.9.0</version>
        </dependency>
```

##### ②开启mvc的注解驱动

```xml
    <mvc:annotation-driven></mvc:annotation-driven>
```



#### 7.2.2 使用

只要把要转换的数据直接作为方法的返回值返回即可。SpringMVC会帮我们把返回值转换成json。具体代码请参考范例。



### 7.3 范例

#### 范例一

要求定义个RestFul风格的接口，该接口可以用来根据id查询用户。请求路径要求为  /response/user  ，请求方式要求为GET。

而请求参数id要写在请求路径上，例如   /response/user/1   这里的1就是id。

要求获取参数id,去查询对应id的用户信息（模拟查询即可，可以选择直接new一个User对象），并且转换成json响应到响应体中。

```java
@Controller
@RequestMapping("/response")
public class ResponseController {
    @GetMapping("/user/{id}")
    @ResponseBody //这方法的返回值放入响应体中
    public User testResponse(@PathVariable Integer id){
        User user = new User(id,null,null,null);
        return user;//因为以及做过配置，所以会把返回值转换成json
    }
}

```



#### 范例二

要求定义个RestFul风格的接口，该接口可以查询所有用户。请求路径要求为  /response/user  ，请求方式要求为GET。

去查询所有的用户信息（模拟查询即可，可以选择直接创建集合，添加几个User对象），并且转换成json响应到响应体中。

```java
@Controller
@RequestMapping("/response")
@ResponseBody  //这类中所有方法的返回值都会放到响应体中
public class ResponseController {

    @GetMapping("/user/{id}")
    public User testResponse(@PathVariable Integer id){
        User user = new User(id,null,null,null);
        return user;
    }

    @GetMapping("/user")
    public List<User> testResponse2(){
        List<User> list = new ArrayList<User>();
        list.add(new User(1,"三更",15,null));
        list.add(new User(2,"四更",16,null));
        list.add(new User(3,"五更",17,null));
        return list;
    }
}
```

如果一个Controller中的所有方法返回值都要放入响应体，那么我们可以直接在Controller类上加@ResponseBody。

我们可以使用**@RestController** 注解替换@Controller和@ResponseBody两个注解

```java
@RequestMapping("/response")
@RestController //相当于  @Controller+@ResponseBody
public class ResponseController {

    @GetMapping("/user/{id}")
    public User testResponse(@PathVariable Integer id){
        User user = new User(id,null,null,null);
        return user;
    }

    @GetMapping("/user")
    public List<User> testResponse2(){
        List<User> list = new ArrayList<User>();
        list.add(new User(1,"三更",15,null));
        list.add(new User(2,"四更",16,null));
        list.add(new User(3,"五更",17,null));
        return list;
    }
}

```



## 8.页面跳转

在SpringMVC中我们可以非常轻松的实现页面跳转，只需要把方法的返回值写成要跳转页面的路径即可。

例如：

```java
@Controller
public class PageJumpController {
    @RequestMapping("/testJump")
    public String testJump(){
        return "/success.jsp";
    }
}
```

​	

默认的跳转其实是转发的方式跳转的。我们也可以选择加上标识，在要跳转的路径前加上**forward:** 。这样SpringMVC也会帮我们进行请求转发。

例如：

```java
@Controller
public class PageJumpController {
    @RequestMapping("/testJump")
    public String testJump(){
        return "forward:/success.jsp";
    }
}
```



如果想实现重定向跳转则可以在跳转路径前加上 **redirect:**  进行标识。这样SpringMVC就会帮我们进行重定向跳转。

例如：

```java
@Controller
public class PageJumpController {
    @RequestMapping("/testJump")
    public String testJump(){
        return "redirect:/success.jsp";
    }
}

```



## 9.视图解析器

如果我们经常需要跳转页面，并且页面所在的路径比较长，我们每次写完整路径会显的有点麻烦。我们可以配置视图解析器，设置跳转路径的前缀和后缀。这样可以简化我们的书写。



### 9.1使用步骤

#### ①配置视图解析器

我们需要完SpringMVC容器中注入InternalResourceViewResolver对象。

```xml
    <!--配置视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="viewResolver">
        <!--要求拼接的前缀-->
        <property name="prefix" value="/WEB-INF/page/"></property>
        <!--要拼接的后缀-->
        <property name="suffix" value=".jsp"></property>
    </bean>
```

#### ②页面跳转

视图解析器会在逻辑视图的基础上拼接得到物理视图。

```java
    @RequestMapping("/testJumpToJsp")
    public String testJumpToJsp(){
//        return "/WEB-INF/page/test.jsp";
        return "test";
    }
```



### 9.2 不进行前后缀拼接

如果在配置了视图解析器的情况下，某些方法中并不想拼接前后缀去跳转。这种情况下我们可以在跳转路径前加**forward:** 或者**redirect:**进行标识。这样就不会进行前后缀的拼接了。

例如:

```java
    @RequestMapping("/testJumpHtml")
    public String testJumpHtml(){
        //如果加了forward:  或者redirect: 就不会进行前后缀的拼接
        return "forward:/hello1.html";
    }
```





## 10.获取原生对象

我们之前在web阶段我们经常要使用到request对象，response，session对象等。我们也可以通过SpringMVC获取到这些对象。（不过在MVC中我们很少获取这些对象，因为有更简便的方式，避免了我们使用这些原生对象相对繁琐的API。）

我们只需要在方法上添加对应类型的参数即可，但是注意数据类型不要写错了，SpringMVC会把我们需要的对象传给我们的形参。

例如：

```java
@Controller
public class RequestResponseController {
    @RequestMapping("/getReqAndRes")
    public String getReqAndRes(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        System.out.println();
        return "test";
    }
}
```



​	

## 11.获取请求头和Cookie

### 11.1获取请求头

在方法中定义一个参数，参数前加上**@RequestHeader**注解，知道要获取的请求头名即可获取对应请求头的值。

例如：

想要获取 device-type 这个请求头则可以按照如下方式定义方法。

```java
@Controller
public class RequestResponseController {


    @RequestMapping("/getHeader")
    public String getHeader(@RequestHeader(value = "device-type") String deviceType){
        System.out.println(deviceType);
        return "test";
    }
}

```



### 11.2 获取Cookie

在方法中定义一个参数，参数前加上**@CookieValue** 注解，知道要获取的cookie名即可获取对应cookie的值。

例如：

想要获取 JSESSIONID 的cookie值。则可以按照如下方式定义方法。

```java
@Controller
public class RequestResponseController {

    @RequestMapping("/getCookie")
    public String getCookie(@CookieValue("JSESSIONID") String sessionId){
        System.out.println(sessionId);
        return "test";
    }
}

```



## 12.JSP开发模式（了解）

如果我们使用JSP进行开发，那我们就需要在域中存数据，然后跳转到对应的JSP页面中，在JSP页面中获取域中的数据然后进行相关处理。

使用如果是类似JSP的开发模式就会涉及到**往域中存数据**和**携带数据跳转页面**的操作。

所以我们来看下如果用SpringMVC进行相关操作。



### 12.1 往Requet域存数据并跳转

#### 12.1.1 使用Model

我们可以使用**Model**来往域中存数据。然后使用之前的方式实现页面跳转。



例如

我们要求访问  **/testRequestScope** 这个路径时能往Request域中存name和title数据，然后跳转到 **/WEB-INF/page/testScope.jsp** 这个页面。在Jsp中获取域中的数据。

则可以使用如下写法:

```java
@Controller
public class JspController {
    @RequestMapping("/testRquestScope")
    public String testRquestScope(Model model){
        //往请求域存数据
        model.addAttribute("name","三更");
        model.addAttribute("title","不知名Java教程UP主");
        return "testScope";
    }
}
```



#### 12.1.2 使用ModelAndView

我们可以使用**ModelAndView**来往域中存数据和页面跳转。

例如

我们要求访问  **/testRequestScope2**  这个路径时能往域中存name和title数据，然后跳转到 **/WEB-INF/page/testScope.jsp** 这个页面。在Jsp中获取域中的数据。

则可以使用如下写法:

```java
@Controller
public class JspController {
    @RequestMapping("/testRquestScope2")
    public ModelAndView testRquestScope2(ModelAndView modelAndView){
        //往域中添加数据
        modelAndView.addObject("name","三更");
        modelAndView.addObject("title","不知名Java教程UP主");
        //页面跳转
        modelAndView.setViewName("testScope");
        return modelAndView;
    }
}
```

**注意要把modelAndView对象作为方法的返回值返回。**



### 12.2 从Request域中获取数据

我们可以使用**@RequestAttribute** 把他加在方法参数上，可以让SpringMVC帮我们从Request域中获取相关数据。



例如

```java
@Controller
public class JspController {

    @RequestMapping("/testGetAttribute")
    public String testGetAttribute(@RequestAttribute("org.springframework.web.servlet.HandlerMapping.bestMatchingPattern")
                                               String value,HttpServletRequest request){
        System.out.println(value);
        return "testScope";
    }
}

```





### 12.3 往Session域存数据并跳转

我们可以使用**@SessionAttributes**注解来进行标识，用里面的属性来标识哪些数据要存入Session域。


例如

我们要求访问  **/testSessionScope **这个路径时能往域中存**name**和**title**数据，然后跳转到 **/WEB-INF/page/testScope.jsp** 这个页面。在jsp中获取**Session域**中的数据。

则可以使用如下写法

```java
@Controller
@SessionAttributes({"name"})//表示name这个数据也要存储一份到session域中
public class JspController {


    @RequestMapping("/testSessionScope")
    public String testSessionScope(Model model){
        model.addAttribute("name","三更");
        model.addAttribute("title","不知名Java教程UP主");
        return "testScope";
    }
}
```



### 12.4 获取Session域中数据

我们可以使用**@SessionAttribute**把他加在方法参数上，可以让SpringMVC帮我们从**Session域**中获取相关数据。



例如：

```java
@Controller
@SessionAttributes({"name"})
public class JspController {
    @RequestMapping("/testGetSessionAttr")
    public String testGetSessionAttr(@SessionAttribute("name") String name){
        System.out.println(name);
        return "testScope";
    }

}

```



## 13.拦截器

### 13.1 应用场景

如果我们想在多个Handler方法执行之前或者之后都进行一些处理，甚至某些情况下需要拦截掉，不让Handler方法执行。那么可以使用SpringMVC为我们提供的拦截器。



### 13.2 拦截器和过滤器的区别

过滤器是在Servlet执行之前或者之后进行处理。而拦截器是对Handler（处理器）执行前后进行处理。

如图：

![image-20210516215721896](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210291344750.png)



### 13.3 创建并配置拦截器

#### ①创建类实现HandlerInterceptor接口

```java
public class MyInterceptor implements HandlerInterceptor {
}
```

#### ②实现方法

```java
public class MyInterceptor implements HandlerInterceptor {
    
    //在handler方法执行之前会被调用
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle");
        //返回值代表是否放行，如果为true则放行，如果为fasle则拦截，目标方法执行不到
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle");
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion");
    }
}
```

#### ③配置拦截器

```xml
    <!--配置拦截器-->
    <mvc:interceptors>
        <mvc:interceptor>
            <!--
                    配置拦截器要拦截的路径
                    /*    代表当前一级路径，不包含子路径
                    /**   代表当前一级路径和多级路径，使用的更多

                    例如：
                        /test/*   这种会拦截下面这种路径/test/add  /test/delete
                                  但是拦截不了多级路径的情况例如  /test/add/abc  /test/add/abc/bcd
                        /test/**  这种可以拦截多级目录的情况，无论    /test/add还是/test/add/abc/bcd 都可以拦截
            -->
            <mvc:mapping path="/**"/>
            <!--配置排除拦截的路径-->
            <!--<mvc:exclude-mapping path="/"/>-->
            <!--配置拦截器对象注入容器-->
            <bean class="com.sangeng.interceptor.MyInterceptor"></bean>
        </mvc:interceptor>
    </mvc:interceptors>
```



### 13.4 拦截器方法及参数详解

- preHandle方法会在Handler方法执行之前执行，我们可以在其中进行一些前置的判断或者处理。
- postHandle方法会在Handler方法执行之后执行，我们可以在其中对域中的数据进行修改，也可以修改要跳转的页面。
- afterCompletion方法会在最后执行，这个时候已经没有办法对域中的数据进行修改，也没有办法修改要跳转的页面。我们在这个方法中一般进行一些资源的释放。

```java
    /**
     * 在handler方法执行之前会被调用
     * @param request 当前请求对象
     * @param response 响应对象
     * @param handler 相当于是真正能够处理请求的handler方法封装成的对象，对象中有这方法的相关信息
     * @return 返回值代表是否放行，如果为true则放行，如果为fasle则拦截，目标方法执行不到
     * @throws Exception
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle");
        //返回值代表是否放行，如果为true则放行，如果为fasle则拦截，目标方法执行不到
        return true;
    }
```

```java
    /**
     * postHandle方法会在Handler方法执行之后执行
     * @param request 当前请求对象
     * @param response 响应对象
     * @param handler 相当于是真正能够处理请求的handler方法封装成的对象，对象中有这方法的相关信息
     * @param modelAndView handler方法执行后的modelAndView对象，我们可以修改其中要跳转的路径或者是域中的数据
     * @throws Exception
     */
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle");
    }
```

```java
    /**
     * afterCompletion方法会在最后执行
     * @param request 当前请求对象
     * @param response 响应对象
     * @param handler 相当于是真正能够处理请求的handler方法封装成的对象，对象中有这方法的相关信息
     * @param ex 异常对象
     * @throws Exception
     */
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion");
    }
```



### 13.5 案例-登录状态拦截器

#### 13.5.1需求

我们的接口需要做用户登录状态的校验，如果用户没有登录则跳转到登录页面，登录的情况下则可以正常访问我们的接口。

#### 13.5.2 分析

怎么判断是否登录？

登录时往session写入用户相关信息，然后在其他请求中从session中获取这些信息，如果获取不到说明不是登录状态。

很多接口都要去写判断的代码，难道在每个Handler中写判断逻辑？

用拦截器，在拦截器中进行登录状态的判断。

登录接口是否应该进行拦截？

不能拦截

静态资源是否要进行拦截？

不能拦截

#### 13.5.3 步骤分析

①登录页面，请求发送给登录接口

②登录接口中，校验用户名密码是否正确（模拟校验即可，先不查询数据库）。

如果用户名密码正确，登录成功。把用户名写入session中。

③定义其他请求的Handler方法

④定义拦截器来进行登录状态判断

如果能从session中获取用户名则说明是登录的状态，则放行

如果获取不到，则说明未登录，要跳转到登录页面。

#### 13.5.4 代码实现

##### 13.5.4.1 登录功能代码实现

###### 	①编写登录页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form method="post" action="/login">
        用户名：<input type="text" name="username">
        密码：<input type="password" name="password">
        <input type="submit">
    </form>
</body>
</html>
```

###### 	②编写登录接口

接口中，校验用户名密码是否正确（模拟校验即可，先不查询数据库）。如果用户名密码正确，登录成功。把用户名写入session中。

```java
@Controller
public class LoginController {

    @PostMapping("/login")
    public String longin(String username, String password, HttpSession session){
        //往session域中写入用户名用来代表登录成功
        session.setAttribute("username",username);
        return "/WEB-INF/page/success.jsp";
    }
}

```


##### 13.5.4.2 登录状态校验代码实现

###### ①定义拦截器

```java
public class LoginInterceptor implements HandlerInterceptor {
}
```

###### ②重写方法，在preHandle方法中实现状态校验

```java
public class LoginInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //从session中获取用户名，判断是否存在
        HttpSession session = request.getSession();
        String username = (String) session.getAttribute("username");
        if(StringUtils.isEmpty(username)){
            //如果获取不到说明未登录 ，重定向跳转到登录页面
            String contextPath = request.getServletContext().getContextPath();
            response.sendRedirect(contextPath+"/static/login.html");
        }else{
            //如果获取到了，说明之前登录过。放行。
            return true;
        }
        return false;
    }
}
```

###### ③配置拦截器

- 	登录相关接口不应该拦截
- 	静态资源不拦截

```xml
    <mvc:interceptors>
        <mvc:interceptor>
            <!--要拦截的路径-->
            <mvc:mapping path="/**"/>
            <!--排除不拦截的路径-->
            <mvc:exclude-mapping path="/static/**"></mvc:exclude-mapping>
            <mvc:exclude-mapping path="/WEB-INF/page/**"></mvc:exclude-mapping>
            <mvc:exclude-mapping path="/login"></mvc:exclude-mapping>
            <bean class="com.sangeng.interceptor.LoginInterceptor"></bean>
        </mvc:interceptor>
    </mvc:interceptors>
```



### 13.6 多拦截器执行顺序

如果我们配置了多个拦截器，拦截器的顺序是**按照配置的先后顺序**的。

这些拦截器中方法的执行顺序如图（**preHandler都返回true的情况下**）：

![image-20210517165433983](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210291343073.png)



如果**拦截器3的preHandle方法返回值为false**。执行顺序如图：

![image-20210519213325101](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210291343453.png)

- 	只有所有拦截器都放行了，postHandle方法才会被执行。
- 	只有当前拦截器放行了，当前拦截器的afterCompletion方法才会执行。



## 14.统一异常处理

我们在实际项目中Dao层和Service层的异常都会被抛到Controller层。但是如果我们在Controller的方法中都加上异常的try...catch处理也会显的非常的繁琐。

所以SpringMVC为我们提供了统一异常处理方案。可以把Controller层的异常进行统一处理。这样既提高了代码的复用性也让异常处理代码和我们的业务代码解耦。

一种是实现HandlerExceptionResolver接口的方式，一种是使用@ControllerAdvice注解的方式。



### 14.1 HandlerExceptionResolver

#### ①实现接口

```java
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {

}

```



#### ②重写方法

```java
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {
    
    //如果handler中出现了异常，就会调用到该方法，我们可以在本方法中进行统一的异常处理。
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        //获取异常信息，把异常信息放入域对象中
        String msg = ex.getMessage();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("msg",msg);
        //跳转到error.jsp
        modelAndView.setViewName("/WEB-INF/page/error.jsp");
        return modelAndView;
    }
}

```



#### ③注入容器

可以使用注解注入也可以使用xml配置注入。这里使用注解注入的方式。在类上加**@Component**注解，注意要保证类能被组件扫描扫描到。

```java
@Component
public class MyHandlerExceptionResolver implements HandlerExceptionResolver {
	//....省略无关代码
}
```



### 14.2 @ControllerAdvice（重要）

#### ①创建类加上@ControllerAdvice注解进行标识

```java
@ControllerAdvice
public class MyControllerAdvice {

}
```



#### ②定义异常处理方法	

定义异常处理方法，使用**@ExceptionHandler**标识可以处理的异常。

```java
@ControllerAdvice
public class MyControllerAdvice {

    @ExceptionHandler({NullPointerException.class,ArithmeticException.class})
    public ModelAndView handlerException(Exception ex){
        //如果出现了相关的异常，就会调用该方法
        String msg = ex.getMessage();
        ModelAndView modelAndView = new ModelAndView();
        //把异常信息存入域中
        modelAndView.addObject("msg",msg);
        //跳转到error.jsp
        modelAndView.setViewName("/WEB-INF/page/error.jsp");
        return modelAndView;
    }
}
```



#### ③注入容器

可以使用注解注入也可以使用xml配置注入。这里使用注解注入的方式。在类上加**@Component**注解，注意要保证类能被组件扫描扫描到。

```java
@ControllerAdvice
@Component
public class MyControllerAdvice {
	//省略无关代码
}
```



### 14.3 总结

我们在实际项目中一般会选择使用@ControllerAdvice 来进行异常的统一处理。

因为如果在前后端不分离的项目中，异常处理一般是跳转到错误页面，让用户有个更好的体验。而前后端分离的项目中，异常处理一般是把异常信息封装到Json中写入响应体。无论是哪种情况，使用@ControllerAdvice的写法都能比较方便的实现。

例如下面这种方式就是前后端分离的异常处理方案，把异常信息封装到对象中，转换成json写入响应体。

```java
@ControllerAdvice
@Component
public class MyControllerAdvice {

    @ExceptionHandler({NullPointerException.class,ArithmeticException.class})
    @ResponseBody
    public Result handlerException(Exception ex){
        Result result = new Result();
        result.setMsg(ex.getMessage());
        result.setCode(500);
        return result;
    }
}

```



## 15.文件上传

### 15.1 文件上传要求

Http协议规定了我们在进行文件上传时的请求格式要求。所以在进行文件上传时，除了在表单中增加一个用于**上传文件的表单项（input标签，type=file）**外必须要满足以下的条件才能进行上传。

#### ①请求方式为POST请求

如果是使用表单进行提交的话，可以把form标签的**method**属性设置为**POST**。例如:

```html
    <form action="/upload" method="post">

    </form>
```

#### ②请求头**Content-Type**必须为**multipart/form-data**

如果是使用表单的话可以把表单的**entype**属性设置成**multipart/form-data**。例如：

```html
    <form action="/upload" method="post" enctype="multipart/form-data">

    </form>
```




### 15.2 SpringMVC接收上传过来的文件

SpringMVC使用commons-fileupload的包对文件上传进行了封装，我们只需要引入相关依赖和进行相应配置就可以很轻松的实现文件上传的功能。

#### ①依赖

```xml
        <!--commons文件上传，如果需要文件上传功能，需要添加本依赖-->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.4</version>
        </dependency>
```

#### ②配置

```xml
  <!--
            文件上传解析器
            注意：id 必须为 multipartResolver
        -->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <!-- 设置默认字符编码 -->
        <property name="defaultEncoding" value="utf-8"/>
        <!-- 一次请求上传的文件的总大小的最大值，单位是字节-->
        <property name="maxUploadSize" value="#{1024*1024*100}"/>
        <!-- 每个上传文件大小的最大值，单位是字节-->
        <property name="maxUploadSizePerFile" value="#{1024*1024*50}"/>
    </bean>
```



#### ③接收上传的文件数据并处理

上传表单

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="uploadFile">
        <input type="submit">
    </form>
</body>
</html>
```



```java
@Controller
public class UploadController {

    @RequestMapping("/upload")
    public String upload(MultipartFile uploadFile) throws IOException {
        //文件存储 把上传上来的文件存储下来
        uploadFile.transferTo(new File("test.sql"));
        return "/success.jsp";
    }
}
```



注意：方法参数名要和提交上来的参数名一致。



### 15.3 MultipartFile常见用法

- 获取上传文件的原名

  ```java
  uploadFile.getOriginalFilename()
  ```

- 获取文件类型的MIME类型

  ```java
  uploadFile.getContentType()
  ```

- 获取上传文件的大小

  ```java
  uploadFile.getSize()
  ```

- 获取对应上传文件的输入流

  ```java
  uploadFile.getInputStream()
  ```

  

## 16.文件下载

### 16.1 文件下载要求

如果我们想提供文件下载的功能。HTTP协议要求我们的必须满足如下规则。

#### ①设置响应头Content-Type

要求把提供下载文件的MIME类型作为响应头Content-Type的值

#### ②设置响应头Content-disposition

要求把文件名经过URL编码后的值写入响应头Content-disposition。但是要求符合以下格式，因为这样可以解决不同浏览器中文文件名 乱码问题。

```java
Content-disposition: attachment; filename=%E4%B8%8B%E6%B5%B7%E5%81%9Aup%E4%B8%BB%E9%82%A3%E4%BA%9B%E5%B9%B4.txt;filename*=utf-8''%E4%B8%8B%E6%B5%B7%E5%81%9Aup%E4%B8%BB%E9%82%A3%E4%BA%9B%E5%B9%B4.txt
```

#### ③文件数据写入响应体中



### 16.2 代码实现

我们可以使用之前封装的下载工具类实现文件下载

工具类代码：

```java
import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;

public class DownLoadUtils {
    /**
     * 该方法可以快速实现设置两个下载需要的响应头和把文件数据写入响应体
     * @param filePath 该文件的相对路径
     * @param context  ServletContext对象
     * @param response
     * @throws Exception
     */
    public static void downloadFile(String filePath, ServletContext context, HttpServletResponse response) throws Exception {
        String realPath = context.getRealPath(filePath);
        File file = new File(realPath);
        String filename = file.getName();
        FileInputStream fis = new FileInputStream(realPath);
        String mimeType = context.getMimeType(filename);//获取文件的mime类型
        response.setHeader("content-type",mimeType);
        String fname= URLEncoder.encode(filename,"UTF-8");
        response.setHeader("Content-disposition","attachment; filename="+fname+";"+"filename*=utf-8''"+fname);
        ServletOutputStream sos = response.getOutputStream();
        byte[] buff = new byte[1024 * 8];
        int len = 0;
        while((len = fis.read(buff)) != -1){
            sos.write(buff,0,len);
        }
        sos.close();
        fis.close();
    }
}

```



Handler方法定义

```java
@Controller
public class DownLoadController {

    @RequestMapping("/download")
    public void download(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //文件下载
        DownLoadUtils.downloadFile("/WEB-INF/file/下海做UP主那些年.txt",request.getServletContext(),response);
    }
}
```





## 17.SpringMVC执行流程

因为我们有两种开发模式，我们分别来讲解两种模式在SpringMVC中的执行流程。

一种是类似JSP的开发流程:

把数据放入域对象中，然后进行页面跳转。

另外一种是前后端分离的开发模式，这也是目前市场上主流的模式：

把数据转化为json放入响应体中。

完整流程图如下：

![image-20210519191100685](https://img-1305804786.cos.ap-beijing.myqcloud.com//picgo202210291343497.png)

### 17.1 类JSP开发模式执行流程

1. 用户发起请求被DispatchServlet所处理

2. DispatchServlet通过HandlerMapping根据具体的请求查找能处理这个请求的Handler。**（HandlerMapping主要是处理请求和Handler方法的映射关系的）**

3. HandlerMapping返回一个能够处理请求的执行链给DispatchServlet，这个链中除了包含Handler方法也包含拦截器。

4. DispatchServlet拿着执行链去找HandlerAdater执行链中的方法。

5. HandlerAdater会去执行对应的Handler方法，把数据处理转换成合适的类型然后作为方法参数传入 

6. Handler方法执行完后的返回值会被HandlerAdapter转换成ModelAndView类型。**（HandlerAdater主要进行Handler方法参数和返回值的处理。）**

7. 返回ModelAndView给DispatchServlet.

8. 如果对于的ModelAndView对象不为null，则DispatchServlet把ModelAndView交给 ViewResolver 也就是视图解析器解析。

9. ViewResolver 也就是视图解析器把ModelAndView中的viewName转换成对应的View对象返回给DispatchServlet。**（ViewResolver 主要负责把String类型的viewName转换成对应的View对象）**

10. DispatchServlet使用View对象进行页面的展示。

### 17.2 前后端分离开发模式执行流程

前后端分离的开发模式中我们会使用@ResponseBody来把数据写入到响应体中。所以不需要进行页面的跳转。

故流程如下：

1. 用户发起请求被DispatchServlet所处理

2. DispatchServlet通过HandlerMapping根据具体的请求查找能处理这个请求的Handler。**（HandlerMapping主要是处理请求和Handler方法的映射关系的）**

3. HandlerMapping返回一个能够处理请求的执行链给DispatchServlet，这个链中除了包含Handler方法也包含拦截器。

4. DispatchServlet拿着执行链去找HandlerAdater执行链中的方法。

5. HandlerAdater会去执行对应的Handler方法，把数据处理转换成合适的类型然后作为方法参数传入 

6. Handler方法执行完后的返回值会被HandlerAdapter转换成ModelAndView类型。由于使用了@ResponseBody注解，返回的ModelAndView会为null ，并且HandlerAdapter会把方法返回值放到响应体中。**（HandlerAdater主要进行Handler方法参数和返回值的处理。）**

7. 返回ModelAndView给DispatchServlet。

8. 因为返回的ModelAndView为null,所以不用去解析视图解析和其后面的操作。
