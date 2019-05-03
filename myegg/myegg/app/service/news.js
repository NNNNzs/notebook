'use strict';
const Service = require('egg').Service;

class NewsService extends Service {
  async list1(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
      dataType: 'json',
    });

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return newsList.map(res => res.data);
  }
  async list() {
    const data = await this.ctx.curl('https://api.nnnnzs.cn/api/getweibo', { dataType: 'json' });
    console.log(data);
    return data.data.map(res => {
      return {
        url: res.title,
        title: res.title,
      };
    });
  }
}

module.exports = NewsService;
