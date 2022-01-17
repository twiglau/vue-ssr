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

npm install  eslint@4.16.0 eslint-config-standard@11.0.0-beta.0 eslint-plugin-standard@3.0.0 eslint-plugin-promise@3.6.0 eslint-plugin-import@2.8.0 eslint-plugin-html@4.0.1 eslint-plugin-node@5.2.1 -D


eslint-plugin-html

// package.json 文件里面
"lint":"eslint --ext .js --ext .jsx --ext .vue client/",
// -ext 指定文件格式  client/ 文件夹下的文件

//命令修复eslint检测的错误
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/",

//在写代码过程中检测,养成习惯
npm install eslint-loader@1.9.0 babel-eslint@8.2.1 -D
```

# editorconfig 文件, 不同编辑器之间设置统一的规范
```
root = true  //根目录下

[*]
charset = utf-8 //字符编码
end_of_line = lf
indent_size = 2 //缩进两个空格
indent_style = space //space 键
insert_final_newline = true  //代码结尾 留一行空行
trim_trailing_whitespace = true //一行代码末尾,不需要空格
```

# 提交git时,预检验eslint
```
// 1. 需要安装 husky
npm install husky@0.14.3 -D

// 2. package.json 里面,配置命令
"precommit":"lint-fix"
```
