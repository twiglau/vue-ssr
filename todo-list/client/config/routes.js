import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
import Testparams from '../views/test/testparams.vue'
import Testprops from '../views/test/testprops.vue'
import Testrouterenter from '../views/test/testrouterenter.vue'
import Test from '../views/test/index.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    name: 'app',
    meta: {
      title: 'This a title',
      description: 'This a description'
    }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/test',
    component: Test,
    beforeEnter: (to, from, next) => {
      console.log('/test before Enter invoked')
      next()
    },
    // warning: 以下形式并不能起作用
    // components: { // 多个router-view 需要用到 components
    //   default: Testparams, // 如果router-view 没有 name ,那么为 default
    //   link: Testlink
    // },
    children: [
      {
        path: 'enter/:id',
        component: Testrouterenter
      },
      {
        path: 'link',
        // 1. Module build failed: SyntaxError: Unexpected token (44:25)
        // 2. 不识别该语法, 需要安装 babel-plugin-syntax-dynamic-import@6.18.0
        component: () => import('../views/test/testlink.vue'), // 异步加载组件
        name: 'link'
      },
      {
        path: 'params/:id',
        component: Testparams
      },
      {
        path: 'props/:pid',
        props: true,
        component: Testprops
      }
    ]
  }
]
