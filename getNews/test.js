const axios = require('axios');
var data = `{color: "red", acceptUsers: ["倪宗山"], mapContent: [{ "value": "111", "key": "测试" }],"title": "安装量预警" ,"time":15}`
// data = JSON.stringify(data)
console.log(data)
axios({
    url: 'http://fina.test.bz.cn/SendMessage?jsonData='+data,
    method: "get",
}).then(rep => {
    console.log(rep.data)
}).catch(res => { console.log(res) });