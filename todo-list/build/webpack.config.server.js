const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const defaultPluins = []

let config

config = merge(baseConfig, {
  target: 'node', // 必须指定打包目标是 node 端环境
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2', // 指定打包后的代码, 入口是怎样一种规范  module.exports | require
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build'),
  },
  // 1. webpack 打包时,会把我们所有依赖的js文件都给打包到同一个javascript文件当中 -> 这是在浏览器当中的情况
  // 2. 浏览器没有办法单独加载一个文件,所以需要把用到的js文件内容全部打包到一个新的js文件当中,一次性加载到浏览器端
  // 3. 但是该配置是运行于 node 端的,我们只需要在用到地方,require 一个模块就可以了
  // 4. require('vue') 这种方式是直接可以引用到 node_modules 里面的文件的,所以没有必要把所有代码全部打包到一个文件
  //    当中server-entry.js 当中
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      // {
      //   test: /\.styl/,
      //   use: [
      //     // 1. styl 文件需要将其单独打包到一个文件当中
      //     // 2. style-loader会把我们的css 通过javascript去引用dom的方式,插入到我们的html当中
      //     // 3. 该loader会有dom操作在里面,如果通过该loader打包,那么会导致在Node端执行时,报错,node端是没有dom的
      //     // 执行环境的
      //     'vue-style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     },
      //     'stylus-loader'
      //   ]
      // }
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
  plugins: defaultPluins.concat([
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"' // vue的服务端渲染,官方建议这么去做的
    }),
    new VueServerPlugin()
  ])
})

module.exports = config
