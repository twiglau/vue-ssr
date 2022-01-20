const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development';


const config = {
    //目标
    target: "web",
    //入口
    entry: path.join(__dirname, '../client/client-entry.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname, '../public'),
        // webpack-dev-sever 加上全路径,让 node 服务器下也能访问到,测试时,正式环境需要更改
        publicPath: 'http://127.0.0.1:8000/public/'
    },
    module: {
        rules: [
            {
                test: /\.(vue|js|jsx)$/,
                loader:'eslint-loader',
                exclude:/node_modules/,
                enforce:'pre'
            },//enforce:'pre'预处理,比如: vue文件,在vue-loader之前先加入 eslint-loader 进行预处理
            {
                test: /.vue$/,
                loader: 'vue-loader',
                options:createVueLoaderOptions(isDev)
            },
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude:/node_modules/
            },
            {
                test: /\.(gif|jpg|jpeg|svg)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            },
        ]
    }
};


module.exports = config;
