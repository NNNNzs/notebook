// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAi = require('../../../app/controller/ai');
import ExportApi = require('../../../app/controller/api');
import ExportGetNews = require('../../../app/controller/getNews');
import ExportGetWeibo = require('../../../app/controller/getWeibo');
import ExportHome = require('../../../app/controller/home');
import ExportNews = require('../../../app/controller/news');

declare module 'egg' {
  interface IController {
    ai: ExportAi;
    api: ExportApi;
    getNews: ExportGetNews;
    getWeibo: ExportGetWeibo;
    home: ExportHome;
    news: ExportNews;
  }
}
