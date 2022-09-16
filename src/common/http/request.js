import axios from "axios";
import store from '../../store'
import router from '@router/index'
// 创建axios实例
import Vue from "vue"
const self = new Vue()
const service = axios.create()

service.defaults.baseURL = process.env.VUE_APP_API_URL

// request拦截器
service.interceptors.request.use(config=>{
    // 获取token
    const token = store.getters['base/token'] || ""
    // 获取当前路由名称
    const routeName =  router.history.current.name
    // 设置请求头上去
    config.headers.authToken = token
    config.headers.routeName = routeName
    // 设置缓存
    config.headers["Cache-Control"] = "max-age=2,must-revalidate"
    return config
}, error=>{
    return Promise.reject(error)
})

// response响应拦截器
service.interceptors.response.use(response=>{
    if(response.status === 200) {
        return response
    }
}, (error)=>{
    if(error.response) {
        if(error.response.status === 401) {
            // 登出 
            console.log('401---------------------------')
            store.dispatch('base/LOGIN_OUT', 'requestError').then(()=>{
                router.push({name: 'login'})
                self.$message.error("权限已经失效，请重新登录")
            })
        } else if(error.response.status === 403) {
            // 
        }
    }
    return Promise.reject(error)
})
export default service