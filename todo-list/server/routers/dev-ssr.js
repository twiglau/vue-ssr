const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
// Memory-fs api 和 node 自带 fs API 是一样的,之间区别: memory-fs 不把文件写入的磁盘上面
// 而是直接写入的内存里面
const MemoryFs = require('memory-fs')

const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')

const serverConfig = require('../../build/webpack.config.server')
const { Stats } = require('webpack')

const serverCompiler = webpack(serverConfig)
// 将所有文件输出放入到 memory-fs 当中
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs
//
let bundle
// watch 监听文件改变,重新执行打包,生成新的文件
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson() // 像eslint 的报错,会放到 stats 当中
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(err => console.error(err))

  const bundlePath = path.join(
    serverConfig.output.path, // 输出路径
    'vue-ssr-server-bundle.json' // vue-server-renderer 默认输出文件名
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '您等一会,别着急...'
    return
  }
  // 需要一个模板来生成html ejs 模板引擎渲染 html
  const template = fs.readFileSync(
    path.join(__dirname, '../server/server.template.ejs')
  )
  // 需要获取webpack帮我们打包出来 javaScript 文件的地址
  // 问题:从webpack-dev-server中获取js文件到当前 node 环境下(server)
  // 可以向 webpack-dev-server 发送一个请求拿到 打包的文件
  // vue-ssr-client-manifest.json 文件需要插件来生成: vue-server-renderer/client-plugin
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8080/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data
  // 声明一个 render
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false, // 该提供一个默认template,并且限制比较多. 那么不让其注入默认操作
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router


