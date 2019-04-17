const axios = require('axios');
class DingDing {
    constructor(accessToken) {
        this.name = 'DingDing';
        this.appkey = 'dingqxqtfkkptzwxrbew';
        this.appsecret = 'oVXv74NxwcH-7cptdfBoPD3PkaFQhKSfT5Ch_hGv3U6eROc79QX82tKjeavJbd_9';
        this.baseUrl = 'https://oapi.dingtalk.com';
        this.access = `?appkey=${this.appkey}&appsecret=${this.appsecret}`;
        this.accessToken = '44ea524796ad31b0830c9d4f1620b5fd';
        this.agentId = 252661904;
        // this.accessToken = '?access_token=517a1d82345d320a93c44c30a4522caa';
    }
    async getAccessToken() {
        let apiUrl = '/gettoken';
        let res = await axios.get(`${this.baseUrl}${apiUrl}${this.access}`);
        if (res.data.errcode === 0) {
            console.log(res.data.access_token)
            this.accessToken = res.data.access_token;
            return res.data.access_token
        }
    }
}
class DingDingDept extends DingDing {
    async getDeptIdByParent(parentId = '1') {
        let apiUrl = '/department/list_ids';
        let res = await axios({
            url: `${this.baseUrl}${apiUrl}`,
            params: {
                access_token: this.accessToken,
                id: parentId
            }
        });
        return res.data;
    }
}
class Message extends DingDing {
    async getSendProgress(task_id) {
        let apiUrl = '/topapi/message/corpconversation/getsendprogress';
        let res = await axios({
            url: `${this.baseUrl}${apiUrl}`,
            params: {
                access_token: this.accessToken
            },
            data: {
                agent_id: this.agentId,
                task_id: task_id
            },
            method: 'post',
        });
        return res.data;
    }
    async getSendResult(task_id) {
        let apiUrl = '/topapi/message/corpconversation/getsendresult';
        let res = await axios({
            url: `${this.baseUrl}${apiUrl}`,
            params: {
                access_token: this.accessToken
            },
            data: {
                agent_id: this.agentId,
                task_id: task_id
            },
            method: 'post',
        });
        return res.data;
    }
    //发送工作通知消息
    async sendText() {
        let apiUrl = '/topapi/message/corpconversation/asyncsend_v2';
        let res = await axios({
            url: `${this.baseUrl}${apiUrl}`,
            params: {
                access_token: this.accessToken
            },
            method: 'post',
            data: {
                agent_id: this.agentId,
                userid_list: 'manager1688',
                msg: {
                    "msgtype": "text", "text": { "content": "晨会纪要"+new Date() },
                    // "msgtype": "oa",
                    // "oa": {
                    //     "message_url": "https://api.nnnnzs.cn/api/getweibo",
                    //     "head": {
                    //         "bgcolor": "FFBBBBaaaBB",
                    //         "text": "头部标题"
                    //     },
                    //     "body": {
                    //         "title": "正文标题",
                    //         "form": [{
                    //                 "key": "姓名:",
                    //                 "value": "张三"
                    //             },
                    //             {
                    //                 "key": "年龄:",
                    //                 "value": "20"
                    //             }
                    //         ],
                    //         "rich": {
                    //             "num": "15.6",
                    //             "unit": "元"
                    //         },
                    //         "content": "aa a ",
                    //         "image": "@lADOADmaWMzazQKA",
                    //         "file_count": "3",
                    //         "author": "倪宗山"
                    //     }
                    // }
                }
            },
        });
        return res.data;
    }
}
let font = new DingDingDept()
// font.getDeptIdByParent().then(res => {
//     let deptId = res.sub_dept_id_list;
//     console.log(deptId)
// })

let send = new Message();
// send.getAccessToken()
console.log(send.accessToken)
send.sendText()
    .then(res => {
        console.log(res)
        // send.getSendProgress(res.task_id).then(data => {
        //     console.log(data)
        // })
    })