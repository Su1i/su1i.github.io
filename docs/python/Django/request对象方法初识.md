# request对象方法初识
<a name="CQIaV"></a>
## request.method
返回请求方式，并且是全大写的字符串形式
<a name="IIKyb"></a>
## request.POST
获取用户post请求提交的普通数据，不包含文件
<a name="kdWdl"></a>
### request.POST.get()
只获取列表最后一个元素
<a name="N1m2i"></a>
### request.POST.getList()
直接将列表取出
<a name="hpRlM"></a>
## request.GET
获取用户提交的get请求数据
<a name="iBWTD"></a>
### request.GET.get()
只获取列表最后一个元素
<a name="AXIj8"></a>
### request.GET.getList()
直接将列表取出
<a name="mPRVg"></a>
## 区别：
get请求携带的数据有大小限制，最大好像是4KB<br />post请求没有限制
