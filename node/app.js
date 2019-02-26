const http = require("http");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser"); //post请求获取传参
const cookieParser = require("cookie-parser"); //获取cookie
const session = require('express-session'); //会话
const app = express();


const CONFIG = {
    port: 80
}

app.use(bodyParser.json()); //获取post的data
// app.use(cookieParser()); //获取cookie
app.use( //获取post的data
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));

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
    if (req.query.account && req.query.password) {
        let oldDB = mysql.readDB();
        let { account, password } = req.query
        oldDB.users.push({ account, password })
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