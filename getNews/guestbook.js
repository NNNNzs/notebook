const http = require("http");
const express = require("express");
const fs = require("fs");
const mysql = require("mysql");
const bodyParser = require("body-parser"); //post请求获取传参
const cookieParser = require("cookie-parser"); //获取cookie
const busboy = require("connect-busboy"); //文件上传
const session = require('express-session'); //会话
const app = express();
const DB_CONFIG = {
    host: 'api.nnnnzs.cn',
    user: 'newslist',
    password: '123456ni',
    database: 'newslist'
};
const axios = require('axios');

// expresspost中间件
//发送回调信息

// sendMsg('主人服务器API接口启动啦~'+new Date())

app.use(bodyParser.json()); //获取post的data
app.use(cookieParser()); //获取cookie
app.use(busboy()) //文件上传模块
app.use( //获取post的data
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(session({
    //这里的name指是cookie的name
    name: 'Nz_session',
    secret: 'keyboard cat',
    cookie: ('name', 'value', {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 3600000 / 60 //1分钟
    }),
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: true,
    //强制“未初始化”的会话保存到存储。 
    saveUninitialized: true,
}))

//路由
//拦截所有请求
app.all("*", function (req, res, next) {
    // let ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
    // res.header("Access-Control-Allow-Origin", "https://me.nnnnzs.cn");//正式服
    res.header("Access-Control-Allow-Origin", req.headers.origin); //把来路域名设为可以跨域
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    // if (!req.session.userName) //这里可以全局拦截没有登录的操作
    next()
});

//监听路由
app.get("/api/getNews", (req, res) => {
    if (req.session.userName) { //全局拦截没有登录
        getNewsFromSql(req.query)
            .then(resp => {
                res.send(resp); //数据库查完之后再发送
            })
            .catch(error => {
                res.send(error);
            });
    } else {
        res.send('请登录')
    }
});
app.get("/api/getWeiBo", (req, res) => {
    if (req.query.title) {
        let title = req.query.title;
        let selectByTitle = `SELECT * FROM w_top WHERE title = '${title}' ORDER BY time; `
        sql(DB_CONFIG, selectByTitle)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }
    else {
        let t = new Date();
        //查最新的排名
        let selectByTop = 'SELECT * FROM w_top WHERE time = (SELECT time FROM w_top ORDER BY id DESC LIMIT 1) ORDER BY rank;';
        sql(DB_CONFIG, selectByTop)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    //根据标题查

});
app.post("/api/register", (req, res) => {
    //判断重复用的函数
    if (req.body.type == "isRepeat") {
        checkAccount(req.body.account)
            .then(success => res.send(success))
            .catch(error => res.send(error))
    }
    if (req.body.type == "register") {
        //注册之前再判重一次
        checkAccount(req.body.data.account)
            .then(success => {
                if (success.status === 'success') {
                    let cookie = req.cookies
                    let user = req.body.data;
                    // user.registered_ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0] ||req.ip;
                    user.registered_ip = 'localhost';
                    user.registered_time = new Date();
                    // res.send(user)
                    // console.log(user)
                    register(user)
                        .then(data => {
                            // console.log(data)
                            res.send(data)
                        })
                        .catch(err => res.send(err))
                } else {
                    res.send(success)
                }
            })
    }
});
app.post("/api/login", (req, res) => {
    // let sess = req.session;
    // let ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]||req.ip;
    let ip = 'localhost'
    let data = req.body;
    login(data)
        .then(results => {
            req.session.userName = req.body.account;
            updateLoginTime(req.body.account, ip)
            res.send(results)
        })
        .catch(error => res.send(error))
});
app.post('/api/test', (req, res) => {
    if (req.session.userName) { //判断session 状态，如果有效，则返回主页，否则转到登录页面
        console.log('有效')
    } else {
        console.log('无效')
    }
});


function getNewsFromSql(query) {
    let {
        keywords = '', type = '头条', page = '1'
    } = query;
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection(DB_CONFIG);
        let sqlQuery;
        connection.connect();
        if (keywords) {
            sqlQuery = `SELECT * FROM newslist where title like '%${keywords}%' or guide like '%${keywords}%' ORDER BY date DESC limit ${(page - 1) * 30},30`;
        } else {
            sqlQuery = `SELECT * FROM newslist WHERE category='${type}' ORDER BY date DESC limit ${(page - 1) * 30},30`;
        }
        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                reject({
                    status: 'error',
                    data: error
                });
            }
            if (results) {
                resolve({
                    status: 'success',
                    data: results
                });
            }
        });
        connection.end();
    });
}

