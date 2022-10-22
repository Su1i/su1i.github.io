const l=JSON.parse('{"key":"v-da045586","path":"/framework/%E5%B0%9A%E7%A1%85%E8%B0%B7_%E5%AE%8B%E7%BA%A2%E5%BA%B7_JDBC.html","title":"JDBC\u6838\u5FC3\u6280\u672F","lang":"zh-CN","frontmatter":{"summary":"JDBC\u6838\u5FC3\u6280\u672F \u8BB2\u5E08\uFF1A\u5B8B\u7EA2\u5EB7 \u5FAE\u535A\uFF1A\u5C1A\u7845\u8C37-\u5B8B\u7EA2\u5EB7 --- \u7B2C1\u7AE0\uFF1AJDBC\u6982\u8FF0 1.1 \u6570\u636E\u7684\u6301\u4E45\u5316 \u6301\u4E45\u5316(persistence)\uFF1A\u628A\u6570\u636E\u4FDD\u5B58\u5230\u53EF\u6389\u7535\u5F0F\u5B58\u50A8\u8BBE\u5907\u4E2D\u4EE5\u4F9B\u4E4B\u540E\u4F7F\u7528\u3002\u5927\u591A\u6570\u60C5\u51B5\u4E0B\uFF0C\u7279\u522B\u662F\u4F01\u4E1A\u7EA7\u5E94\u7528\uFF0C\u6570\u636E\u6301\u4E45\u5316\u610F\u5473\u7740\u5C06\u5185\u5B58\u4E2D\u7684\u6570\u636E\u4FDD\u5B58\u5230\u786C\u76D8\u4E0A\u52A0\u4EE5\u201D\u56FA\u5316\u201D\uFF0C\u800C\u6301\u4E45\u5316\u7684\u5B9E\u73B0\u8FC7\u7A0B\u5927\u591A\u901A\u8FC7\u5404\u79CD\u5173\u7CFB\u6570\u636E\u5E93\u6765\u5B8C\u6210\u3002 ; \u6301\u4E45\u5316\u7684\u4E3B\u8981\u5E94\u7528\u662F\u5C06\u5185\u5B58\u4E2D\u7684\u6570\u636E\u5B58","head":[["meta",{"property":"og:url","content":"https://www.lovecode.icu/framework/%E5%B0%9A%E7%A1%85%E8%B0%B7_%E5%AE%8B%E7%BA%A2%E5%BA%B7_JDBC.html"}],["meta",{"property":"og:site_name","content":"\u83DC\u9E21\u7684\u81EA\u6211\u6551\u8D4E"}],["meta",{"property":"og:title","content":"JDBC\u6838\u5FC3\u6280\u672F"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-10-22T05:08:13.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:modified_time","content":"2022-10-22T05:08:13.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"\u7B2C1\u7AE0\uFF1AJDBC\u6982\u8FF0","slug":"\u7B2C1\u7AE0-jdbc\u6982\u8FF0","link":"#\u7B2C1\u7AE0-jdbc\u6982\u8FF0","children":[{"level":3,"title":"1.1 \u6570\u636E\u7684\u6301\u4E45\u5316","slug":"_1-1-\u6570\u636E\u7684\u6301\u4E45\u5316","link":"#_1-1-\u6570\u636E\u7684\u6301\u4E45\u5316","children":[]},{"level":3,"title":"1.2 Java\u4E2D\u7684\u6570\u636E\u5B58\u50A8\u6280\u672F","slug":"_1-2-java\u4E2D\u7684\u6570\u636E\u5B58\u50A8\u6280\u672F","link":"#_1-2-java\u4E2D\u7684\u6570\u636E\u5B58\u50A8\u6280\u672F","children":[]},{"level":3,"title":"1.3 JDBC\u4ECB\u7ECD","slug":"_1-3-jdbc\u4ECB\u7ECD","link":"#_1-3-jdbc\u4ECB\u7ECD","children":[]},{"level":3,"title":"1.4 JDBC\u4F53\u7CFB\u7ED3\u6784","slug":"_1-4-jdbc\u4F53\u7CFB\u7ED3\u6784","link":"#_1-4-jdbc\u4F53\u7CFB\u7ED3\u6784","children":[]},{"level":3,"title":"1.5 JDBC\u7A0B\u5E8F\u7F16\u5199\u6B65\u9AA4","slug":"_1-5-jdbc\u7A0B\u5E8F\u7F16\u5199\u6B65\u9AA4","link":"#_1-5-jdbc\u7A0B\u5E8F\u7F16\u5199\u6B65\u9AA4","children":[]}]},{"level":2,"title":"\u7B2C2\u7AE0\uFF1A\u83B7\u53D6\u6570\u636E\u5E93\u8FDE\u63A5","slug":"\u7B2C2\u7AE0-\u83B7\u53D6\u6570\u636E\u5E93\u8FDE\u63A5","link":"#\u7B2C2\u7AE0-\u83B7\u53D6\u6570\u636E\u5E93\u8FDE\u63A5","children":[{"level":3,"title":"2.1 \u8981\u7D20\u4E00\uFF1ADriver\u63A5\u53E3\u5B9E\u73B0\u7C7B","slug":"_2-1-\u8981\u7D20\u4E00-driver\u63A5\u53E3\u5B9E\u73B0\u7C7B","link":"#_2-1-\u8981\u7D20\u4E00-driver\u63A5\u53E3\u5B9E\u73B0\u7C7B","children":[]},{"level":3,"title":"2.2 \u8981\u7D20\u4E8C\uFF1AURL","slug":"_2-2-\u8981\u7D20\u4E8C-url","link":"#_2-2-\u8981\u7D20\u4E8C-url","children":[]},{"level":3,"title":"2.3 \u8981\u7D20\u4E09\uFF1A\u7528\u6237\u540D\u548C\u5BC6\u7801","slug":"_2-3-\u8981\u7D20\u4E09-\u7528\u6237\u540D\u548C\u5BC6\u7801","link":"#_2-3-\u8981\u7D20\u4E09-\u7528\u6237\u540D\u548C\u5BC6\u7801","children":[]},{"level":3,"title":"2.4 \u6570\u636E\u5E93\u8FDE\u63A5\u65B9\u5F0F\u4E3E\u4F8B","slug":"_2-4-\u6570\u636E\u5E93\u8FDE\u63A5\u65B9\u5F0F\u4E3E\u4F8B","link":"#_2-4-\u6570\u636E\u5E93\u8FDE\u63A5\u65B9\u5F0F\u4E3E\u4F8B","children":[]}]},{"level":2,"title":"\u7B2C3\u7AE0\uFF1A\u4F7F\u7528PreparedStatement\u5B9E\u73B0CRUD\u64CD\u4F5C","slug":"\u7B2C3\u7AE0-\u4F7F\u7528preparedstatement\u5B9E\u73B0crud\u64CD\u4F5C","link":"#\u7B2C3\u7AE0-\u4F7F\u7528preparedstatement\u5B9E\u73B0crud\u64CD\u4F5C","children":[{"level":3,"title":"3.1 \u64CD\u4F5C\u548C\u8BBF\u95EE\u6570\u636E\u5E93","slug":"_3-1-\u64CD\u4F5C\u548C\u8BBF\u95EE\u6570\u636E\u5E93","link":"#_3-1-\u64CD\u4F5C\u548C\u8BBF\u95EE\u6570\u636E\u5E93","children":[]},{"level":3,"title":"3.2 \u4F7F\u7528Statement\u64CD\u4F5C\u6570\u636E\u8868\u7684\u5F0A\u7AEF","slug":"_3-2-\u4F7F\u7528statement\u64CD\u4F5C\u6570\u636E\u8868\u7684\u5F0A\u7AEF","link":"#_3-2-\u4F7F\u7528statement\u64CD\u4F5C\u6570\u636E\u8868\u7684\u5F0A\u7AEF","children":[]},{"level":3,"title":"3.3 PreparedStatement\u7684\u4F7F\u7528","slug":"_3-3-preparedstatement\u7684\u4F7F\u7528","link":"#_3-3-preparedstatement\u7684\u4F7F\u7528","children":[]},{"level":3,"title":"3.4 ResultSet\u4E0EResultSetMetaData","slug":"_3-4-resultset\u4E0Eresultsetmetadata","link":"#_3-4-resultset\u4E0Eresultsetmetadata","children":[]},{"level":3,"title":"3.5 \u8D44\u6E90\u7684\u91CA\u653E","slug":"_3-5-\u8D44\u6E90\u7684\u91CA\u653E","link":"#_3-5-\u8D44\u6E90\u7684\u91CA\u653E","children":[]},{"level":3,"title":"3.6 JDBC API\u5C0F\u7ED3","slug":"_3-6-jdbc-api\u5C0F\u7ED3","link":"#_3-6-jdbc-api\u5C0F\u7ED3","children":[]}]},{"level":2,"title":"\u7AE0\u8282\u7EC3\u4E60","slug":"\u7AE0\u8282\u7EC3\u4E60","link":"#\u7AE0\u8282\u7EC3\u4E60","children":[]},{"level":2,"title":"\u7B2C4\u7AE0 \u64CD\u4F5CBLOB\u7C7B\u578B\u5B57\u6BB5","slug":"\u7B2C4\u7AE0-\u64CD\u4F5Cblob\u7C7B\u578B\u5B57\u6BB5","link":"#\u7B2C4\u7AE0-\u64CD\u4F5Cblob\u7C7B\u578B\u5B57\u6BB5","children":[{"level":3,"title":"4.1 MySQL BLOB\u7C7B\u578B","slug":"_4-1-mysql-blob\u7C7B\u578B","link":"#_4-1-mysql-blob\u7C7B\u578B","children":[]},{"level":3,"title":"4.2 \u5411\u6570\u636E\u8868\u4E2D\u63D2\u5165\u5927\u6570\u636E\u7C7B\u578B","slug":"_4-2-\u5411\u6570\u636E\u8868\u4E2D\u63D2\u5165\u5927\u6570\u636E\u7C7B\u578B","link":"#_4-2-\u5411\u6570\u636E\u8868\u4E2D\u63D2\u5165\u5927\u6570\u636E\u7C7B\u578B","children":[]},{"level":3,"title":"4.3 \u4FEE\u6539\u6570\u636E\u8868\u4E2D\u7684Blob\u7C7B\u578B\u5B57\u6BB5","slug":"_4-3-\u4FEE\u6539\u6570\u636E\u8868\u4E2D\u7684blob\u7C7B\u578B\u5B57\u6BB5","link":"#_4-3-\u4FEE\u6539\u6570\u636E\u8868\u4E2D\u7684blob\u7C7B\u578B\u5B57\u6BB5","children":[]},{"level":3,"title":"4.4 \u4ECE\u6570\u636E\u8868\u4E2D\u8BFB\u53D6\u5927\u6570\u636E\u7C7B\u578B","slug":"_4-4-\u4ECE\u6570\u636E\u8868\u4E2D\u8BFB\u53D6\u5927\u6570\u636E\u7C7B\u578B","link":"#_4-4-\u4ECE\u6570\u636E\u8868\u4E2D\u8BFB\u53D6\u5927\u6570\u636E\u7C7B\u578B","children":[]}]},{"level":2,"title":"\u7B2C5\u7AE0 \u6279\u91CF\u63D2\u5165","slug":"\u7B2C5\u7AE0-\u6279\u91CF\u63D2\u5165","link":"#\u7B2C5\u7AE0-\u6279\u91CF\u63D2\u5165","children":[{"level":3,"title":"5.1 \u6279\u91CF\u6267\u884CSQL\u8BED\u53E5","slug":"_5-1-\u6279\u91CF\u6267\u884Csql\u8BED\u53E5","link":"#_5-1-\u6279\u91CF\u6267\u884Csql\u8BED\u53E5","children":[]},{"level":3,"title":"5.2 \u9AD8\u6548\u7684\u6279\u91CF\u63D2\u5165","slug":"_5-2-\u9AD8\u6548\u7684\u6279\u91CF\u63D2\u5165","link":"#_5-2-\u9AD8\u6548\u7684\u6279\u91CF\u63D2\u5165","children":[]}]},{"level":2,"title":"\u7B2C6\u7AE0\uFF1A \u6570\u636E\u5E93\u4E8B\u52A1","slug":"\u7B2C6\u7AE0-\u6570\u636E\u5E93\u4E8B\u52A1","link":"#\u7B2C6\u7AE0-\u6570\u636E\u5E93\u4E8B\u52A1","children":[{"level":3,"title":"6.1 \u6570\u636E\u5E93\u4E8B\u52A1\u4ECB\u7ECD","slug":"_6-1-\u6570\u636E\u5E93\u4E8B\u52A1\u4ECB\u7ECD","link":"#_6-1-\u6570\u636E\u5E93\u4E8B\u52A1\u4ECB\u7ECD","children":[]},{"level":3,"title":"6.2 JDBC\u4E8B\u52A1\u5904\u7406","slug":"_6-2-jdbc\u4E8B\u52A1\u5904\u7406","link":"#_6-2-jdbc\u4E8B\u52A1\u5904\u7406","children":[]},{"level":3,"title":"6.3 \u4E8B\u52A1\u7684ACID\u5C5E\u6027","slug":"_6-3-\u4E8B\u52A1\u7684acid\u5C5E\u6027","link":"#_6-3-\u4E8B\u52A1\u7684acid\u5C5E\u6027","children":[]}]},{"level":2,"title":"\u7B2C7\u7AE0\uFF1ADAO\u53CA\u76F8\u5173\u5B9E\u73B0\u7C7B","slug":"\u7B2C7\u7AE0-dao\u53CA\u76F8\u5173\u5B9E\u73B0\u7C7B","link":"#\u7B2C7\u7AE0-dao\u53CA\u76F8\u5173\u5B9E\u73B0\u7C7B","children":[{"level":3,"title":"\u3010BaseDAO.java\u3011","slug":"\u3010basedao-java\u3011","link":"#\u3010basedao-java\u3011","children":[]},{"level":3,"title":"\u3010BookDAO.java\u3011","slug":"\u3010bookdao-java\u3011","link":"#\u3010bookdao-java\u3011","children":[]},{"level":3,"title":"\u3010UserDAO.java\u3011","slug":"\u3010userdao-java\u3011","link":"#\u3010userdao-java\u3011","children":[]},{"level":3,"title":"\u3010BookDaoImpl.java\u3011","slug":"\u3010bookdaoimpl-java\u3011","link":"#\u3010bookdaoimpl-java\u3011","children":[]},{"level":3,"title":"\u3010UserDaoImpl.java\u3011","slug":"\u3010userdaoimpl-java\u3011","link":"#\u3010userdaoimpl-java\u3011","children":[]},{"level":3,"title":"\u3010Book.java\u3011","slug":"\u3010book-java\u3011","link":"#\u3010book-java\u3011","children":[]},{"level":3,"title":"\u3010Page.java\u3011","slug":"\u3010page-java\u3011","link":"#\u3010page-java\u3011","children":[]},{"level":3,"title":"\u3010User.java\u3011","slug":"\u3010user-java\u3011","link":"#\u3010user-java\u3011","children":[]}]},{"level":2,"title":"\u7B2C8\u7AE0\uFF1A\u6570\u636E\u5E93\u8FDE\u63A5\u6C60","slug":"\u7B2C8\u7AE0-\u6570\u636E\u5E93\u8FDE\u63A5\u6C60","link":"#\u7B2C8\u7AE0-\u6570\u636E\u5E93\u8FDE\u63A5\u6C60","children":[{"level":3,"title":"8.1 JDBC\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u7684\u5FC5\u8981\u6027","slug":"_8-1-jdbc\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u7684\u5FC5\u8981\u6027","link":"#_8-1-jdbc\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u7684\u5FC5\u8981\u6027","children":[]},{"level":3,"title":"8.2 \u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u6280\u672F","slug":"_8-2-\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u6280\u672F","link":"#_8-2-\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u6280\u672F","children":[]},{"level":3,"title":"8.3 \u591A\u79CD\u5F00\u6E90\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u6C60","slug":"_8-3-\u591A\u79CD\u5F00\u6E90\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u6C60","link":"#_8-3-\u591A\u79CD\u5F00\u6E90\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u6C60","children":[]}]},{"level":2,"title":"\u7B2C9\u7AE0\uFF1AApache-DBUtils\u5B9E\u73B0CRUD\u64CD\u4F5C","slug":"\u7B2C9\u7AE0-apache-dbutils\u5B9E\u73B0crud\u64CD\u4F5C","link":"#\u7B2C9\u7AE0-apache-dbutils\u5B9E\u73B0crud\u64CD\u4F5C","children":[{"level":3,"title":"9.1 Apache-DBUtils\u7B80\u4ECB","slug":"_9-1-apache-dbutils\u7B80\u4ECB","link":"#_9-1-apache-dbutils\u7B80\u4ECB","children":[]},{"level":3,"title":"9.2 \u4E3B\u8981API\u7684\u4F7F\u7528","slug":"_9-2-\u4E3B\u8981api\u7684\u4F7F\u7528","link":"#_9-2-\u4E3B\u8981api\u7684\u4F7F\u7528","children":[]}]},{"level":2,"title":"JDBC\u603B\u7ED3","slug":"jdbc\u603B\u7ED3","link":"#jdbc\u603B\u7ED3","children":[]}],"git":{"createdTime":1666415293000,"updatedTime":1666415293000,"contributors":[{"name":"suli","email":"3293755911@qq.com","commits":1}]},"readingTime":{"minutes":53.58,"words":16074},"filePathRelative":"framework/\u5C1A\u7845\u8C37_\u5B8B\u7EA2\u5EB7_JDBC.md","localizedDate":"2022\u5E7410\u670822\u65E5"}');export{l as data};
