import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import '@style/main.scss'
import 'element-ui/lib/theme-chalk/index.css';
import plugins from "./plugins"
import store from './store'
import i18n from "./i18n"
Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key,value)=>i18n.t(key,value)
});

plugins.install(Vue)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
