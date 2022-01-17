import Vue from 'vue'

const component1 = {
  props: ['propOne', 'propTwo'],
  template: '<div>This is a component1 </div>'
}
const component2 = {
  props: {
    transNum: Boolean,
    propTwo: {
      type: Boolean,
      required: true,
    },
    propThree: {
      validator (value) {
        return typeof value === 'boolean'
      }
    }
  },
  template: `
  <div>
  <p> {{text}} </p>
  <p> <span> {{ transNum }}</span></p>
  <p> {{propTwo}} </p>
  <p> {{propThree}} </p>
  </div>
  `,
  data () {
    return {
      text: 'component2 text'
    }
  },
}
const data3 = {
  value0: 'test'
}
const component3 = {
  template: `
  <div style="background:pink;">
   <p>This is a component3</p>
   <p> <input type="text" v-model="value0" /> </p>
  </div>
  `,
  data () {
    return data3
  }
}

Vue.component('CompOne', component1)

new Vue({
  el: '#root',
  components: {
    CompTwo: component2,
    CompThree: component3
  },
  template: `
  <div>
  <p> This is p label.</p>
  <comp-one></comp-one>
  <comp-two :trans-num="false" :prop-two="true" :prop-three="'value'"></comp-two>
  <comp-three></comp-three>
  <comp-three></comp-three>
  </div>
  `
})
