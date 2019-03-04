const {mysql} = require('../tools/index');

function login(username, password) {
    let users = mysql.select('users', 'users');//[{username,password}]
    let res = {code:404,msg:'用户不存在'}
    users.forEach(e => {
        if(e.username == username){
            if(e.password==password){
                res =  {code:200,msg:'登陆成功'}
            }else{
                res =  {code:400,msg:'密码错误'}
            }
        }
    });
    return res;
}
function isUserNameRepeat(username) {
    let users = mysql.select('users', 'user');//[{username,password}]
    return users.some(e => {//如果有一个相等的账号，那么返回true
        return e.username !== username
    })
}
function register(username, nickname, password) {
    if (isUserNameRepeat(username)) {
        return {code:401,msg:'用户已存在'}
    } else {
        let usersList = mysql.select(tableName, colName)//[username,password]
        usersList.push({ username, nickname, password })
        mysql.updataDB(users,list)
    }
}

module.exports = {
    login,
    isUserNameRepeat,
    register
}