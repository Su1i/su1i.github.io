export const data = JSON.parse("{\"key\":\"v-5e4abeed\",\"path\":\"/pwn/pwn%E5%85%A5%E9%97%A807--%E6%95%B4%E6%95%B0%E5%AE%89%E5%85%A8.html\",\"title\":\"概述：\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"概述： 前面的文章介绍了基础的栈溢出，其实还有进阶的栈溢出，但是我累了，进阶的栈溢出留着以后写。先来学习整数安全。整数安全漏洞在ctf中还是很常见的，但是整数安全漏洞并不能直接getshell，通常配合栈溢出或堆溢出来利用。计算机中的整数分为有符号整数和无符号整数两种，通常保存在一个固定长度的内存空间中，他能存储的最大值和最小值都是固定的。整数的基本数据类型\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-docs-demo.netlify.app/pwn/pwn%E5%85%A5%E9%97%A807--%E6%95%B4%E6%95%B0%E5%AE%89%E5%85%A8.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"文档演示\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"概述：\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"checksec分析：\",\"slug\":\"checksec分析\",\"link\":\"#checksec分析\",\"children\":[]},{\"level\":2,\"title\":\"ida pro分析：\",\"slug\":\"ida-pro分析\",\"link\":\"#ida-pro分析\",\"children\":[]},{\"level\":2,\"title\":\"利用思路：\",\"slug\":\"利用思路\",\"link\":\"#利用思路\",\"children\":[]},{\"level\":2,\"title\":\"exp：\",\"slug\":\"exp\",\"link\":\"#exp\",\"children\":[]}],\"readingTime\":{\"minutes\":3.63,\"words\":1090},\"filePathRelative\":\"pwn/pwn入门07--整数安全.md\"}")

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
