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
                @keyup.enter="addTodo"
        >
        <Item
                v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
                @del="deleteTodo"
        />
        <Helper :filter="filter" :todos="todos" @clearAllCompleted="clearAllCompleted"/>

    </section>
</template>

<script>
import Item from './item.vue'
import Helper from './helper.vue'
let id = 0

export default {
  name: 'todo',
  metaInfo: {
    title: 'The Todo App'
  },
  data () {
    return {
      todos: [],
      filter: 'all',
      stats: ['all', 'active', 'completed']
    }
  },
  components: {
    Item,
    Helper
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    handleChangeTab (index) {
      this.filter = index
    },
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      // 传进去的是每一个todo 判断一下 todo.id===id 就是我们想要的结果
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
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
