import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
  <p> {{text}} </p>
  <p v-once> text once:  {{text}} </p>
  <p v-pre> {{text}} </p>
  <p v-text="text"></p>
  <p v-html="html"></p>
  <p v-show="isActive">2</p>
  <p v-if="isActive">3</p>
  <p v-for="(item,index) in arr" :key="index"><a :href="item" target="__blank">{{item}}</a></p>
  <div>
    <input type="checkbox" :value="1" v-model="arr"/>
    <input type="checkbox" :value="2" v-model="arr"/>
    <input type="checkbox" :value="3" v-model="arr"/>
  </div>
  <div>
    <input type="radio" value="one" v-model="picked" />
    <input type="radio" value="two" v-model="picked" />
  </div>
  <div>
    <input type="text" v-model="text" />
    <input type="text" v-model="text1" />
    <input type="number" v-model.number="text2" />
    <input type="text" v-model.trim="text3" />
  </div>
  </div>
  `,
  data: {
    text: 0,
    text1: '',
    text2: '',
    text3: '',
    isActive: true,
    html: '<span>This is html</span>',
    arr: [1, 2, 3],
    picked: '',
  }
})
