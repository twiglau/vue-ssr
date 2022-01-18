/*
* 真正挂载 app.vue
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './config/router'

/* 静态资源 */
// import './assets/styles/test.css';
import './assets/styles/style.styl'
// import './assets/styles/test-stylus.styl';
import './assets/images/bg.jpeg'
Vue.use(VueRouter)
const router = createRouter()

router.beforeEach((to, from, next) => {
  console.log('beforeEach invoked')
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve invoked')
  next()
})
router.afterEach((to, from) => {
  console.log('afterEach invoked')
})

// 不需要手动创建节点
// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root') // root
