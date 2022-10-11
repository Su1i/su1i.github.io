import { sidebar } from "vuepress-theme-hope";
// import { highQualityTechnicalArticles } from "./sidebar/high-quality-technical-articles";
// import { aboutTheAuthor } from "./sidebar/about-the-author";
// import { books } from "./sidebar/books";
// import { openSourceProject } from "./sidebar/open-source-project";

export const sidebarConfig = sidebar({
  // 应该把更精确的路径放置在前边
  // "/open-source-project/": openSourceProject,
  // "/books/": books,
  // "/about-the-author/": aboutTheAuthor,
  // "/high-quality-technical-articles/": highQualityTechnicalArticles,
  // "/javaguide/": ["intro", "history", "contribution-guideline", "faq", "todo"],
  // "/zhuanlan/": [
  //   "java-mian-shi-zhi-bei",
  //   "handwritten-rpc-framework",
  //   "source-code-reading",
  // ],
  // 必须放在最后面
  "/": [

    {
      text: "Java",
      icon: "java",
      prefix: "java/",
      collapsable: true,
      children: [
        "Java学习路线",
        "尚硅谷_宋红康_JDBC",
        // {
        //   text: "基础",
        //   prefix: "basis/",
        //   icon: "basic",
        //   collapsable: true,
        //   children: [
        //     "java-basic-questions-01",
        //     "java-basic-questions-02",
        //     "java-basic-questions-03",
        //     {
        //       text: "重要知识点",
        //       icon: "star",
        //       collapsable: true,
        //       children: [
        //         "why-there-only-value-passing-in-java",
        //         "serialization",
        //         "generics-and-wildcards",
        //         "reflection",
        //         "proxy",
        //         "bigdecimal",
        //         "unsafe",
        //         "spi",
        //         "syntactic-sugar",
        //       ],
        //     },
        //   ],
        // },
        // {
        //   text: "集合",
        //   prefix: "collection/",
        //   icon: "container",
        //   collapsable: true,
        //   children: [
        //     "java-collection-questions-01",
        //     "java-collection-questions-02",
        //     "java-collection-precautions-for-use",
        //     {
        //       text: "源码分析",
        //       collapsable: true,
        //       icon: "star",
        //       children: [
        //         "arraylist-source-code",
        //         "hashmap-source-code",
        //         "concurrent-hash-map-source-code",
        //       ],
        //     },
        //   ],
        // },
        //
        // {
        //   text: "IO",
        //   prefix: "io/",
        //   icon: "code",
        //   collapsable: true,
        //   children: ["io-basis", "io-design-patterns", "io-model"],
        // },
        // {
        //   text: "并发编程",
        //   prefix: "concurrent/",
        //   icon: "et-performance",
        //   collapsable: true,
        //   children: [
        //     "java-concurrent-questions-01",
        //     "java-concurrent-questions-02",
        //     "java-concurrent-questions-03",
        //     {
        //       text: "重要知识点",
        //       icon: "star",
        //       collapsable: true,
        //       children: [
        //         "jmm",
        //         "java-thread-pool-summary",
        //         "java-thread-pool-best-practices",
        //         "java-concurrent-collections",
        //         "aqs",
        //         "atomic-classes",
        //         "threadlocal",
        //         "completablefuture-intro",
        //       ],
        //     },
        //   ],
        // },
        // {
        //   text: "JVM",
        //   prefix: "jvm/",
        //   icon: "virtual_machine",
        //   collapsable: true,
        //   children: [
        //     "memory-area",
        //     "jvm-garbage-collection",
        //     "class-file-structure",
        //     "class-loading-process",
        //     "classloader",
        //     "jvm-parameters-intro",
        //     "jvm-intro",
        //     "jdk-monitoring-and-troubleshooting-tools",
        //   ],
        // },
        // {
        //   text: "新特性",
        //   prefix: "new-features/",
        //   icon: "featured",
        //   collapsable: true,
        //   children: [
        //     "java8-common-new-features",
        //     "java8-tutorial-translate",
        //     "java9",
        //     "java10",
        //     "java11",
        //     "java12-13",
        //     "java14",
        //     "java15",
        //     "java16",
        //     "java17",
        //     "java18",
        //     "java19",
        //   ],
        // },
      ],
    },
    {
      text: "常用框架",
      icon: "tip",
      link: "framework/",
      prefix: "framework/",
      collapsable: true,
      children: "structure",
    },

    {
      text: "数据库",
      icon: "database",
      prefix: "database/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "LeetCode",
      icon: "tip",
      link: "leetcode/",
      prefix: "leetcode/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "计算机基础",
      icon: "computer",
      prefix: "basics/",
      collapsable: true,
      children: "structure",
    },

    {
      text: "开发工具",
      icon: "tool",
      prefix: "tools/",
      collapsable: true,
      children: [
        {
          text: "linux",
          icon: "linux",
          prefix: "linux/",
          collapsable: true,
          children: ["01.安装linux系统的多种方式"],
        },
      ],
    },
    {
      text: "English",
      icon: "tip",
      link: "English/",
      prefix: "English/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "二进制安全",
      icon: "tip",
      link: "pwn/",
      prefix: "pwn/",
      collapsable: true,
      children: "structure",
    },
    {
      text: "python",
      icon: "tip",
      link: "python/",
      prefix: "python/",
      collapsable: true,
      children: [{
        icon: "note",
        text: "python基础：",
        prefix: "python基础/",
        link: "python基础/",
        children: "structure",
      },
        {
          icon: "discover",
          text: "Django：",
          prefix: "Django/",
          link: "Django/",
          children: "structure",
        },
      ],

    },
  ],
});
