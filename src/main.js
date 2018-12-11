// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './config/rem'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import components from './components/common'
// 引入

import FastClick from 'fastclick'

//注册全局自定义组件
components.map(component => {
  Vue.component(component.name, component);
});

FastClick.attach(document.body);
Vue.config.productionTip = false
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
