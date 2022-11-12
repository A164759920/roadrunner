## 后端框架支持

- 基于 Node + KOA 开发的开箱简单配置服务器框架
- 链接 ：https://github.com/A164759920/koa_template

## [2022/11/12] 改造原 Vue2 项目 ，使其支持 Serverless + SCF

### ① 添加开发环境依赖并修改 package.json 参考(SCF vue-starter)

- npm install @serverless/platform-client-china -D --save

### ② 禁用原 webpack 的【webpack-bundle-analyze】插件

- 实测不禁用将导致 serverless 一直处于“初始化状态”

### ③ 添加 serverless.yml 和 main.yml 文件

- 详见[2022/11/11]更新

### ④ 存储桶资源添加跨域 CORS 配置

- SCF 本质将 dist 文件夹 push 到 COS 存储桶中
- 若原站和 SCF 存储桶存在不同存储桶间的资源访问，需互相配置 CORS

### ⑤ 【重点】原 Vue 项目使用 Vue-router 需配置内部重定向

- 由于单页应用的特性，SCF 部署 不重定向会导致 404 问题</br>
  该问题可以参考 Nginx 配置 try_files 的配置</br>
- COS 配置方法:参考 https://cloud.tencent.com/document/product/436/14984

- 只给出最基础配置

## [2022/11/11] GitHub Actions + 腾讯云 SCF CI/CD 自动部署打包

### ①serverless 支持

- **详见 ./serverless.yml 文件**

### ②Git Actions workflows 支持

- **详见 ./github/workflows/main.yml 文件**

### ③ Action 环境变量支持

- 使用前请先在仓库的 Settings/Secrets/Action 中配置腾讯云的 ID 和 KEY 以便 main.yml 文件使用

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

**_请在.env.production 中配置你的生产环境的 sts 线上鉴权接口地址_**</br>
**_建议提供 https 接口,以免报错_**</br>

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
