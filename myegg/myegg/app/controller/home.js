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
  };
  async git(){
    const { ctx ,app } = this;
    let postDate = this.ctx.request.body;
    if(Object.keys(postDate).length===0){
      // let a = await this.ctx.service.sendMsg.dingding('git提交',s,'git推送提示');
      this.ctx.body = '无传参'
    }else{
      await this.ctx.service.sendMsg.dingding('git提交',JSON.stringify(postDate),'git推送提示')
      this.ctx.body = postDate
    }
  };
  async sendDD(){
    let content = this.ctx.request.body.content
    this.ctx.body = await this.ctx.service.sendMsg.dingding('git提交',content,'git推送提示')
  }
}

module.exports = HomeController;
