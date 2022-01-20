/**
 * 客户端如果 index.js 文件作为入口, 其根本不依赖于 create-app.js
 * 在做服务端渲染时, 客户端的 js 需要做相应的配合的
 *
 * 增加该文件作为客户端入口后, webpack 文件相应配置也需要修改,测试环境 | 正式环境
 * 入口文件: entry: path.join(__dirname, '../client/index.js')
 * 变更为: entry: path.join(__dirname, '../client/client-entry.js')
 */
import createApp from "./create-app";
const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#root')
})
