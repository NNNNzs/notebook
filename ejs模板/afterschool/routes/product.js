const express = require('express');
const router = express.Router();
const { mysql } = require('../tools/index');
/* GET home page. */

router.get('/', function (req, res, next) {
  //读库写在这里否则会缓存DB的数据
  let pageSize = 6;//每页显示的个数
  let tables = mysql.readDB('product')//数据内容
  let allWorks = tables.works;//总的数据内容
  let currPage = Number(req.query.page) || 1;//当前页，传值过来或者默认1
  //currPage startIndex endIndex
  // 1       0     5
  // 2       6     11
  // 3       12    17
  // 4       18    23
  let startIndex = (currPage-1)*pageSize;//开始位置的索引
  let endIndex   = startIndex+pageSize//结束位置的索引
  let pageContent = allWorks.slice(startIndex, endIndex);
  let pages = {
    pageSize: pageSize,
    currPage: currPage,//当前页码
    totalCount: allWorks.length,//总的数据条数
    pageContent: pageContent,//数据内容
  }
  let pagesStr = JSON.stringify(pages);
  res.render('product', { works: pages.pageContent, username: req.session.name, pages: pagesStr });
});

module.exports = router;