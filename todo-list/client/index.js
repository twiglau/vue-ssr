/*
* 真正挂载 app.vue
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import createRouter from './config/router'
import createStore from './store/store'
/* 静态资源 */
// import './assets/styles/test.css';
import './assets/styles/style.styl'
// import './assets/styles/test-stylus.styl';
import './assets/images/bg.jpeg'
Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 动态注册模块
// store.registerModule('c', {
//   state: {
//     text: 'c3'
//   }
// })

// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new count watched ', newCount)
// })

// store.subscribe((mutation, state) => {
//   console.group()
//   console.log(mutation.type)
//   console.log(mutation.payload)
//   console.groupEnd()
// })

// store.subscribeAction((action, state) => {
//   console.group()
//   console.log(action.type)
//   console.log(action.payload)
//   console.groupEnd()
// })

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
  store,
  render: (h) => h(App)
}).$mount('#root') // root
