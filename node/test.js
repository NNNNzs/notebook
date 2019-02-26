const axios = require('axios');
axios({
    url:'http://localhost/register',
    data:{account:'nizongshan',password:'123456'},
    method:'get'
})
.then(res=>{
    console.log(res.data)
})
.catch(err=>{
    console.log(err)
})