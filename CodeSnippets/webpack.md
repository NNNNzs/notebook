# webpack
## 初始化Vue
1. vue init webpack-simple project-name
2. cd project-name cnpm install element-ui style-loader -D
3. main.js import ElementUI from 'element-ui'
           import 'element-ui/lib/theme-chalk/index.css'
4. Vue.use(ElementUi)
5. 现在就可以在App.vue中运用elemnt-ui的框架了
## 配置 webpack.config.js
>module.exports ={
    entry:path.join(__dirname,'main.js'),
    output:{
        path:path.join(__dirname,'/dist'),
        filename:'bundle.js'
    }
}
### 热更新
    需要注意 需要在本地安装webpack
1. 安装webpack-dev-server package.json scripts添加 dev:"webpack-dev-server"
2.  1. scripts添加参数 "--open --port 80 --contentBase src --hot"
2.  2. 1. 或者在 webpack.config.js里面 require('webpack') 
2.  2. 2. 写devServer配置 devServer:{open:true,port:num,contentBase:'',hot:true} 
2.  2. 3. plugins:[new webpack.HotModuleReplacementPlugin(),]
3. npm run dev 即可监听

## 命令
1. webpack main.js  new.js  main.js 支持es6

## main.js
1. 支持es6模块导入 import from 
2. 打包的出口是/dist/bundle.js
3. webpack-server-dev直接引用根目录下面的bundle.js

## 优点
1. webpack 处理js依赖
2. webpack处理js的兼容问题