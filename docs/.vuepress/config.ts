import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "菜鸡的自我救赎",
      description: "后端开发萌新的个人知识库",
    },
    
  },

  theme,

  shouldPrefetch: false,
});
