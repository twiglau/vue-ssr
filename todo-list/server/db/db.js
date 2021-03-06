const sha1 = require('sha1')
const axios = require('axios')

const className = 'todo'
const request = axios.create({
  baseURL: 'htts://d.apicloud.com/mcm/api'
})
const createError = (code, resp) => {
  const err = new Error(resp.message)
  err.code = code
  return err
}

const handleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}
module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    // async 函数 babel 编译时, 会生成 generator 函数
    // ReferenceError: regeneratorRuntime is not defined, 在server 环境下
    // 可以设置 babelrc 根据不同环境,做相应的配置

    async getAllTodos () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },
    async addTodo (todo) {
      return handleRequest(await request.post(`/${className}`,
        todo,
        {
          headers: getHeaders()
        }))
    },
    async updateTodo (id, todo) {
      return handleRequest(await request.put(`/${className}/${id}`,
        todo,
        {
          headers: getHeaders()
        }
      ))
    },
    async deleteTodo (id) {
      return handleRequest(await request.delete(`/${className}/${id}`,
        {
          headers: getHeaders()
        }
      ))
    },
    async deleteCompleted (ids) {
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return handleRequest(await request.post(
        '/batch',
        { requests },
        { headers: getHeaders() }
      ))
    }

  }
}
