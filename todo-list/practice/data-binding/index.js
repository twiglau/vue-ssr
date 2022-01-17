import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
  {{isActive ? 'active' : 'not active'}}
  <p>{{getJoinedArr(arr)}}</p>
  <p v-html="html"></p>
  <p :class="{active:isActive}"> 1 </p>
  <p :class="[isActive? 'active':'']"> 2 </p>
  <p :class="[{active:isActive}]"> 3 </p>
  <p :style="styl1"> 4 </p>
  <p :style="[styl1,styl2]"> 5 </p>
  </div>`,
  data: {
    isActive: true,
    html: '<span> html 标签 </span>',
    arr: [1, 2, 3],
    styl1: {
      color: 'red',
    },
    styl2: {
      color: 'green'
    }
  },
  methods: {
    getJoinedArr (arr) {
      return arr.join(' ')
    }

  }
})
