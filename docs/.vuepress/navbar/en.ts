import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { text: "个人笔记", icon: "note", link: "/demo/" },
  // { text: "English", icon: "note", link: "/demo/" },
  // { text: "LeetCode", icon: "note", link: "/demo/" },
  {
    text: "项目文档",
    icon: "note",
    prefix: "/guide/",
    children: [
      {
        text: "劝学网课系统",
        icon: "creative",
        link: "/demo/"
      },
    ],
  },
  { text: "杂七杂八", icon: "blog", link: "/blog/" },
]);
