
import { createErr } from './util'
const axios = require('axios')
const request = axios.create({
  baseURL: '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(res => {
      const data = res.data
      if (!data) {
        return reject(createErr(400, 'no data'))
      }
      if (!data.success) {
        return reject(createErr(400, data.message))
      }
      resolve(data.data)
    }).catch(err => {
      const res = err.response
      if (res.status === 401) {
        reject(createErr(401, 'need auth'))
      }
    })
  })
}
export default {
  getAllTodos () {
    return handleRequest(request.get('/api/todos'))
  },
  login (username, password) {
    return handleRequest(request.post('/user/login', {username, password}))
  },
  updateTodo (id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  createTodo (todo) {
    return handleRequest(request.post('/api/todo', todo))
  },
  deleteTodo (id) {
    return handleRequest(request.delete(`/api/todo/${id}`))
  },
  deleteAllCompleted (ids) {
    return handleRequest(request.post('/api/delete/completed', { ids }))
  }
}
