const path = require('path');
const HTMLPlugin=require('html-webpack-plugin')
// const {VueLoaderPlugin} = require('vue-loader');
const webpack = require('webpack');
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development';
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV:isDev?'"development"':'"production"'
        }
    }),
    // new VueLoaderPlugin(),
    new HTMLPlugin({
      template: path.join(__dirname, 'template.html')
    }),
    new VueClientPlugin()
]
const devServer = {
    port: 8000,
    host: '0.0.0.0',//监听地址
    overlay:{
        errors:true,
    },
    historyApiFallback: {
      // 1. 路径与 base.js 里面 output 的 publicPath 有关系, publicPath 作为基路径
      // 如果 publicPath: '/public/', 那么 index: '/public/index.html'

      // 2. historyApiFallBack 的作用为:
      // 如果没有配置该路径, 如果输入: localhost:8000/login 到login 页面, 回报404错误
      // 原因: webpack-dev-server 并没有做一个关于路径的映射关系,根本不认识 /login 这个路径

      // 3. history 模式下, 默认情况下, 路径到服务端,会先做一个匹配处理,然后完成真正请求操作
      index: '/public/index.html'
    },
    hot:true
}
let config

if (isDev) {
    config = merge(baseConfig,{
        devtool:'#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        // {
                        //     loader:'css-loader',
                        //     options:{
                        //         modules:true,
                        //         localIdentName:isDev ? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]'
                        //     }
                        // },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap:true,
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins:defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
}else{
    config = merge(baseConfig,{
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor:['vue']
        },
        output: {
            filename:'[name].[chunkhash:8].js'
        },
        module: {
            rules:[
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: "postcss-loader",
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins:defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name:"vendor"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name:'runtime'
            })
        ])
    })
}

module.exports = config;
