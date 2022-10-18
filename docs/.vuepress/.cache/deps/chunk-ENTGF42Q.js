import {
  useAutoLink,
  useThemeLocaleData
} from "./chunk-2Y2GJADG.js";
import {
  Ht
} from "./chunk-QIYOGKIW.js";
import {
  AutoLink_default,
  Icon_default
} from "./chunk-5B7P5QJ5.js";
import {
  ensureEndingSlash,
  isLinkExternal,
  isPlainObject
} from "./chunk-LS4IQIE6.js";
import {
  client_exports
} from "./chunk-FECFGNAG.js";
import {
  useRoute
} from "./chunk-U27KJSRC.js";
import {
  computed,
  h,
  inject,
  provide
} from "./chunk-4YVVQK3V.js";
import {
  isArray,
  isString
} from "./chunk-XYQ66V4O.js";

// node_modules/vuepress-theme-hope/lib/client/modules/sidebar/utils/isActive.js
var isActiveSidebarItem = (route, item, exact = false) => {
  if ("activeMatch" in item)
    return new RegExp(item.activeMatch).test(route.path);
  if (Ht(route, item.link))
    return true;
  if (item.children && !exact)
    return item.children.some((child) => isActiveSidebarItem(route, child));
  return false;
};
var isMatchedSidebarItem = (route, item) => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group")
        return isMatchedSidebarItem(route, child);
      return child.type === "page" && isActiveSidebarItem(route, child, true);
    }) || "prefix" in item && Ht(route, item.prefix);
  return false;
};

// node_modules/vuepress-theme-hope/lib/client/modules/sidebar/composables/render.js
var renderItem = (config, props) => config.link ? h(AutoLink_default, {
  ...props,
  config
}) : h("p", props, [h(Icon_default, { icon: config.icon }), config.text]);
var renderChildren = (children) => {
  const route = useRoute();
  if (!children)
    return null;
  return h("ul", { class: "sidebar-sub-headers" }, children.map((child) => {
    const active = isActiveSidebarItem(route, child, true);
    return h("li", { class: "sidebar-sub-header" }, [
      renderItem(child, {
        class: ["sidebar-link", "heading", { active }]
      }),
      renderChildren(child.children)
    ]);
  }));
};

// node_modules/vuepress-theme-hope/lib/client/modules/sidebar/composables/utils.js
var resolvePrefix = (prefix = "", path = "") => path.startsWith("/") ? path : `${ensureEndingSlash(prefix)}${path}`;

// docs/.vuepress/.temp/theme-hope/sidebar.js
var sidebarData = { "/java/": ["README.md", "Java\u5B66\u4E60\u8DEF\u7EBF.md", "\u5C1A\u7845\u8C37_\u5B8B\u7EA2\u5EB7_JDBC.md"], "/leetcode/": ["README.md"], "/framework/": ["README.md", "SpringSecurity.md"], "/basics/": ["README.md"], "/English/": ["README.md", "\u97F3\u6807.md", "\u8BED\u6CD5.md"], "/pwn/": ["README.md", "pwn01-\u73AF\u5883\u914D\u7F6E.md", "pwn02-\u6C47\u7F16\u51FD\u6570\u8C03\u7528\u8FC7\u7A0B.md", "pwn03-ret2text.md", "pwn04-ret2shellcode.md", "pwn05-ret2syscall.md", "pwn06-ret2libc.md", "pwn07-\u6574\u6570\u5B89\u5168.md", "pwn08-\u5806\u5229\u7528\u4E4Buaf.md", "GCC \u53C2\u6570\u8BE6\u89E3.md"], "/python/python\u57FA\u7840/": ["README.md", "01.\u7B2C\u4E00\u7AE0-\u8D77\u6B65.md", "02.\u7B2C\u4E8C\u7AE0-\u53D8\u91CF\u548C\u7B80\u5355\u6570\u636E\u7ED3\u6784.md", "03.\u7B2C\u4E09\u7AE0-\u5217\u8868\u7B80\u4ECB.md", "04.\u7B2C\u56DB\u7AE0-\u64CD\u4F5C\u5217\u8868.md", "05.\u7B2C\u4E94\u7AE0-if\u8BED\u53E5.md", "06.\u7B2C\u516D\u7AE0-\u5B57\u5178.md"], "/python/Django/": ["README.md", "\u9759\u6001\u6587\u4EF6\u914D\u7F6E.md", "\u8FDE\u63A5\u6570\u636E\u5E93.md", "\u8DEF\u7531\u5C42.md", "Django ORM.md", "Django\u8BF7\u6C42\u751F\u547D\u5468\u671F\u6D41\u7A0B\u56FE.md", "FBV\u4E0ECBV.md", "request\u5BF9\u8C61\u65B9\u6CD5\u521D\u8BC6.md"] };

