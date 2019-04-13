const axios = require('axios');
class DingDing{
    constructor(x, y) {
        this.appkey = 'dingqxqtfkkptzwxrbew';
        this.appsecret = 'oVXv74NxwcH-7cptdfBoPD3PkaFQhKSfT5Ch_hGv3U6eROc79QX82tKjeavJbd_9';
        this.baseUrl = 'https://oapi.dingtalk.com';
        this.access = `?appkey=${this.appkey}&appsecret=${this.appsecret}`
      }
    getAccessToken(){
        let apiUrl = '/gettoken';
        axios({
            url:`${this.baseUrl}${apiUrl}${this.access}`
        }).then(res=>{
            let data = res.data;
            if(data.errcode===0){
                this.
                console.log(data.access_token);
            }
        })
    }
    getRole(){
        let apiUrl = '/topapi/role/list';
    }
}
let access = new DingDing().getAccessToken();
console.log(access)