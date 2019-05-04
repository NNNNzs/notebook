'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
const qs = require('querystring');
const crypto = require('crypto');

class TencentAI extends Controller {
    getReqSign(data, APPKEY) {
        // 1. 字典升序排序
        let keys = Object.keys(data).sort();

        // 2. 拼按URL键值对
        let newData = {};
        keys.forEach(key => {
            if (data[key]) {
                newData[key] = data[key];
            }
        });
        let str = qs.stringify(newData);
        // 3. 拼接app_key
        str = str + '&app_key=' + APPKEY;

        // 4. MD5运算+转换大写，得到请求签名
        let sign = crypto.createHash('md5').update(str, 'utf-8').digest('hex');
        return sign.toUpperCase();
    }
    async getAnswer(data) {
        const APPKEY = '0I9N8TPxSpCzlo3H';
        data.app_id = 1106872557;
        data.time_stamp = parseInt(new Date().getTime() / 1000);
        data.nonce_str = data.time_stamp;
        data.sign = this.getReqSign(data, APPKEY);
        let res = await axios({
            url: 'https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat',
            method: 'post',
            data: qs.stringify(data)
        })
        return res.data;
    }
    async chat() {
        let session =  this.ctx.query.s||'NNNNzs';
        let question = this.ctx.query.q||'你好'
        this.ctx.body  =  await this.getAnswer({
            'session': session,
            'question': question
        });
    }
}

module.exports = TencentAI;
