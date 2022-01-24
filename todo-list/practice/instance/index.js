import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="tpl">{{text}} - diff:{{diff}} forceUpdate: {{forceObj.testA}}</div>',
  data: {
    text: 0,
    diff: 1000,
    forceObj: {}
  },
  watch: {
    diff (newV, oldV) {
      console.log(`${newV} - ${oldV}`)
    }
  }
})
app.$mount('#root')

// app.text = 'text1'

let i = 0
setInterval(() => {
  i++
  app.text += 1
  app.$data.diff += 2000
  app.forceObj.testA = i
}, 1000)

// 赋值
app.forceObj.testA = 5

console.group()
console.log('app.$data:', app.$data)
console.log('app.$props:', app.$props)
console.log('app.$el:', app.$el)
console.log('app.$options:', app.$options)
// 以下修改options中 data 的值是不起作用的
// app.$options.data += 1
// 以下方法是有作用的,是下一次值更新时才起作用
app.$options.render = (h) => {
  return h('div', {}, 'new render function')
}
console.log('app.$root:', app.$root, 'app.$root === app', app.$root === app)
// 如组件 <item><div></div></item> 组件item中 div 就是 children
console.log('app.$children:', app.$children)
// 插槽的概念
console.log('app.$slots:', app.$slots)
console.log('app.$scopedSlots:', app.$scopedSlots)
// ref 是模块里面的引用,帮我们快速的定位到某个节点
console.log('app.$refs', app.$refs)
console.log('app.$isServer:', app.$isServer)
console.groupEnd()

const unWatch = app.$watch('text', (newVal, oldVal) => {
  console.log(`${newVal} : ${oldVal}`)
})
// $watch 只能主动销毁
setTimeout(() => {
  unWatch()
}, 5000)

// $on, $emit 作用在一个 vue 对象上
app.$on('test', (a, b) => {
  console.log(`test emitted, ${a} - ${b}`)
})
setTimeout(() => {
  app.$emit('test', 1, 2)
}, 2000)
