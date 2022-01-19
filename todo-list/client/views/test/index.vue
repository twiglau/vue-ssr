<template>
  <div>
    <p>Test Page</p>
    <p style="background:pink;color:red;"> {{fullName}} : {{counter}} </p>
    <p style="background:blue;color:black;"> {{textA}} {{c_text}}</p>
    <router-link :to="{name:'link'}">link page</router-link>
    <router-link to="params/123?a=1&b=2">params page</router-link>
    <router-link to="enter/1">enter 1</router-link>
    <router-link to="enter/2">enter 2</router-link>
    <router-view />
    <p>-----------------------</p>
    <!-- <router-view name="link" /> -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Test',
  props: ['pid'],
  mounted () {
    console.group()
    console.log(this.$route)
    console.log(this.$route.params)
    console.log(this.$route.query)
    console.log(this.pid)
    console.groupEnd()
    console.log(this.$store)
    // warning 严格模式下,不能直接修改
    // this.$store.state.count = 3
    // let i = 1
    // setInterval(() => {
    //   i++
    //   this.$store.commit('updateCount', i)
    // }, 1000)
    this.$store.dispatch('updateCountAsync', {
      num: 5,
      time: 2000
    })
  },
  computed: {
    // 1. 当前不支持 ... 语法: Module build failed: SyntaxError: Unexpected token (34:4)
    // 2. 需要安装 babel-preset-stage-1
    ...mapState({
      counter: (state) => state.count, // 可以做些计算
      c_text: (state) => state.c.text
    }),
    ...mapGetters(['fullName']),
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    textA () {
      return this.$store.state.a.text
    },
    // textB () {
    //   return this.$store.state.b.text
    // }
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    // 当 a 开启命名空间时, 需要 a/upateText, 如果没有开启可以直接 updateText
    ...mapMutations(['updateCount', 'a/updateText'])
  },
}
</script>
