const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  ctx.headers['content-type'] = 'text/html'
  // context 作用: 是用在服务端渲染时,作为参数传入[vue-server-renderer]进去的
  // vue-server-renderer 渲染完成后,会插入一堆的属性,这些属性可以很方便地让我们来渲染HTML
  // 包括客户端css路径,js路径,如果用了 vue-style-loader,如果没有.vue 文件中css 单独抽离
  // 会在里面生成 style 标签,会有当前 url 路由下所需样式的内容,可以直接渲染HTML上面
  const context = { url: ctx.path, user: ctx.session.user }
  try {
    const appString = await renderer.renderToString(context)
    // 在 todo.vue asyncData 中, replace('/login') 页面
    // 判断需要做 redirect 在 server-entry context 中已经知道需要做跳转,
    // 但是我们要 renderToString 服务端中最花费时间后,才做跳转
    // 以上原因是: 我们使用了 dev-ssr 中 createBundleRenderer 方法

    // 要解决以上问题: 可以通过 createRenderer 去做, 不需要 bundle, 能更好控制 context
    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }
    const { title } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(), // 带有 style 标签的所有样式
      scripts: context.renderScripts(),
      title: title.text(),
      initalState: context.renderState(), // 在vue-server-renderer 里面,在做 renderToString时,不渲染完成后,会把store里面state
      // 拿出来,然后放到 renderState 上面
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }

}
