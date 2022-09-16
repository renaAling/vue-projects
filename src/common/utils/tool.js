import store from "@/store"
export function hasPower(routeName, type) {
    let btnList = store.getters['base/btnList'] || {}
    let power = {}
    if (btnList[routeName]) {
        power = btnList[routeName]
    }
    return power[type] || false
    // return btnList[routeName][type] || false
}