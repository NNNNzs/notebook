
function login(req,res,next) {
    let data = req.query
    if(data.account==='nizongshan'){
        req.session.name = data.account
        res.send('登陆成功')
    }
}

module.exports = login