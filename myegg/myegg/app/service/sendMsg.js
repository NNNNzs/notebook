'use strict';
const Service = require('egg').Service;
const moment = require('moment');

class Message extends Service {
    async weChat(title,msg) {
        const data = await this.ctx.curl(`https://sc.ftqq.com/SCU36847T91a389aca957b1bf554b2e728328d1185c029f702c10b.send?text=${title}&desp=${msg}${new Date()}`, { dataType: 'json' });
        return data;
    }
    async dingding() {
        const { ctx } = this;
        const baseUrl = 'https://oapi.dingtalk.com'
        async function getAccessToken() {
            const appkey = 'dingqxqtfkkptzwxrbew';
            const appsecret = 'oVXv74NxwcH-7cptdfBoPD3PkaFQhKSfT5Ch_hGv3U6eROc79QX82tKjeavJbd_9';
            let url = `${baseUrl}/gettoken?appkey=${appkey}&appsecret=${appsecret}`
            let res = await ctx.curl(url, { dataType: 'json' });
            return res.data.access_token;
        }
        async function sendText(userid_list = "manager1688") {
            let agent_id = 252661904;//通用消息通知的agent_id
            let token = await getAccessToken()
            let url = `${baseUrl}/topapi/message/corpconversation/asyncsend_v2?access_token=${token}`
            let res = await ctx.curl(url, {
                dataType: 'json',
                contentType: 'json',
                method: 'POST',
                data: {
                    agent_id,
                    userid_list,
                    msg: {
                        msgtype: "oa",
                        oa: {
                            message_url: "https://api.nnnnzs.cn/api/getweibo",
                            head: {
                                "bgcolor": "718c00",
                                "text": "计划任务"
                            },
                            body: {
                                title: "lorloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremem",
                                form: [
                                    {
                                        "key": "内容：",
                                        "value": "lorloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremem"
                                    },
                                    {
                                        "key": "时间：",
                                        "value": moment().format('YYYY-MM-DD HH:mm:ss')
                                    }
                                ],
                                "content": "lorloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremem",
                                author: "计划任务"
                            }
                        },
                    }
                }
            });
            return res;
        }
        return await sendText();
    }
}

module.exports = Message;
