export const data = JSON.parse("{\"key\":\"v-972ba8e0\",\"path\":\"/pwn/pwn04-ret2shellcode.html\",\"title\":\"04.ret2shellcode\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"04.ret2shellcode 原理 ret2shellcode，当程序当中没有system函数时，我们需要自己往栈上写入一段shellcode，然后控制eip使其指向shellcode的地址。 shellcode 指的是用于完成某个功能的汇编代码，常见的功能主要是获取目标系统的 shell。 在栈溢出的基础上，要想执行 shellcode，需要对应的程序\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://www.lovecode.icu/pwn/pwn04-ret2shellcode.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"菜鸡的自我救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"04.ret2shellcode\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"原理\",\"slug\":\"原理\",\"link\":\"#原理\",\"children\":[]},{\"level\":2,\"title\":\"例题（来自ctfwiki）：\",\"slug\":\"例题-来自ctfwiki\",\"link\":\"#例题-来自ctfwiki\",\"children\":[{\"level\":3,\"title\":\"首先checksec：\",\"slug\":\"首先checksec\",\"link\":\"#首先checksec\",\"children\":[]},{\"level\":3,\"title\":\"然后ida32打开：\",\"slug\":\"然后ida32打开\",\"link\":\"#然后ida32打开\",\"children\":[]},{\"level\":3,\"title\":\"思路：\",\"slug\":\"思路\",\"link\":\"#思路\",\"children\":[]},{\"level\":3,\"title\":\"exp：\",\"slug\":\"exp\",\"link\":\"#exp\",\"children\":[]}]}],\"readingTime\":{\"minutes\":1.81,\"words\":542},\"filePathRelative\":\"pwn/pwn04-ret2shellcode.md\"}")

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
