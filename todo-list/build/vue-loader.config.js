const docsLoader = require.resolve('./doc-loader')
module.exports = (isDev) => {
    return {
        preserveWhiteSpace:true,
        extractCSS:!isDev, //提取vue中的css
        cssModules:{
            localIdentName:isDev? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true //转换为 -驼峰命名法
        },
        // hotReload:false, //根据环境变量生成
        loaders:{ //支持自定义Loader,在vue文件中
            // 同时也可以修改默认指定的loader, 如 js 使用
            //自定义的 js-loader 等等
            'docs': docsLoader
        },
        preLoader:{
            //解析之前,先用那些loader来解析代码
        },
        postLoader:{

        }
    }
}