/**
 * webpack 指定了 model 的 alias, 通过不同的环境引用不同的模块
 */
// import model from '../../model/client-model'
import model from 'model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'
const handleErr = (err) => {
  if (err.code === 401) {
    notify({
      content: '请先登录'
    })
    bus.$emit('auth')
  }
  if (err.msg) {
    notify({
      content: err.msg
    })
  }
}
export default {
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos ({commit}) {
    commit('startLoading')
    return model.getAllTodos().then(data => {
      commit('fillTodos', data)
      commit('endLoading')
    }).catch(err => {
      handleErr(err)
      commit('endLoading')
    })
  },
  login ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
          commit('endLoading')
        }).catch(err => {
          handleErr(err)
          reject(err)
          commit('endLoading')
        })
    })
  },
  addTodo ({ commit }, todo) {
    commit('startLoading')
    model.createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        commit('endLoading')
        notify({
          content: '你又多了一件事要做'
        })
      }).catch(err => {
        commit('endLoading')
        handleErr(err)
      })
  },
  updateTodo ({ commit }, { id, todo }) {
    commit('startLoading')
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
        commit('endLoading')
      }).catch(err => {
        handleErr(err)
        commit('endLoading')
      })
  },
  deleteTodo ({ commit }, id) {
    commit('startLoading')
    model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
        notify({
          content: '你又少了一件事要做'
        })
        commit('endLoading')
      }).catch(err => {
        handleErr(err)
        commit('endLoading')
      })
  },
  deleteAllCompleted ({ commit, state }) {
    commit('startLoading')
    const ids = state.todos.filter(t => t.completed).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        commit('endLoading')
        notify({
          content: '清理一下~~~'
        })
      }).catch(err => {
        handleErr(err)
        commit('endLoading')
      })
  },
}
