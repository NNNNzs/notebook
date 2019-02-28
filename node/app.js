const http = require("http");//网络请求
const express = require("express");//作为web服务器
const fs = require("fs");//操作本地文件
const bodyParser = require("body-parser"); //post请求获取传参
const cookieParser = require("cookie-parser"); //获取cookie
const session = require('express-session'); //会话
const app = express();//使用web服务器


const CONFIG = {
    port: 80
}

app.use(bodyParser.json()); //获取post的data
app.use( //获取post的data
    bodyParser.urlencoded({
        extended: true
    })
);
//express操作session的第三方库
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));

//全局拦截器，允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin); //把来路域名设为可以跨域
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next()
})
app.all('/', (req, res) => {
    if (!req.session.name) {
        res.redirect('/login')
    } else {
        res.send('登陆成功')
    }

})
app.all('/register', function (req, res, next) {
    if (req.query.username && req.query.password) {
        let oldDB = mysql.readDB();
        let { username, password } = req.query
        oldDB.users.push({ username, password })
        mysql.updataDB(oldDB)
        res.send('注册成功')
    }
    else {
        res.send('请输入账号密码')
    }
})

app.all('/login', function (req, res, next) {
    let data = req.query
    if(!data.username&&!data.password){
        res.send('请输入账号密码')
    }
    let users = mysql.select('users')
    users.forEach((e,index,users)=>{
        if(e.username===data.username){
            if(e.password===data.password){
                //登陆成功
                req.session.name = data.username
                res.redirect('/')
            }
            else{
                res.send('密码错误')
            }
        }
        else{
            res.send('账号不存在')
        }
    })
})

var mysql = {
    readDB() {
        let database = fs.readFileSync('./static/database.json').toString('utf-8')
        database = JSON.parse(database)
        return database
    },
    updataDB(data) {
        data = JSON.stringify(data)
        fs.writeFileSync('./static/database.json', data)
    },
    select(tableName){
        return mysql.readDB()[tableName]
    }
}

const httpServer = http.createServer(app)
httpServer.listen(CONFIG.port, () => {
    console.log(`服务在${CONFIG.port}端口启动`);
});