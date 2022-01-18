<template>
  <div> test router enter</div>
</template>
<script>
export default {
  // next() 之前 是拿不到 this 的
  beforeRouteEnter (to, from, next) {
    // 在当前页面,添加路由
    console.log('router enter -beforeRouteEnter invoked')
    next()
  },
  // warning: 实际演示, 该方法并不能调用
  beforeRouteUpdate (to, from, next) {
    // 1. 复用组件,参数不一样,会被触发
    // 2. 同样的路由形式进行切换时,会被触发
    console.log('router enter -beforeRouteUpdate invoked')
    next()
  },
  beforeRouteLeave (to, from, next) {
    // ...
    console.log('router enter -beforeRouteLeave invoked')
    if (global.confirm('are you sure leave ?')) {
      next()
    }
  }
}
</script>
