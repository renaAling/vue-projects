const files = require.context('.', false, /\.js/)
const modules = {}
files.keys().forEach(key=>{
    if(key === './index.js') {
        return 
    }
    modules[key.replace(/(^\.\/|\.js$)/g, '')] = files(key).default
})

export default {
    install(Vue) {
        for(const file of Object.values(modules)) {
            for(const item of Object.entries(file)) {
                Vue.use(item[1])
            }
        }
    }
}

// 方法也是对象