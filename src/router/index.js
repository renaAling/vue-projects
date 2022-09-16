import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@view/Home.vue'
import Login from "@layout/Login"
import Layout from "@layout/Layout"
import store from "../store"
import childRoute from "./modules/index"
Vue.use(VueRouter)
const VM = new Vue()
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: childRoute 
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(async (to, from ,next) =>{
  if(store.getters['base/token']) {
    // token存在
    const {user} = store.state.base
    if(!user){
      VM.$message.error("请先登录")
      next({
        redirect: true,
        name:'login'
      })
    } else{
      next()
    }
  } else {
    // token不存在
    if(to.name !== 'login' && to.name !== 'forgetPwd') {
      // 全部重定向到登录页
      VM.$message.error("请先登录")
      next({
        redirect: true,
        name:'login'
      })
    } else {
      next()
    }
  }
})
export default router
