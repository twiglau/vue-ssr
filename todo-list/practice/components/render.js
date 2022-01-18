import Vue from 'vue'

const component = {
  name: 'Comp',
  props: ['prop1'],
  // template: `
  // <div :style="style">
  //  <slot></slot>
  // </div>
  // `,
  render (createElement) {
    return createElement(
      'div',
      {
        style: this.style,
        on: {
          click: () => { this.$emit('clickDiv') }
        }

      },
      [
        // this.$slots.default,
        this.$slots.header,
        this.prop1
      ]
    )
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        background: 'pink',
        border: 'solid 1px red'
      }

    }
  },
}

new Vue({
  el: '#root',
  components: {
    CompOne: component,
  },
  data () {
    return {
      value: 123
    }
  },
  methods: {
    handleClick () {
      console.log('div auto clicked!')
    }
  },
  // template: `
  // <div>
  // <comp-one ref="comp">
  //   <span ref="span"> {{ value }} </span>
  // </comp-one>
  // </div>
  // `,
  render (createElement) {
    // 每个Vue 实例,都会有一个 $createElement() 函数 => this.$createElement
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          prop1: this.value
        },
        on: { // 绑定click 事件
          'clickDiv': () => { console.log(' div emit click-div clicked!') }
        },
        nativeOn: { // 自动绑定到根节点上, 不需要 $emit 触发
          click: this.handleClick
        },
      },
      [
        createElement('span', {
          ref: 'span',
          slot: 'header',
          domProps: { // 如果是原生的节点, 可以插入 dom 属性
            innerHTML: '<span>innerHTML</span>'
          },
          attrs: {
            id: 'span-id'
          }
        }, this.value)
      ]
    )
  }

})
