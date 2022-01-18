import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    mode: 'history',
    routes,
    // base: '/base/', // 作为整个应用的基路径
    // linkActiveClass: 'active-link', // 全局样式时, 会用到
    // linkExactActiveClass: 'exact-active-link', // 与 linkActiveClass: /login 的区别, 是准确匹配: /login/exact
    scrollBehavior (to, form, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // },
    // fallback: true, //
  })
}
