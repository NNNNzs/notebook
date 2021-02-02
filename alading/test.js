const puppeteer = require('puppeteer');
const listStr = require('./data')

async function init(list = []) {
  try {
    const browser = await puppeteer.launch({
      headless: false, // 无head头模式？
    });
    for (let p = 0; p < list.length; p++) {
      const keyword = list[p].trim();
      const page = await browser.newPage();
      await page.goto('https://www.baidu.com/'); //网页跟踪到百度网址.

      await page.type('#kw', keyword, { delay: 100 });
      await page.keyboard.press('Enter');


      await page.waitFor(500);
      const index = await page.evaluate(() => {
        // 作用域味页面内
        const select = '.pc-down_1c6jp';
        let row = jQuery('#content_left .c-container');
        for (let i = 0; i < row.length; i++) {
          const ele = row.eq(i);
          if ($(ele).find(select).length > 0) {
            return i;
          }
        }
      });

      // await page.waitForSelector('.pc-down_1c6jp', {
      //   timeout: 2000
      // }).then(async () => {


      // }).catch(() => {
      //   console.log(`${keyword} 没有找到位置`)
      // })

      // await page.waitFor(300);
      await page.screenshot({ path: `./temp/${keyword}_${index + 1}.jpg`, fullPage: true }).catch(err => {
        console.log('截图失败');
        console.log(err);
      });

      console.log('goto-end');

      await page.close()
    }

  } catch (error) {
    console.log(error);
    return error;
  }
  process.exit()
  browser.close();
}

// init();

async function start() {
  let list = listStr.split('\n');

  // list = list.splice(10, 1)
  await init(['驾考宝典','驾考宝典下载','驾考宝典电脑版']);
}
// start()

init(['稿定设计'])