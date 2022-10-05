export const data = JSON.parse("{\"key\":\"v-4932acfb\",\"path\":\"/pwn/pwn08-%E5%A0%86%E5%88%A9%E7%94%A8%E4%B9%8Buaf.html\",\"title\":\"08.use_after_free\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"08.useafterfree 原理 简单的说，Use After Free 就是其字面所表达的意思，当一个内存块被释放之后再次被使用。但是其实这里有以下几种情况： 内存块被释放后，其对应的指针被设置为 NULL ， 然后再次使用，自然程序会崩溃。; 内存块被释放后，其对应的指针没有被设置为 NULL ，然后在它下一次被使用之前，没有代码对这块内存块进行修改\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://github.com/Su1i/pwn/pwn08-%E5%A0%86%E5%88%A9%E7%94%A8%E4%B9%8Buaf.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"菜鸡的自我救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"08.use_after_free\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"原理\",\"slug\":\"原理\",\"link\":\"#原理\",\"children\":[]},{\"level\":2,\"title\":\"HITCON-training lab 10 hacknote\",\"slug\":\"hitcon-training-lab-10-hacknote\",\"link\":\"#hitcon-training-lab-10-hacknote\",\"children\":[{\"level\":3,\"title\":\"利用思路：\",\"slug\":\"利用思路\",\"link\":\"#利用思路\",\"children\":[]},{\"level\":3,\"title\":\"利用脚本：\",\"slug\":\"利用脚本\",\"link\":\"#利用脚本\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.19,\"words\":1256},\"filePathRelative\":\"pwn/pwn08-堆利用之uaf.md\"}")

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
