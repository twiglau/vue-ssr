import createApp from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router} = createApp()

    router.push(context.url)
    router.onReady(() => {
      // 在服务端渲染,如果做些异步操作请求,会在每个组件里面去写一些内容
      // 那么我们要在路由准备好后,把当前 url 下匹配到的组件
      const matchedComponents = router.getMatchedComponents()
      if (matchedComponents.length === 0) {
        return reject(new Error('no component matched'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
