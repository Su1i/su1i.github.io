export const data = JSON.parse("{\"key\":\"v-d64b5f2e\",\"path\":\"/pwn/pwn06-ret2libc.html\",\"title\":\"06.ret2libc\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"06.ret2libc 概述： 前文介绍了ROP的基本原理，但前面的方法有一些局限性，一旦目标程序调用的函数较少，或者使用动态编译，就会导致我们可以利用的gadget变少，从而无法达到利用效果。为了解决这种问题，我们可以选择使用ROP的方式，到动态链接库里面寻找gadget。即ret2libc。 静态链接和动态链接： 链接：程序经过预处理，编译，汇编，链接之\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://github.com/Su1i/pwn/pwn06-ret2libc.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"菜鸡的自我救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"06.ret2libc\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"概述：\",\"slug\":\"概述\",\"link\":\"#概述\",\"children\":[]},{\"level\":2,\"title\":\"静态链接和动态链接：\",\"slug\":\"静态链接和动态链接\",\"link\":\"#静态链接和动态链接\",\"children\":[{\"level\":3,\"title\":\"静态链接：\",\"slug\":\"静态链接\",\"link\":\"#静态链接\",\"children\":[]},{\"level\":3,\"title\":\"动态链接：\",\"slug\":\"动态链接\",\"link\":\"#动态链接\",\"children\":[]},{\"level\":3,\"title\":\"PLT&GOT表以及延迟绑定机制：\",\"slug\":\"plt-got表以及延迟绑定机制\",\"link\":\"#plt-got表以及延迟绑定机制\",\"children\":[]}]},{\"level\":2,\"title\":\"利用方式：\",\"slug\":\"利用方式\",\"link\":\"#利用方式\",\"children\":[{\"level\":3,\"title\":\"难度一：\",\"slug\":\"难度一\",\"link\":\"#难度一\",\"children\":[]},{\"level\":3,\"title\":\"难度二：\",\"slug\":\"难度二\",\"link\":\"#难度二\",\"children\":[]},{\"level\":3,\"title\":\"难度三：\",\"slug\":\"难度三\",\"link\":\"#难度三\",\"children\":[]}]}],\"readingTime\":{\"minutes\":14.57,\"words\":4370},\"filePathRelative\":\"pwn/pwn06-ret2libc.md\"}")

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
