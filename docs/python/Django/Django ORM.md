# Django ORM
<a name="Y4o46"></a>
## orm前戏
<a name="h8ptz"></a>
### 1.首先书写一个类：
```python
class IDMapping(models.Model):
    studyID = models.CharField(max_length=15, verbose_name='学号')  # 学号
    competitionID = models.CharField(max_length=15, verbose_name='竞赛编号')  # 竞赛编号

    
# CharField必须要指定max_length参数，不然会直接报错
# verbose_name参数是所有字段都有的，就是用来对字段进行解释

'''
由于一张表中必须要有主键，并且一般情况下都叫id
所以当你没有定义主键的时候，orm会自动地创建一个叫做id的主键
'''
```
<a name="Z0c51"></a>
### 2.数据库迁移命令：
```shell
python3 manage.py makemigrations 将操作记录到migrations文件夹
python3 manage.py migrate        将操作同步到数据库中
```
只要修改了models.py文件的内容，就必须执行上述两条命令
<a name="nfnDy"></a>
## 字段的增删改查
<a name="Ra7EI"></a>
### 字段的增加：

1. 可以直接在终端中给出默认值
2. 该字段可以为空，设置null=True
3. 直接设置字段默认值：default='123'
<a name="v4NT2"></a>
### 字段的删除：
直接注释对应的字段的代码然后执行两条数据库迁移命令即可<br />注意：执行后原来字段对应的数据将会消失
<a name="NGGX5"></a>
### 字段的修改：
直接修改代码然后执行迁移命令
<a name="Dzd7k"></a>
## 数据的增删改查
<a name="kgL7b"></a>
### 数据的查询：
```python
res = models.User.objects.filter(username=username).first()
'''
返回值可以看作是列表数据对象的格式
它也支持索引取值，切片操作，但是不支持负数索引
他不推荐你使用索引的方式取值
'''
# filter括号内可以携带多个参数，参数与参数之间是and关系
# 可以把filter联想成where记忆

# 查询用户表里面的所有内容
# 方式一：
res = models.User.objects.filter()

# 方式二：
res = models.User.objects.all()
```
<a name="vsPkg"></a>
### 数据的增加：
```python
from app import models
# 方法一：
res = models.User.objects.create(username=username,password=password)
# 返回值就是当前创建的对象
# 方法二：
user_obj = models.User(username=username,password=password)
user_obj.save()
```
<a name="YYRX6"></a>
### 数据的修改：
```python
# 去修改数据库中对应的数据内容
# 方式一：
models.User.objects.filter(id=edit_id).update(username=username,password=password)

# 方式二：
edit_obj.username = username
edit_obj.password = password
edit.save()
```
<a name="zXXgW"></a>
### 数据的删除：
```python
models.User.objects.filter(id=edit_id).delete()
# 删除数据内部其实并不是真正的删除，我们会给数据一个标识字段用来表示当前数据是否被删除
# 如果被删除了仅仅修改该标识字段的状态
```
<a name="KZbSV"></a>
## orm创建表关系
```python
# 一对多：
publish = models.ForeignKey(to='Publish') # 默认与出版社的主键字段做外键关联
# 多对多（默认会自动创建第三张表）：
authors = models.ManyToManyField(to='Author')
# 一对一：
author_detail = models.OneToOneField(to='AuthorDetail')


'''
ForeignKey,OneToOneField 会自动在字段后面加上_id后缀
在django1.x版本中默认都是级联删除的
多对多表关系可以有好几种创建方式，这里先只介绍一种

'''
```
