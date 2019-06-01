const Service = require('egg').Service;
const cheerio = require('cheerio');
const axios = require('axios');

class getWeibo extends Service {
    async getHot() {
        const url = 'https://s.weibo.com/top/summary';
        let res = await this.ctx.curl(url, {
            dataType: 'text',
            timeout: '10000'
        });
        let html = res.data;
        let $ = cheerio.load(html, {
            ignoreWhitespace: true,
            decodeEntities: false,
        });
        let list = $('#pl_top_realtimehot tbody>tr');
        let l = list.length; //一般头条加50共51条
        let resulte = [];
        for (let i = 0; i < l; i++) {
            let rank = Number(list.eq(i).find('.td-01.ranktop').text()) || 'top';
            let title = list.eq(i).find('.td-02 a').text();
            let link_html = list.eq(i).find('.td-02 a').html();
            let num = Number(list.eq(i).find('.td-02 span').text());
            let tip = list.eq(i).find('.td-03').text();
            resulte.push({
                time: new Date(),
                rank: rank,
                title: title,
                link_html: link_html,
                num: num,
                tip: tip || null,

            })
        }
        resulte.forEach(e => {
            this.insertToDB(e);
        });
        return resulte;
    }
    async insertToDB() {
        let data = await this.getHot();
        const result = await this.app.mysql.insert('w_top', data);
        return result;
    }
    async updateRedis() {
        let {
            app
        } = this
        let sqlQuery = 'SELECT * FROM w_top WHERE time = (SELECT time FROM w_top ORDER BY id DESC LIMIT 1) ORDER BY rank;';
        let oldV = JSON.parse(await this.app.redis.get('weibo'))
        let newV = await this.app.mysql.query(sqlQuery);
        this.warning(oldV, newV)
        return await app.redis.set('weibo', JSON.stringify(newV));
    }
    async outputWeibo() {
        let query = this.ctx.query;
        //根据标题查
        if (query.title) {
            let selectByTitle = `SELECT * FROM w_top WHERE title = '${query.title}' ORDER BY time; `;
            return await this.app.mysql.query(selectByTitle);
        } else {
            //  走没有title，默认走redis
            // let results = JSON.parse(await app.redis.get('weibo'));
            let results = await this.app.redis.get('weibo');
            return JSON.parse(results);
        }
    }
    async warning(oldV, newV) {
        //第一种热度达到某一个数字
        //第二种，涨幅超过100%
        //没有预警过
        //通知，并且加入通知完成的名单
        // let content =JSON.stringify(Object.assign(oldV,newV));
        let content = oldV.filter(e => {
            if (e.num > 3000000) {
                return e.title + ' 热度达到' + e.num;
            }
        })
        content = JSON.stringify(content);
        let title = '微博热搜预警';
        let author ='微博预警系统';
        let a = await this.ctx.service.sendMsg.dingding(title, content, author);
    }
    async init() {
        return await this.getHot();
    }
}

module.exports = getWeibo;