// node_modules/vuepress-theme-hope/lib/client/modules/sidebar/composables/resolveConfig.js
var headerToSidebarItem = (header, headerDepth) => {
  const page = (0, client_exports.usePageData)();
  return {
    type: "heading",
    text: header.title,
    link: `${page.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, headerDepth)
  };
};
var headersToSidebarItemChildren = (headers, headerDepth) => headerDepth > 0 ? headers.map((header) => headerToSidebarItem(header, headerDepth - 1)) : [];
var resolveHeadingSidebarItems = (headerDepth) => {
  const page = (0, client_exports.usePageData)();
  return headersToSidebarItemChildren(page.value.headers, headerDepth);
};
var resolveArraySidebarItems = (sidebarConfig, headerDepth, prefix = "") => {
  const page = (0, client_exports.usePageData)();
  const route = useRoute();
  const handleChildItem = (item, pathPrefix = prefix) => {
    var _a;
    const childItem = isString(item) ? useAutoLink(resolvePrefix(pathPrefix, item)) : item.link ? {
      ...item,
      ...!isLinkExternal(item.link) ? { link: useAutoLink(resolvePrefix(pathPrefix, item.link)).link } : {}
    } : item;
    if ("children" in childItem) {
      const prefix2 = resolvePrefix(pathPrefix, childItem.prefix);
      const children = childItem.children === "structure" ? sidebarData[prefix2] : childItem.children;
      return {
        type: "group",
        ...childItem,
        prefix: prefix2,
        children: children.map((item2) => handleChildItem(item2, prefix2))
      };
    }
    return {
      type: "page",
      ...childItem,
      children: childItem.link === route.path ? headersToSidebarItemChildren(
        ((_a = page.value.headers[0]) == null ? void 0 : _a.level) === 1 ? page.value.headers[0].children : page.value.headers,
        headerDepth
      ) : []
    };
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
var resolveMultiSidebarItems = (sidebarConfig, headerDepth) => {
  const route = useRoute();
  const keys = Object.keys(sidebarConfig).sort((x, y) => y.length - x.length);
  for (const base of keys) {
    if (decodeURI(route.path).startsWith(base)) {
      const matchedConfig = sidebarConfig[base];
      return matchedConfig ? resolveArraySidebarItems(matchedConfig === "structure" ? sidebarData[base] : matchedConfig, headerDepth, base) : [];
    }
  }
  console.warn(`${route.path} do not have valid sidebar config`);
  return [];
};
var resolveSidebarItems = () => {
  var _a, _b, _c, _d;
  const routeLocale = (0, client_exports.useRouteLocale)();
  const frontmatter = (0, client_exports.usePageFrontmatter)();
  const themeLocale = useThemeLocaleData();
  const sidebarConfig = frontmatter.value.home ? false : (_b = (_a = frontmatter.value.sidebar) != null ? _a : themeLocale.value.sidebar) != null ? _b : "structure";
  const headerDepth = (_d = (_c = frontmatter.value.headerDepth) != null ? _c : themeLocale.value.headerDepth) != null ? _d : 2;
  return sidebarConfig === false ? [] : sidebarConfig === "heading" ? resolveHeadingSidebarItems(headerDepth) : sidebarConfig === "structure" ? resolveArraySidebarItems(sidebarData[routeLocale.value], headerDepth, routeLocale.value) : isArray(sidebarConfig) ? resolveArraySidebarItems(sidebarConfig, headerDepth) : isPlainObject(sidebarConfig) ? resolveMultiSidebarItems(sidebarConfig, headerDepth) : [];
};

// node_modules/vuepress-theme-hope/lib/client/modules/sidebar/composables/setup.js
var sidebarItemsSymbol = Symbol.for("sidebarItems");
var setupSidebarItems = () => {
  const sidebarItems = computed(() => resolveSidebarItems());
  provide(sidebarItemsSymbol, sidebarItems);
};
var useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};

export {
  isActiveSidebarItem,
  isMatchedSidebarItem,
  renderItem,
  renderChildren,
  resolvePrefix,
  sidebarItemsSymbol,
  setupSidebarItems,
  useSidebarItems
};
//# sourceMappingURL=chunk-ENTGF42Q.js.map
