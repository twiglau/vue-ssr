const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user'})

userRouter.post('/login', (ctx) => {
  const user = ctx.request.body
  if (user.username === 'jojo' && user.password === 'jojo11') {
    ctx.session.user = {
      username: 'jojo'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'jojo'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'password or username error'
    }
  }
})

module.exports = userRouter
