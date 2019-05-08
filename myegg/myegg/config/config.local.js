module.exports = {
    mysql: {
        // 单数据库信息配置
        client: {
            // host
            host: 'nnnnzs.cn',
            // 端口号
            port: '3306',
            // 用户名
            user: 'newslist',
            // 密码
            password: '123456ni',
            // 数据库名
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