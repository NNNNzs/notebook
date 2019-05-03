'use strict';

const Controller = require('egg').Controller;

class getWeibo extends Controller {
  async index() {
    const ctx = this.ctx;
    const newsList = await this.ctx.service.getWeibo.init();
    ctx.body = newsList;
  }
}

module.exports = getWeibo;
