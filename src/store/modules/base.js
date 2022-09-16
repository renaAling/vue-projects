import * as Types from "../mutation-types"
import * as API from "@api/api"
import Vue from "vue"
const VM = new Vue()
const language = (navigator.language || navigator.browserLanguage).toLowerCase()
function getBtnList(data) {
//     btn = {
//  *      userList：{ ADD: true, EDIT: true, DELETE: true},
//  *      operatingRole: {ADD: true, QUERY: true}
//  * }
    let btn = {}
    function digui(data) {
        data.forEach(item=>{
            if(item.routeName && item.buttons && item.buttons.length >0 ){
                let temObj = {} // {ADD:true, EDIT: true, DELETE: true}
                item.buttons.forEach(v=>temObj[v] = true)
                btn[item.routeName] = temObj
            }
            if (item.children && item.children.length > 0) {
                digui(item.children)
            }
        })
    }
    digui(data)
    return btn;
}
const state = {
    user: JSON.parse(localStorage.getItem("USER_DATA")) || null,
    token: localStorage.getItem('TOKEN') || "",
    lang: localStorage.getItem('lang') || language,
    langJson: null,
    langJsonAll: {},
    systemMeuns: JSON.parse(localStorage.getItem('SYSTEM_MENU')) || null,
    btnList: JSON.parse(localStorage.getItem('btnList')) || {},
    visitedViews: JSON.parse(localStorage.getItem('TAG_VIEWS')) || [], // tag标签
    activeView: {} // 当前对象 {name: xxx, path: '', xxx:''}
}
const getters = {
    token: state=>state.token,
    lang: state=> state.lang,
    systemMeunList : state => state.systemMeuns,
    visitedViews: state => state.visitedViews,
    btnList: state => state.btnList
}
const mutations = {
    // 设置用户信息到localStorage
    [Types.SET_USER]: (state, data) => {
        state.user = data
        localStorage.setItem("USER_DATA", JSON.stringify(data))
    },
    [Types.SET_TOKEN]:(state, data) => {
        state.token = data
        localStorage.setItem("TOKEN", data)
    },
    [Types.LOGIN_OUT]:(state)=>{
        // 退出登录
        localStorage.removeItem('USER_DATA')
        localStorage.removeItem('TOKEN')
        state.token = '',
        state.user = ''
        // 清空当前的tagView
        state.visitedViews = []
    },
    [Types.SET_LANGUAGE]: (state,data) => {
        localStorage.setItem('lang',data)
        state.lang = data
    },
    SET_LANG_JSON:(state, data)=>{
        state.langJson = Object.freeze(data) || {}
    },
    SET_LANG_JSON_ALL:(state, data) =>{
        state.langJsonAll = Object.freeze(data) || {}
    },
    // 设置菜单
    [Types.SET_SYSTEM_MENU]: (state, data)=>{
        state.systemMeuns = data;
        localStorage.setItem("SYSTEM_MENU", JSON.stringify(data))
        // 设置按钮权限
        let btnList = getBtnList(data)
        state.btnList = btnList
        localStorage.setItem('btnList', JSON.stringify(btnList))
    },
    // 新增标签页面
    [Types.ADD_VISITED_VIEW]: (state, view={}) =>{
        if(state.visitedViews.some(v => v.name === view.name)) return
        // 加入到tag页签
        const visiteViews = Object.assign({}, view, {title: view.meta.title})
        state.visitedViews.push(visiteViews)
        // 写入本地缓存
        localStorage.setItem("ACTIVE_VIEWS", JSON.stringify(visiteViews || {}))
    },
    // 删除标签的方法
    [Types.DEL_VISITED_VIEW]: (state, view={})=> {
        for(const [i, v] of state.visitedViews.entries()) {
            if (v.name === view.name) {
                state.visitedViews.splice(i,1)
                localStorage.setItem('ACTIVE_VIEWS',JSON.stringify(state.visitedViews))
                break
            }
        }
    }
}
const actions = {
    // 登录初始化
    [Types.LOGIN_INIT]: ({commit}, data)=>{
        const {user,token, systemMeuns} = data
        if(user) commit(Types.SET_USER, user)
        if(token) commit(Types.SET_TOKEN, token)
        if(systemMeuns) commit(Types.SET_SYSTEM_MENU, systemMeuns)
    },
    [Types.SET_USER]: ({commit}, user) => {
        commit(Types.SET_USER, user||{})
        commit(Types.SET_TOKEN, user.token)
    },
    [Types.LOGIN_OUT]: async ({commit},value)=> {
        if(value==="requestError") {
          // 非主动退出
          commit(Types.LOGIN_OUT)
        } else {
            // 主动退出
            await API.LOGOUT()
            commit('LOGIN_OUT')
        }
    },
    [Types.SET_LANGUAGE]: ({commit},value) => {
        commit(Types.SET_LANGUAGE, value|| "en")
    },
    // 设置国际化数据
    async setLangJson({commit, state}) {
        try{
            const res = await API.getLang()
            const {data,msg,code} = res.data
            if(code === 1) {
                if(data) {
                    const langJsonAll = data
                    const result = {}
                    const lang = state.lang.toUpperCase()
                    Object.entries(langJsonAll).forEach(([key,value])=>(result[key] = value[lang]))
                    commit('SET_LANG_JSON', result)
                    commit('SET_LANG_JSON_ALL', langJsonAll)
                }
            } else {
                VM.$message.error(msg)
            }
        }catch (e) {
            console.error("getLangJSON::Error",e)
            VM.$message.error("获取国际化数据异常！")
        }
    },
    // 切换语言的方法
    changeLangByChoice({commit, state}) {
        const {langJsonAll} = state
        if (langJsonAll) {
            const result = {}
            const lang = state.lang.toUpperCase()
            Object.entries(langJsonAll).forEach(([key,value])=>(result[key] = value[lang]))
            commit('SET_LANG_JSON', result)
            commit('SET_LANG_JSON_ALL', langJsonAll)
        }
    },
    // 初始化语言
    initData({dispatch, state}) {
        if (!state.langJson) dispatch('setLangJson')
    },
    // 新增标签页
    [Types.ADD_VISITED_VIEW]: ({commit},value) => {
        commit('ADD_VISITED_VIEW', value)
    },
    // 删除
    [Types.DEL_VISITED_VIEW]: ({commit},value) => {
        return new Promise(resolve => {
            console.log('-------------------')
            commit('DEL_VISITED_VIEW', value)
            resolve([...state.visitedViews])
        })
    },
}
export default {
    state,getters,mutations,actions,
    namespaced: true
}
/** 
 * 新增 编辑 删除  查找  打印  审核  反审核  导入  导出 
 * 跳新页面，做弹窗新增
*/

