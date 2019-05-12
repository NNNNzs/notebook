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
    alinode: {
        server: 'wss://agentserver.node.aliyun.com:8080',
        appid: '77896', // 性能平台给您的项目生成的 appid',
        secret: '7095cfece4ea662c59b07c2f2d7ff1495b733ff1', // 性能平台给您的项目生成的 secret',
        logdir: '/root/logs/alinode/', // 性能平台日志输出地址绝对路径，与 NODE_LOG_DIR 保持一致。如：/tmp/',
        error_log: [
            '/egg/log/'
            // '您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
            // '例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
            // '不更改 Egg 默认日志输出路径可不配置本项目',
        ],
        // agentidMode:'IP' '可选，如果设置，则在实例ID中添加部分IP信息，用于多个实例 hostname 相同的场景（以容器为主）'
    },
    redis: {
        client: {
            port: 6379, // Redis port
            host: 'localhost', // Redis host
            password: '',
            db: 0,
        }
    },
};