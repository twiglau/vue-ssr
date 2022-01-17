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
console.log('app.$root:', app.$root, 'app.$root === app', app.$root === app)
console.log('app.$children:', app.$children)
console.log('app.$slots:', app.$slots)
console.log('app.$scopedSlots:', app.$scopedSlots)
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
