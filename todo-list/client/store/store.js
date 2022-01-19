import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
const isDev = process.env.NODE_ENV === 'development'
export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 在开发环境下,限制不能使用,如: this.$store.state.count = 3 ,来直接修改 store中变量
    state: defaultState,
    mutations,
    getters,
    actions,
    // plugins: [
    //   (store) => {
    //     console.log('my plugin invoked')
    //     // do store about watch, subscribe something etc...
    //   }
    // ],
    modules: {
      a: {
        namespaced: true, // 这样就可以不同模块,写相同名字的 mutations, actions
        state: {
          text: 'a.module'
        },
        // 1. vuex 默认把不同模块下的mutations放到全局的命名空间当中, 如 在
        // 一个vue文件中可以直接: ...mapMutations(['updateText']), 而不用指定模块 a
        // 2. 如果要把 a 模块命名空间作用域只在该模块下,那么就需要声明 namespaced: true
        // 3. 经过2, 在全局下就不能直接 a 模块下的 mutations
        mutations: {
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            return state.text + rootState.count + rootState.b.text
          }
        },
        actions: {
          add ({ state, commit, rootState }) {
            commit('updateText', rootState.count)
            commit('updateCount', rootState.count, { root: true })
          }
        }
      },
      b: {
        state: {
          text: 'b.module'
        },
        actions: {
          textAction ({ commit }) {
            commit('a/updateText', 'test text', {root: true})
          }
        }
      }
    }
  })
  // 0. 每次编辑 store 里面代码, 页面都会自动刷新
  // 1. 增加 热更替功能
  // 2. 热更替后,数据自动变化,但不刷新页面
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        actions: newActions,
        getters: newGetters
      })
    })
  }
  return store
}
