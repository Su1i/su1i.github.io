import { defineClientConfig } from "@vuepress/client";
import { setupPWA } from "C:/Users/32937/Desktop/demo/su1i.github.io/node_modules/vuepress-plugin-pwa2/lib/client/composables/setup.js";
import SWUpdatePopup from "C:/Users/32937/Desktop/demo/su1i.github.io/node_modules/vuepress-plugin-pwa2/lib/client/components/SWUpdatePopup.js";


export default defineClientConfig({
  setup: () => {
    setupPWA();
  },
  rootComponents: [
    SWUpdatePopup,
    
  ],
});