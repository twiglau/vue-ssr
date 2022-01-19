const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  ctx.headers['content-type'] = 'text/html'
  // context 作用: 是用在服务端渲染时,作为参数传入[vue-server-renderer]进去的
  // vue-server-renderer 渲染完成后,会插入一堆的属性,这些属性可以很方便地让我们来渲染HTML
  // 包括客户端css路径,js路径,如果用了 vue-style-loader,如果没有.vue 文件中css 单独抽离
  // 会在里面生成 style 标签,会有当前 url 路由下所需样式的内容,可以直接渲染HTML上面
  const context = { url: ctx.path }
  try {
    const appString = await renderer.renderToString(context)
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(), // 带有 style 标签的所有样式
      scripts: context.renderScripts()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }

}
