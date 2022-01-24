# vue 实例挂载节点方式
```
// 方式一
import Vue from 'vue'
new Vue({
    el: '#root', // 1. 方式一
    template: '<div>this is cont </div>
})
// 方式二
const app = new Vue({
    template: '<div>this is p</div>'
})
app.$mount('#root')
```

# vue 实例中属性
```
app.$data
app.$props
app.$el // 对应html的节点
app.$options // 就是创建实例传的参数对象
app.$root // 是vue 的对象 app.$root === app

```