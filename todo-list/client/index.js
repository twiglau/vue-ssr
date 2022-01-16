/*
* 真正挂载 app.vue
* */
import Vue from 'vue'
import App from './app.vue'

/* 静态资源 */
// import './assets/styles/test.css';
import './assets/styles/style.styl'
// import './assets/styles/test-stylus.styl';
import './assets/images/bg.jpeg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)
