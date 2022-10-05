export const data = JSON.parse("{\"key\":\"v-d382063e\",\"path\":\"/pwn/pwn05-ret2syscall.html\",\"title\":\"05.ret2syscall\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"05.ret2syscall ROP原理： 随着 NX 保护的开启，以往直接向栈或者堆上直接注入代码的方式难以继续发挥效果。攻击者们也提出来相应的方法来绕过保护，目前主要的是 ROP(Return Oriented Programming)，其主要思想是在栈缓冲区溢出的基础上，利用程序中已有的小片段 (gadgets) 来改变某些寄存器或者变量的值，从而控制\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://github.com/Su1i/pwn/pwn05-ret2syscall.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"菜鸡的自我救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"05.ret2syscall\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"ROP原理：\",\"slug\":\"rop原理\",\"link\":\"#rop原理\",\"children\":[{\"level\":3,\"title\":\"gadget：\",\"slug\":\"gadget\",\"link\":\"#gadget\",\"children\":[]}]},{\"level\":2,\"title\":\"例题：\",\"slug\":\"例题\",\"link\":\"#例题\",\"children\":[{\"level\":3,\"title\":\"首先checksec：\",\"slug\":\"首先checksec\",\"link\":\"#首先checksec\",\"children\":[]},{\"level\":3,\"title\":\"ida分析：\",\"slug\":\"ida分析\",\"link\":\"#ida分析\",\"children\":[]},{\"level\":3,\"title\":\"关于系统调用的知识：\",\"slug\":\"关于系统调用的知识\",\"link\":\"#关于系统调用的知识\",\"children\":[]},{\"level\":3,\"title\":\"本题思路\",\"slug\":\"本题思路\",\"link\":\"#本题思路\",\"children\":[]},{\"level\":3,\"title\":\"执行过程：\",\"slug\":\"执行过程\",\"link\":\"#执行过程\",\"children\":[]},{\"level\":3,\"title\":\"编写exp：\",\"slug\":\"编写exp\",\"link\":\"#编写exp\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.5,\"words\":1351},\"filePathRelative\":\"pwn/pwn05-ret2syscall.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
