/**
 * 生产环境中, 需要对资源引用路径进行处理
 */
const Router = require('koa-router')
const send = require('koa-router')

const staticRouter = new Router({prefix: '/public'})
staticRouter.get('/*', async (ctx) => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
