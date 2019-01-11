const mysql = require("mysql")
const axios = require('axios')
const DB_CONFIG = {
    host: 'api.nnnnzs.cn',
    user: 'newslist',
    password: '123456ni',
    port: '3306',
    database: 'newslist'
}
let count = 0;
function data() {
    axios.get('https://v1.hitokoto.cn/')
        .then(res => {
            console.log(res.data)
        })
}
data()
setInterval(data,0.01)