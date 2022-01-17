import Vue from 'vue'

const component1 = {
  props: {
    active: Boolean,
    propOne: {
      required: true
    }
  },
  template: `
  <div>
  <input type="text" v-model="text" />
  <span @click="handleChange"> {{propOne}} </span>
  <span v-show="active"> see me if active </span>
  </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
}

const CompThree = {
  extends: component1,
  data () {
    return {
      text: 3
    }
  },
  mounted () {
    console.log('CompThree amounted')
    console.log(this.$parent.$options.name)
    this.$parent.text = 12345
  },
}
// 指定 parent
const parent = new Vue({
  name: 'parent'
})
const CompFour = {
  // parent: parent, 这种指定不了 parent,只有 new Vue 时,才能指定
  extends: component1,
  data () {
    return {
      text: 4
    }
  },
  mounted () {
    console.log('CompFour amounted')
    console.log(this.$parent.$options.name)
  },
}
// const CompTwo = Vue.extend(component1)

// new CompTwo({
//   el: '#root',
//   propsData: {
//     propOne: 'test propsData property'
//   },
//   data () {
//     return {
//       text: 123
//     }
//   },
//   mounted () {
//     console.log('instance mounted')
//   },
// })

new Vue({
  parent: parent,
  name: 'Root',
  el: '#root',
  components: {
    CompThree,
    CompFour
  },
  mounted () {
    console.log('Vue amounted')
    console.log(this.$parent.$options.name)
  },
  data () {
    return {
      propOne: 'test three',
      propFour: 'test Four',
      text: 0,
    }
  },
  template: `
  <div>
  <p>{{text}}</p>
  <comp-three :prop-one="propOne"></comp-three>
  <comp-four :prop-one="propFour"></comp-four>
  </div>
  `
})
