import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
  <p>Name: {{firstName + ' ' + lastName}}</p>
  <p>Name-Computed: {{name}}</p>
  <p>Name-Function: {{getName()}}</p>
  <p>Number: {{num}}</p>
  <p> <input type="text" v-model="num" /></p>
  <p> otherName:  <input type="text" v-model="otherName" /></p>
  </div>
  `,
  data: {
    firstName: 'JoJo',
    lastName: 'lau',
    num: 0
  },
  computed: {
    name () {
      console.log('new Name')
      // firstName 会被缓存,firstName 更新时, name响应更新
      return `${this.firstName} ${this.lastName}`
    },
    otherName: {
      get () {
        return `${this.firstName} ${this.lastName}`
      },
      set (oName) {
        const names = oName.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  methods: {
    getName () {
      // 其他数据更新时,该函数也会被重新调用
      // 与computed相比, 这种性能开销更大
      console.log('getName function invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
