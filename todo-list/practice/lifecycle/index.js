import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () { // 创建
    console.log(this.$el, 'beforeCreate')
    // undefined
  },
  created () {
    console.log(this.$el, 'created')
    // undefined
  },
  beforeMount () { // 挂载
    console.log(this.$el, 'beforeMount')
    // <div id="#root"></div>
  },
  mounted () {
    console.log(this.$el, 'mounted')
    // <div> 0 </div>
  },
  beforeUpdate () { // 数据更新
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () { // keepalive 有关系
    console.log(this, 'activated')
  },
  deactivated () { // 组件
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestory')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) { // 将template转换为render, h其实是 createElement 函数
    console.log('render function invoked')
    throw new TypeError('render Error')
    // 执行时机: beforeMounted 和 mounted 之间执行,将模块转换为真正的ele
    // return h('div', { }, this.text)
  },
  renderError (h, err) {
    // 只有在本组件出错误时,才抛出错误,如果有子组件,不会报子组件的错误
    // 只有在开发模式下,才输出错误
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 和renderError的区别
    // 1. 会向上冒泡   2.在生产模式下也适用
  }
})

app.$mount('#root')

setInterval(() => {
  app.text += 1
}, 1000)

setTimeout(() => {
  app.$destroy()
})
