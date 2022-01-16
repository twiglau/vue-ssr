# vue-style-loader
> 开发vue项目时,使用该loader,样式才有热更新功能
> 使用该loader,其他的css文件,style文件等,同样具有热更替的功能
> 需要更改webpack配置,将style-loader替换为vue-style-loader
-----------
# rimraf 库
> 打包是配置删除dist文件夹,package.json中       
```
"scripts":{
    "clean":"rimraf dist"
}
```

# eslint没有办法直接识别.vue文件里面的代码,这时需要安装工具,来支持.vue
```
eslint-plugin-html

// package.json 文件里面
"lint":"eslint --ext .js --ext .jsx --ext .vue client/",
// -ext 指定文件格式  client/ 文件夹下的文件

//命令修复eslint检测的错误
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/",
```
