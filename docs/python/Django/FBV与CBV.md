# FBV与CBV
视图函数可以是函数也可以是类
<a name="PkkLV"></a>
## FBV
```python
def index(request):
    return HttpResponse('index')
```
<a name="qEQfa"></a>
## CBV
```python
# CBV实现
from django.views import View
class MyLogin(View):
    def get(self,request):
        return render(request,'form.html')
    
    def post(self,request):
        return HttpResponse('POST方法')
    

# CBV路由
url(r'^login/',views.MyLogin.as_view())
```
FBV和CBV各有千秋
<a name="HspT5"></a>
### CBV特点：
能够直接根据请求方式的不同直接匹配到对应的方法执行
