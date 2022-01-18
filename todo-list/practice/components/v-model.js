import Vue from 'vue'

const component = {
  props: ['value'],
  template: `
  <div>
  <input type="text" @input="handleInput" :value="value"/>
  </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  },
}

const component2 = {
  model: { // 通过这种方式来指定 属性 和 事件
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: `
  <div>
  <input type="text" @input="handleInput" :value="value1"/>
  </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  },
}
new Vue({
  el: '#root',
  data () {
    return {
      value: 123,
      value1: 456,
      value2: 0
    }
  },
  components: {
    CompOne: component,
    CompTwo: component2
  },
  template: `
  <div>
  <comp-one :value="value" @input="value = arguments[0]"></comp-one>
  <comp-one v-model="value1"></comp-one>
  <comp-two v-model="value2"></comp-two>
  </div>
  `
})
