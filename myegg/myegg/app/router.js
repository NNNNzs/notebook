'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/getNews', controller.getNews.index);
  router.get('/getWeibo', controller.getWeibo.index);
  router.get('/chat',controller.ai.chat);
};
