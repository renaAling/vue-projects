import store from '@/store'
let langs = null
export const lang = (str) => {
    langs = store.state.base.langJson || {}
    return langs[str] || str || ""
}
export default {
    install(Vue) {
        Object.assign(Vue.prototype, {
            $lang: lang
        })
    }
}