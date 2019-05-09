const Subscription = require('egg').Subscription;
const moment = require('moment');

class getWeibo extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '10m', // 10 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
            immediate: true,//配置了该参数为 true 时，这个定时任务会在应用启动并 ready 后立刻执行一次这个定时任务。
            disable: true,//配置该参数为 true 时，这个定时任务不会被启动。
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        //定时抓数据，更新到数据库
        const result = await this.ctx.service.getWeibo.getHot();
        // console.log(result)
    }
}

module.exports = getWeibo;