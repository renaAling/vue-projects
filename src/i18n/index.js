import Vue from "vue"
import VueI18n from "vue-i18n"
import lang from './lang'

Vue.use(VueI18n)
// 获取当前的语言
export function getLanguage() {
    const chooseLanguage = localStorage.getItem('lang')
    if(chooseLanguage) return chooseLanguage;
    console.log(navigator.language)
    const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(lang)
    for( const locale of locales){
        // en
        if(language.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'en'
}
console.log(getLanguage())
const i18n = new VueI18n({
    locale: getLanguage(),
    messages: {
        ...lang
    }
})
export default i18n;