'use strict';
const Service = require('egg').Service;

class Message extends Service {
    async weChat(msg) {
        const data = await this.ctx.curl('https://sc.ftqq.com/SCU36847T91a389aca957b1bf554b2e728328d1185c029f702c10b.send?text=', { dataType: 'json' });
    }
    async DingDing() {

    }
}

module.exports = Message;
