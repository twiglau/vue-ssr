<template>
    <div id="app">
        <div id="cover">
        </div>
        <a-header></a-header>
        <!-- <Todo></Todo> -->
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
        <Footer>
        </Footer>
        <button @click="clickMe">Click Me!!</button>
    </div>

</template>

<script>
import AHeader from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
// console.log(Header.__docs) // 自定义loader
export default {
  metaInfo: {
    title: 'JoJo\'s Todo App'
  },
  components: {
    AHeader,
    Footer,
    Todo
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$notify({
      content: 'test $notify',
      btn: 'close'
    })
  },
  methods: {
    clickMe () {
      this.$notify({
        content: 'Click Me!',
        btn: 'close'
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>
