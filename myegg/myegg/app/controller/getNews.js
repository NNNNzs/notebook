'use strict';

const Controller = require('egg').Controller;

class getNews extends Controller {
  async index() {
    const ctx = this.ctx;
    // const newsList = await this.ctx.service.getNews.getNewsByApi();
    const newsList = await this.ctx.service.getNews.init();
    ctx.body = newsList;
  }
}

module.exports = getNews;
