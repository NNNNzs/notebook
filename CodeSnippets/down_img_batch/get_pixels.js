const getPixels = require("get-pixels")
const fs = require('fs');

const dir = '/Users/nnnnzs/Pictures/phone_bak1/'

let mimeType = ['jpg', 'jpeg', 'png', 'gif']

function checkErrorImg() {
  fs.readdir(dir, (err, files) => {
    // let i = 0
    const filesList = files.sort();
    for (let i = 0; i < filesList.length; i++) {
      const ele = filesList[i]
      getPixels(`${dir}${ele}`, function (err) {
        console.log(ele, ++i)
        const path = `${dir}${ele}`;
        if (err) {
          if (mimeType.includes(ele.split('.').pop())) {
            console.warn(`remove ${dir}${ele}`)
            fs.appendFileSync('./error.txt', `${path}\n`)
            fs.unlink(`${dir}${ele}`, function (err, data) {
              if (err) {
                console.log(path)
              }
            })
          }
        }
      })
    }
  })
}
checkErrorImg()