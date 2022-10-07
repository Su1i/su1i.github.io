import { useStyleTag } from "C:/Users/32937/Desktop/demo/su1i.github.io/node_modules/vuepress-plugin-components/lib/client/composables/index.js";
import { h } from "vue";
import { defineClientConfig } from "@vuepress/client";
import Badge from "C:/Users/32937/Desktop/demo/su1i.github.io/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "C:/Users/32937/Desktop/demo/su1i.github.io/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "C:/Users/32937/Desktop/demo/su1i.github.io/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Badge", Badge);
    app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
    useStyleTag(`@import url("//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css");`, { id: "icon-assets" });
    
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
    
  ],
});