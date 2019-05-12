module.exports = {
    mysql: {
        // 单数据库信息配置
        client: {
            host: 'nnnnzs.cn',
            port: '3306',
            user: 'newslist',
            password: '123456ni',
            database: 'newslist',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    },
    redis: {
        client: {
            port: 6379, // Redis port
            host: 'api.nnnnzs.cn', // Redis host
            password: '',
            db: 0,
        }
    },
};