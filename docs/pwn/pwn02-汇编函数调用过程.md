# 02.汇编函数调用过程
<a name="8c915c07"></a>
## C语言函数调用栈

 测试程序：

```c
#include<stdio.h>
int sum(int x,int y){
        int a=x+y;
        return a;
}
int main(){
        sum(1,2);
        return 0;
}
```

编译指令

```
gcc -m32 test.c -o test
```

32位ida反汇编之后：<br />main函数：<br />![](https://img-blog.csdnimg.cn/20210221130147817.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=MKk0I&originHeight=322&originWidth=752&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

sum函数：<br />![](https://img-blog.csdnimg.cn/20210221130212306.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=JpYlw&originHeight=301&originWidth=775&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="06fb5a5a"></a>
### 汇编指令：

**push ebp**：将ebp寄存器中的值压入栈中<br />**pop esi** ：将栈中的数据放入esi寄存器中<br />**call** ：<br />将当前的指令指针EIP(该指针指向紧接在call指令后的下条指令)压入堆栈，以备返回时能恢复执行下条指令；然后设置EIP指向被调函数代码开始处，以跳转到被调函数的入口地址执行。<br />**leave**：<br />恢复主调函数的栈帧以准备返回。等价于指令序列movl esp，ebp(恢复原ESP值，指向被调函数栈帧开始处)和pop ebp(恢复原ebp的值，即主调函数帧基指针)。<br />**ret**：<br />与call指令配合，用于从函数或过程返回。从栈顶弹出返回地址(之前call指令保存的下条指令地址)到EIP寄存器中，程序转到该地址处继续执行(此时ESP指向进入函数时的第一个参数)。若带立即数，ESP再加立即数(丢弃一些在执行call前入栈的参数)。使用该指令前，应使当前栈顶指针所指向位置的内容正好是先前call指令保存的返回地址。

<a name="74316853"></a>
### 测试程序调用sum函数过程：

<a name="fde657e7"></a>
#### 首先：将参数压入栈中

![](https://img-blog.csdnimg.cn/2021022113031569.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=ChcXq&originHeight=432&originWidth=901&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

可以观察到我们传入的参数是sum（1，2）；调用函数时是逆序压栈，即2先入栈，然后是1，由于栈是后入先出结构，所以参数1在栈顶，先出栈。<br />再来看寄存器，此时push 2指令还未执行，所以eip寄存器中存放的地址是push 2指令的地址，即cpu将要执行的指令。此时栈底指针ebp和栈顶指针esp指向同一个位置，即当前栈帧为空。<br />最后看栈结构，<br />![](https://img-blog.csdnimg.cn/20210221130357898.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=dAObE&originHeight=369&originWidth=769&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![](https://img-blog.csdnimg.cn/20210221130441915.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=nBcTo&originHeight=586&originWidth=817&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/20210221130520319.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=tP1jU&originHeight=88&originWidth=552&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="21ad25c7"></a>
#### 接下来执行call sum指令

call指令是将call sum指令的下一条指令的地址（即指令add esp，8的地址【0x565561eb】）入栈，然后将sum函数的第一条指令的地址放入eip寄存器中。<br />![](https://img-blog.csdnimg.cn/20210221130557361.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=PDQgW&originHeight=532&originWidth=780&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

此时栈的结构：<br />![](https://img-blog.csdnimg.cn/20210221130621867.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=fMI63&originHeight=324&originWidth=491&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="bff6ff6c"></a>
#### 进入sum函数：

![](https://img-blog.csdnimg.cn/20210221130646717.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=Ek8v8&originHeight=65&originWidth=553&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

这两条指令的目的是为sum函数创建新的栈帧<br />首先，push ebp，即ebp寄存器的值（ 0xffffd2c8）入栈

![](https://img-blog.csdnimg.cn/20210221130714718.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=mERtr&originHeight=558&originWidth=727&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/20210221130822772.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=VAYwl&originHeight=372&originWidth=829&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

然后mov ebp，esp，即把esp寄存器的值赋给ebp。<br />![](https://img-blog.csdnimg.cn/20210221130852961.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=FTqrK&originHeight=558&originWidth=790&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/20210221130915413.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=OqkKZ&originHeight=384&originWidth=843&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="ba540fb3"></a>
#### 离开sum函数

中间经过了一系列的指令后，接下来离开sum函数，需要执行leave，ret指令。<br />leave执行前（因为执行了sum函数里的其他指令，所以此时栈的内容有些看不明白）：<br />![](https://img-blog.csdnimg.cn/20210221130946287.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=k3xPv&originHeight=636&originWidth=891&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

![](https://img-blog.csdnimg.cn/20210221131009234.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=bCpyg&originHeight=732&originWidth=468&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

执行leave函数：即将ebp的值赋给esp，然后将先前存入栈中的ebp的值取出放入当前ebp寄存器中。

![](https://img-blog.csdnimg.cn/20210221131034187.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=F1Om5&originHeight=578&originWidth=830&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/20210221131054939.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=SWKCo&originHeight=543&originWidth=978&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

然后执行ret指令，将先前存入栈中的eip的值放入当前eip寄存器中。

![](https://img-blog.csdnimg.cn/2021022113111635.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=AImiI&originHeight=617&originWidth=928&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/202102211311391.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=WyNqB&originHeight=546&originWidth=892&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="1fce024b"></a>
#### 回到主函数：

离开之后，回到主函数，执行add esp，8指令（即call sum指令的下一条指令），因为栈是从高地址向低地址方向增长，将栈顶指针esp的值加8，即把栈顶往栈底压，相当于把先前放入栈中的参数1，2移除。<br />![](https://img-blog.csdnimg.cn/20210221131212211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=rTYxo&originHeight=509&originWidth=923&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)<br />![](https://img-blog.csdnimg.cn/20210221131229801.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=PQJIm&originHeight=428&originWidth=706&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

可以发现，此时的栈结构与调用sum函数前没有区别。<br />![](https://img-blog.csdnimg.cn/20210221131254244.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=CGVHp&originHeight=710&originWidth=368&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

<a name="d3bbef50"></a>
#### 完整过程：

![](https://img-blog.csdnimg.cn/20210221131313650.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=PVwMy&originHeight=663&originWidth=1191&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
