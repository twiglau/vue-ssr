<template>
    <section class="real-app">
      <div class="tab-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab :label="tab" :index="tab" v-for="tab in stats" :key="tab"></tab>
        <!-- <tab index="2">
          <span slot="label" style="color:red;">tab2</span>
          <span>Tab content 2</span>
        </tab>
        <tab label="tab3" index="3">
          <span>Tab content 3</span>
        </tab> -->
      </tabs>
      </div>
        <input
                type="text"
                class="add-input"
                autofocus="autofocus"
                placeholder="接下来要做什么"
                @keyup.enter="handleAdd"
        >
        <Item
                v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
                @del="deleteTodo"
                @toggle="toggleTodoStats"
        />
        <Helper :filter="filter" :todos="todos" @clearAllCompleted="clearAllCompleted"/>

    </section>
</template>

<script>
import Item from './item.vue'
import Helper from './helper.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'todo',
  metaInfo: {
    title: 'The Todo App'
  },
  data () {
    return {
      filter: 'all',
      stats: ['all', 'active', 'completed']
    }
  },
  components: {
    Item,
    Helper
  },
  computed: {
    ...mapState(['todos']),
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  mounted () {
    if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
  },
  asyncData ({ store, router }) {
    // TIPS: 服务端渲染,从服务发送的请求. 如果依赖的是 client-model , baseURL是 / 的话,
    // 默认服务端是没有同域这个概念的, 服务端发送请求必须指定 host port
    // 服务端发送请求,并不需要发送请求来做
    if (store.state.user) {
      return store.dispatch('fetchTodos')
    }
    router.replace('/login')
    return Promise.resolve()
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),
    handleChangeTab (index) {
      this.filter = index
    },
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({
          content: '必须输入要做的内容'
        })
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    clearAllCompleted () {
      // this.todos = this.todos.filter(todo => !todo.completed)
      this.deleteAllCompleted()
    },
    toggleTodoStats (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
    width 600px;
    margin 0 auto;
    box-shadow 0 0 5px #666;

}
.add-input {
    position relative
    padding 0;
    margin 0 auto;
    width 100%
    height 32px
    line-height 32px;
    letter-spacing 2px
}
.tab-container
  background: #fff
  padding: 0 15px

</style>
