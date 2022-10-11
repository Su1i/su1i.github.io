export const data = JSON.parse("{\"key\":\"v-32b25057\",\"path\":\"/pwn/pwn03-ret2text.html\",\"title\":\"03.ret2text\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"03.ret2text 什么是栈溢出： 栈溢出指的是程序向栈中某个变量中写入的字节数超过了这个变量本身所申请的字节数，因而导致与其相邻的栈中的变量的值被改变（比如gets函数，他不会去验证你输入的值的长度，通过这个函数，你可以往一个本身大小为4字节的数组中填入任意大小的数据，如果填入8字节的数据，将会导致栈溢出，进而程序报错）。就像是往杯子里倒水，水满了溢出\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://www.lovecode.icu/pwn/pwn03-ret2text.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"菜鸡的自我救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"03.ret2text\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"什么是栈溢出：\",\"slug\":\"什么是栈溢出\",\"link\":\"#什么是栈溢出\",\"children\":[]},{\"level\":2,\"title\":\"例题：ctfwiki ret2text\",\"slug\":\"例题-ctfwiki-ret2text\",\"link\":\"#例题-ctfwiki-ret2text\",\"children\":[{\"level\":3,\"title\":\"首先，cheaksec。\",\"slug\":\"首先-cheaksec。\",\"link\":\"#首先-cheaksec。\",\"children\":[]},{\"level\":3,\"title\":\"ida分析\",\"slug\":\"ida分析\",\"link\":\"#ida分析\",\"children\":[]},{\"level\":3,\"title\":\"如何确定栈溢出所需要的垃圾数据长度？\",\"slug\":\"如何确定栈溢出所需要的垃圾数据长度\",\"link\":\"#如何确定栈溢出所需要的垃圾数据长度\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.61,\"words\":1383},\"filePathRelative\":\"pwn/pwn03-ret2text.md\"}")

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
