const Koa = require('koa')
const send = require('koa-send') // 处理些静态资源
const path = require('path')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const staticRouter = require('./routers/prod-static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDb = require('./db/db')
const config = require('../app.config')

const isDev = process.env.NODE_ENV === 'development'
const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()
app.keys = ['vue ssr key']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

app.use(async (ctx, next) => {
  try {
    console.log('request with path:', ctx.path)
    await next()
  } catch (err) {
    console.error(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})
app.use(koaBody())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes(), apiRouter.allowedMethods())
app.use(userRouter.routes(), userRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/prod-ssr')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