function checkAccount(account) {
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        let sql = `SELECT account FROM user_info WHERE account='${account}'`;
        connection.query(sql, (err, results) => {
            if (err) {
                //查询错误
                reject({
                    status: 'error',
                    data: err
                });
            }
            if (results) {
                results.length == 0 ?
                    resolve({
                        status: 'success',
                        data: '不重复'
                    }) :
                    resolve({
                        status: 'error',
                        data: '重复'
                    });
            }
        });
        connection.end();
    });
}

function register(data) {
    let {
        account,
        password,
        nickname,
        registered_ip,
        registered_time,
        res
    } = data;
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        let sql = 'INSERT INTO user_info(account,password,nickname,registered_ip,registered_time) VALUES(?,?,?,?,?)';
        let formData = [account, password, nickname, registered_ip, registered_time]
        connection.query(sql, formData, (err, results) => {
            if (err) {
                //注册错误
                // console.log(err)
                reject({
                    status: 'error',
                    data: err
                });
            }
            if (results) {
                resolve({
                    status: 'success',
                    data: results
                });
            }
        });
        connection.end();
    });
}

function login(data) {
    let {
        account,
        password,
    } = data;
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        let sql = `SELECT account,nickname,password,login_time,login_ip FROM user_info WHERE account='${account}'`;
        connection.query(sql, (err, results) => {
            if (err) {
                reject({
                    status: 'error',
                    data: err
                });
            }
            if (results) {
                if (results.length == 0)
                    reject({
                        status: 'error',
                        data: '账号不存在'
                    })
                else {
                    if (password == results[0].password) {
                        resolve({
                            status: 'success',
                            data: results[0]

                        })
                    } else {
                        reject({
                            status: 'error',
                            data: '密码错误'
                        })
                    }
                }

            }
        });
        connection.end();
    });
}

function updateLoginTime(account, ip) {
    let connection = mysql.createConnection(DB_CONFIG);
    connection.connect();
    let sql = `UPDATE user_info SET login_time = ?,login_ip=? WHERE account='${account}'`;
    let val = [new Date(), ip]
    connection.query(sql, val, (err, results) => {
        if (err) {
            console.log(err)
        }
        if (results) {
            // console.log(results)
        }
    });
    connection.end();
}

function sendMsg(msg) {
    var msg = encodeURI(msg);
    axios.get('https://sc.ftqq.com/SCU36847T91a389aca957b1bf554b2e728328d1185c029f702c10b.send?text=' + msg);
}
// sql(DB_CONFIG,"SELECT * FROM `w_top` WHERE time BETWEEN '2019-01-9 17:00:00' and '2019-01-9 17:30:00' GROUP BY time")

function sql(DB_CONFIG, sql, val) {
    return new Promise(function (resolve, reject) {
        let connection = mysql.createConnection(DB_CONFIG);
        connection.connect();
        connection.query(sql, val, (err, results) => {
            if (err) {
                reject(err);
                connection.end();

            }
            if (results) {
                resolve(results)
                connection.end();
            }
        });
    })
}

// sql(DB_CONFIG, 'select * from user_info')
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(err)
//     })

//创建服务
var httpServer = http.createServer(app);
httpServer.listen(3001, function () {
    console.log("HTTP服务在3001端口开启");
});