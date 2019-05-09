'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx ,app } = this;
    // let weiboContent = await this.ctx.service.getWeibo.init();
    // await app.redis.set('weibo', JSON.stringify(weiboContent));
    // await app.redis.rpush('1234',1);
    // await this.service.getWeibo.updateRedis()
    let weibo = JSON.parse(await app.redis.get('weibo'));
    ctx.body = weibo;
    // ctx.body = weiboContent;
  }
}

module.exports = HomeController;
