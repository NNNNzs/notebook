const axios = require('axios');

function getTuLing() {
    axios({
        url: 'https://api.nnnnzs.cn/api/chat',
        method: 'post',
        data: {
            "reqType": 0,
            "perception": {
                "inputText": {
                    "text": "你好啊"
                },
            },
            "userInfo": {
                "apiKey": "099dd8a2996b4fe5ab59e54b8e34829e",
                "userId": "123"
            }
        }
    }).then(res => {
        console.log(res.data);
    })
}
getTuLing()