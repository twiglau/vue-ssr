import Vue from 'vue'

const compSlot = {
  template: `
  <div :style="style">
   <div class="header">
      <slot name="header"></slot>
   </div>
   <div class="body">
      <slot name="body"></slot>
   </div>
   <div></div>
  </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: 'solid 1px #ccc'
      }
    }
  },
}

const childComp = {
  template: `
  <div>
  <p>child Comp</p>
  <p>updateValue can follow grandParent change: {{ updateData.updateValue }}</p>
  </div>
  `,
  inject: ['grandParent', 'cValue', 'updateData'],
  mounted () {
    console.group()
    console.log('childComp parent is: ', this.$parent.$options.name)
    console.log('childComp grandParent is: ', this.grandParent, this.cValue)
    console.groupEnd()
  },
}
const compSlotScope = {
  name: 'SlotScope-Name',
  components: {
    childComp
  },
  template: `
  <div :style="style">
   <slot value="123" text="slot scoped"></slot>
   <child-comp />
  </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: 'solid 1px #ccc'
      }
    }
  },
}
new Vue({
  el: '#root',
  components: {
    compSlot,
    compSlotScope
  },
  provide () {
    // 1. 提供 provide , 孙子-子组件 可以通过 reject 拿到里面的值 [不是父子上下级关系,而是跨层级关系的时候]
    // 2. 用法与 data 一样, 返回一个对象
    // 3. 如果需要跨层级的子组件某些数据跟随组件来变化,需要使用到 Object.defineProperty
    const updateData = {}
    Object.defineProperty(updateData, 'updateValue', {
      get: () => this.updateValue,
      enumerable: true
    })
    return {
      grandParent: this,
      cValue: this.value,
      updateData
    }
  },
  data () {
    return {
      value: 124,
      updateValue: 56
    }
  },
  mounted () {
    console.log(this.$refs.slotScope)
    console.log(this.$refs.slotP)
  },
  template: `
  <div>
  <comp-slot>
    <p slot="header"> This is header p </p>
    <div slot="body"> This is body div </div>
  </comp-slot>
  <comp-slot-scope ref="slotScope">
     <p slot-scope="props" ref="slotP">
     <span>{{props.value}}</span>
     <span>{{props.text}}</span>
     </p>
  </comp-slot-scope>
  <input type="text" v-model.number="updateValue" />
  </div>
  `
})
