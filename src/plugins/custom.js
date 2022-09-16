import _ from "lodash"
// import $ from "jquery"
export default {
    customPlugin: {
        install (Vue) {
            Object.assign(Vue.prototype, {
                $lodash: _,
                // $jquery: $
            })
        } 
    }
}