'use strict';
//通用跨域接口，通过get一个json，后端转发的形式在转发给前端
const Controller = require('egg').Controller;

class api extends Controller {
  async get(option) {
    const {ctx} = this
    //接收很多参数，在后端做跨域
    let {data,url} = option;
    const newsList = await ctx.curl(url,option)
    ctx.body = newsList;
  }
}

module.exports = api;
