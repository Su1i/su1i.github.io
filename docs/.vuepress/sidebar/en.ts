import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    // {
    //   icon: "discover",
    //   text: "Demo",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "java",
      icon: "tip",
      link: "java/",
      prefix: "java/",
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
      text: "工具",
      icon: "tip",
      link: "tools/",
      prefix: "tools/",
      collapsable: true,
      children: "structure",
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
      // 必要的，分组的标题文字
      text: "二进制安全",
      // 可选的, 分组标题对应的图标
      icon: "tip",
      // 可选的, 分组标题对应的链接
      link: "pwn/",
      // 可选的，会添加到每个 item 链接地址之前
      prefix: "pwn/",
      // 可选的, 设置分组是否可以折叠，默认值是 false,
      collapsable: true,
      // 必要的，分组的子项目
      children: "structure",
      // children: [
      //   "README.md",
      // ],
    },
    {
      text: "python",
      icon: "tip",
      link: "python/",
      prefix: "python/",
      collapsable: true,
      children: [{
        icon: "discover",
        text: "python基础",
        prefix: "python基础/",
        link: "python基础/",
        children: "structure",
      },
        {
          icon: "discover",
          text: "Django",
          prefix: "Django/",
          link: "Django/",
          children: "structure",
        },
      ],
    },

    // "slides",
  ],
  // "/pwn/": "structure",
  // "/python/": "structure",
});
