# 使用 React 及其主要生态重写以前的项目

## 探索
1. 在脚手架搭建上进行了 Webpack + React 的实践（这个项目就是自己搭建的脚手架）
2. 在目录结构上收到 Medium 上的一篇博客文章的启发
3. 在CSS的编写上收到网上的启发先后尝试了 Styled Components 和 CSS Modules
4. 在项目的主要编码上，路由规划，架构设计等等根据自己的思路来的，肯定存在很多问题

## 发现
1. 在编写搜索模块的时候，出现了已挂载容器根据路由改变内容的问题，被坑了很久。最后想到用 componentWillReceiveProps 生命周期钩子来解决，一下子解决了很多问题
2. 发现了很多小的以前没有写过的也没有想到过的写法