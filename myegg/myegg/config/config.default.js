/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1556677431988_9295';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };
  config.alinode = {
    server: 'wss://agentserver.node.aliyun.com:8080',
    appid: '77896',// 性能平台给您的项目生成的 appid',
    secret: '7095cfece4ea662c59b07c2f2d7ff1495b733ff1',// 性能平台给您的项目生成的 secret',
    logdir: '/root/logs/alinode/',// 性能平台日志输出地址绝对路径，与 NODE_LOG_DIR 保持一致。如：/tmp/',
    error_log: [
      '/egg/log/'
      // '您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
      // '例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
      // '不更改 Egg 默认日志输出路径可不配置本项目',
    ],
    // agentidMode:'IP' '可选，如果设置，则在实例ID中添加部分IP信息，用于多个实例 hostname 相同的场景（以容器为主）'
  };

  return {
    ...config,
    ...userConfig,
  };
};

