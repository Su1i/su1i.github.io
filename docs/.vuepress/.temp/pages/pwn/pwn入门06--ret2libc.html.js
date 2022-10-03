export const data = JSON.parse("{\"key\":\"v-af1a6610\",\"path\":\"/pwn/pwn%E5%85%A5%E9%97%A806--ret2libc.html\",\"title\":\"概述：\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"概述： 前文介绍了ROP的基本原理，但前面的方法有一些局限性，一旦目标程序调用的函数较少，或者使用动态编译，就会导致我们可以利用的gadget变少，从而无法达到利用效果。为了解决这种问题，我们可以选择使用ROP的方式，到动态链接库里面寻找gadget。即ret2libc。 静态链接和动态链接： 链接：程序经过预处理，编译，汇编，链接之后可以生成可执行文件，链\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/pwn/pwn%E5%85%A5%E9%97%A806--ret2libc.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"文档演示\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"概述：\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"静态链接：\",\"slug\":\"静态链接\",\"link\":\"#静态链接\",\"children\":[]},{\"level\":2,\"title\":\"动态链接：\",\"slug\":\"动态链接\",\"link\":\"#动态链接\",\"children\":[]},{\"level\":2,\"title\":\"PLT&GOT表以及延迟绑定机制：\",\"slug\":\"plt-got表以及延迟绑定机制\",\"link\":\"#plt-got表以及延迟绑定机制\",\"children\":[]},{\"level\":2,\"title\":\"难度一：\",\"slug\":\"难度一\",\"link\":\"#难度一\",\"children\":[{\"level\":3,\"title\":\"例题初探：\",\"slug\":\"例题初探\",\"link\":\"#例题初探\",\"children\":[]},{\"level\":3,\"title\":\"那么如何让system的参数变成/bin/sh？\",\"slug\":\"那么如何让system的参数变成-bin-sh\",\"link\":\"#那么如何让system的参数变成-bin-sh\",\"children\":[]},{\"level\":3,\"title\":\"完整利用过程：\",\"slug\":\"完整利用过程\",\"link\":\"#完整利用过程\",\"children\":[]}]},{\"level\":2,\"title\":\"难度二：\",\"slug\":\"难度二\",\"link\":\"#难度二\",\"children\":[{\"level\":3,\"title\":\"例题初探：\",\"slug\":\"例题初探-1\",\"link\":\"#例题初探-1\",\"children\":[]},{\"level\":3,\"title\":\"如何写入/bin/sh字符串并找到字符串的位置?\",\"slug\":\"如何写入-bin-sh字符串并找到字符串的位置\",\"link\":\"#如何写入-bin-sh字符串并找到字符串的位置\",\"children\":[]},{\"level\":3,\"title\":\"完整过程：\",\"slug\":\"完整过程\",\"link\":\"#完整过程\",\"children\":[]}]},{\"level\":2,\"title\":\"难度三：\",\"slug\":\"难度三\",\"link\":\"#难度三\",\"children\":[{\"level\":3,\"title\":\"例题初探：\",\"slug\":\"例题初探-2\",\"link\":\"#例题初探-2\",\"children\":[]},{\"level\":3,\"title\":\"如何获取真实地址：\",\"slug\":\"如何获取真实地址\",\"link\":\"#如何获取真实地址\",\"children\":[]},{\"level\":3,\"title\":\"完整过程：\",\"slug\":\"完整过程-1\",\"link\":\"#完整过程-1\",\"children\":[]}]}],\"readingTime\":{\"minutes\":14.56,\"words\":4369},\"filePathRelative\":\"pwn/pwn入门06--ret2libc.md\"}")

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
