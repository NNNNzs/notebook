'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx ,app } = this;
    // let weiboContent = await this.ctx.service.getWeibo.init();
    // await app.redis.set('weibo', JSON.stringify(weiboContent));
    // await app.redis.rpush('1234',1);
    // await this.service.getWeibo.updateRedis()
    // let weibo = JSON.parse(await app.redis.get('weibo'));
    // let weibo = await this.service.sendMsg.dingding();

    // let newsList = await ctx.service.getWeibo.outputWeibo();
    this.ctx.body = await this.ctx.service.getWeibo.updateRedis();
    await this.ctx.service.sendMsg.dingding({title:'测试',author:'Nzs',content:'呵呵呵'})
    // newsList = JSON.stringify(newsList)
    // this.ctx.body = newsList
    // const title = newsList[0].title;
    // await ctx.render('weibo/index.tpl', {list:newsList});
  }
}

module.exports = HomeController;
