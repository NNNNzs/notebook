// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGetNews = require('../../../app/service/getNews');
import ExportGetWeibo = require('../../../app/service/getWeibo');
import ExportNews = require('../../../app/service/news');
import ExportSendMsg = require('../../../app/service/sendMsg');

declare module 'egg' {
  interface IService {
    getNews: ExportGetNews;
    getWeibo: ExportGetWeibo;
    news: ExportNews;
    sendMsg: ExportSendMsg;
  }
}
