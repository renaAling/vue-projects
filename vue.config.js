const IS_DEVELOPMENT = process.env.NODE_ENV === "development"
// const cndBaseUrl = process.env.VUE_APP_CDN_DOMAIN

const externalConfig = [
    // {name: 'vue', scope:'Vue', usePrefetch: false, js: `${cndBaseUrl}/static/cdn/vue.min.js`}
    {name: 'vue', scope:'Vue', usePrefetch: false, js: 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.min.js'},
    {name: 'lodash', scope:'_', usePrefetch: false, js: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.9.0/lodash.min.js'},
    {name: 'element-ui', scope:'ELEMENT', usePrefetch: false, js: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.1/index.min.js',css: 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.1/theme-chalk/index.min.css'},
]

module.exports={
    configureWebpack: config=>{
        // 别名配置
        config.resolve.alias = Object.assign(config.resolve.alias, {
            "@view": "@/views",
            "@router": "@/router",
            "@api": "@/common/api",
            "@http": "@/common/http",
            "@config": "@/common/config",
            "@style": "@/common/style",
            "@utils": "@/common/utils",
            "@layout": "@/layout",
        })        
        // 开启GZIP压缩
        console.log(!IS_DEVELOPMENT, process.env.GZIP)
        if (!IS_DEVELOPMENT && process.env.GZIP) {
            // 导入压缩插件
            const CompressionWebpackPlugin = require('compression-webpack-plugin')
            // 添加插件
            config.plugins = (config.plugins || []).concat(new CompressionWebpackPlugin(
                {
                    filename: '[path].gz[query]',
                    algorithm:'gzip', // 压缩格式
                    test: /.(js|css)$/, // 只压缩js和css文件
                    threshold: 10240, // 只处理10kb的文件
                    minRatio: 0.8, // 压缩比率： 压缩率 = 压缩大小、 原始大小
                    deleteOriginalAssets: false
                }
            ))
        }
        // 去掉生产环境的 打印和警告提示
        if (!IS_DEVELOPMENT) {
            // terser-webpack-plugin
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ["console.log"]
        }
        // 外部扩展（配合静态资源cdn加载） --- 生产环境
        if (!IS_DEVELOPMENT) {
            const extenals = {} // {'vue': "Vue", "lodash": "_"}
            externalConfig.forEach(item=>(extenals[item.name] = item.scope))
            config.externals = extenals
        }

    },
    chainWebpack: config => {
        config.plugin('html')
        .tap(args=>{
            args[0].cdnConfig = IS_DEVELOPMENT ? [] : externalConfig
            return args
        })
    },
    // compression-webpack-plugin@5.0.0
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'htpp://127.0.0.1:4000',
                ws: true,
                pathRewrite: { "^/api": ''}  // /api/login    /login
            },
        }
    }
}

// CDN :分容分发网络  阿里 或者腾讯 华为 CDN