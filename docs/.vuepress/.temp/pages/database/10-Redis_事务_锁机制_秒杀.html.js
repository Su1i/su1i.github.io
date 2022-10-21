export const data = JSON.parse("{\"key\":\"v-c225170a\",\"path\":\"/database/10-Redis_%E4%BA%8B%E5%8A%A1_%E9%94%81%E6%9C%BA%E5%88%B6_%E7%A7%92%E6%9D%80.html\",\"title\":\"10.Redis_事务_锁机制_秒杀\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"10.Redis_事务_锁机制_秒杀\",\"index\":true,\"category\":[\"database\"],\"summary\":\"10.Redis事务锁机制_秒杀 10.1 Redis的事务定义 Redis事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。 Redis事务的主要作用就是串联多个命令防止别的命令插队。 10.2 Multi、Exec、discard 从输入Multi命令开始，输入的命令都会依次进\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://www.lovecode.icu/database/10-Redis_%E4%BA%8B%E5%8A%A1_%E9%94%81%E6%9C%BA%E5%88%B6_%E7%A7%92%E6%9D%80.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"菜鸡的自我救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"10.Redis_事务_锁机制_秒杀\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"10.1 Redis的事务定义\",\"slug\":\"_10-1-redis的事务定义\",\"link\":\"#_10-1-redis的事务定义\",\"children\":[]},{\"level\":2,\"title\":\"10.2 Multi、Exec、discard\",\"slug\":\"_10-2-multi、exec、discard\",\"link\":\"#_10-2-multi、exec、discard\",\"children\":[]},{\"level\":2,\"title\":\"10.3 事务的错误处理\",\"slug\":\"_10-3-事务的错误处理\",\"link\":\"#_10-3-事务的错误处理\",\"children\":[]},{\"level\":2,\"title\":\"10.4 为什么要做成事务\",\"slug\":\"_10-4-为什么要做成事务\",\"link\":\"#_10-4-为什么要做成事务\",\"children\":[]},{\"level\":2,\"title\":\"10.5 事务冲突的问题\",\"slug\":\"_10-5-事务冲突的问题\",\"link\":\"#_10-5-事务冲突的问题\",\"children\":[{\"level\":3,\"title\":\"10.5.1 例子\",\"slug\":\"_10-5-1-例子\",\"link\":\"#_10-5-1-例子\",\"children\":[]},{\"level\":3,\"title\":\"10.5.2 悲观锁\",\"slug\":\"_10-5-2-悲观锁\",\"link\":\"#_10-5-2-悲观锁\",\"children\":[]},{\"level\":3,\"title\":\"10.5.3 乐观锁\",\"slug\":\"_10-5-3-乐观锁\",\"link\":\"#_10-5-3-乐观锁\",\"children\":[]},{\"level\":3,\"title\":\"10.5.4 WATCH key [key ...]\",\"slug\":\"_10-5-4-watch-key-key\",\"link\":\"#_10-5-4-watch-key-key\",\"children\":[]},{\"level\":3,\"title\":\"10.5.5 unwatch\",\"slug\":\"_10-5-5-unwatch\",\"link\":\"#_10-5-5-unwatch\",\"children\":[]}]},{\"level\":2,\"title\":\"10.6 Redis事务三特性\",\"slug\":\"_10-6-redis事务三特性\",\"link\":\"#_10-6-redis事务三特性\",\"children\":[]}],\"readingTime\":{\"minutes\":3.13,\"words\":940},\"filePathRelative\":\"database/10-Redis_事务_锁机制_秒杀.md\"}")

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
