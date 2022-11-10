## 后端框架支持

- 基于 Node + KOA 开发的开箱简单配置服务器框架
- 链接 ：https://github.com/A164759920/koa_template

## [2022/11/8] Webpack 配置更新

**_详见 vue.config.js_**

- 生产环境注入 CDN
- 移除 console/debugger
- 去除 sourceMap
- 启用 terser 并行压缩

## [2022/11/8] 页面路由和渲染优化

- 路由跳转 使用 keep-alive 防止资源重复加载
- 优化了几个 script 标签 CDN 重复引入的问题
- 修复了 Album 页 DOWNLOAD 功能的问题

## [2022/11/7] 页面数据迁移至存储桶

**_请在.env.production 中配置你的生产环境的 sts 线上鉴权接口地址_**
**_建议提供 https 接口，以便报错_**

**_数据上云管理规则_**

- car 页面数据
  - 存放于 img/car/(drag or engine or truck) 文件夹下
- rat 页面数据

  - 存放于 img/rat 文件夹下

- Album 页面数据
  - 轮播图
    - 存放于 img/music/scrollpic 文件夹下
  - 播放歌曲 [暂只支持.mp3 格式]
    - 存放于 img/music/song 文件夹下
