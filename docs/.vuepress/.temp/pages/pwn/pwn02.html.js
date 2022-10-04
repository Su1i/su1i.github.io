export const data = JSON.parse("{\"key\":\"v-3eb0f1f1\",\"path\":\"/pwn/pwn02.html\",\"title\":\"02.汇编函数调用过程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"02.汇编函数调用过程 C语言函数调用栈 测试程序： 编译指令 32位ida反汇编之后：main函数： sum函数： 汇编指令： push ebp：将ebp寄存器中的值压入栈中pop esi ：将栈中的数据放入esi寄存器中call ：将当前的指令指针EIP(该指针指向紧接在call指令后的下条指令)压入堆栈，以备返回时能恢复执行下条指令；然后设置EIP指向\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/pwn/pwn02.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"文档演示\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"02.汇编函数调用过程\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"C语言函数调用栈\",\"slug\":\"c语言函数调用栈\",\"link\":\"#c语言函数调用栈\",\"children\":[{\"level\":3,\"title\":\"汇编指令：\",\"slug\":\"汇编指令\",\"link\":\"#汇编指令\",\"children\":[]},{\"level\":3,\"title\":\"测试程序调用sum函数过程：\",\"slug\":\"测试程序调用sum函数过程\",\"link\":\"#测试程序调用sum函数过程\",\"children\":[]}]}],\"readingTime\":{\"minutes\":6.02,\"words\":1805},\"filePathRelative\":\"pwn/pwn02-汇编函数调用过程.md\"}")

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
