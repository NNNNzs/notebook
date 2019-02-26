
module.exports = function(req,res,next){
    res.header("Access-Control-Allow-Origin", req.headers.origin); //把来路域名设为可以跨域
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    if(!req.session.name){
        res.redirect('/login')
    }
    else{
        res.redirect('/')
    }
    next()
}