const fs = require('fs');
var ExifImage = require('exif').ExifImage




async function stream(src){
    let imgArray = await readDir(src);
    let imgs =[]
    imgArray.forEach(element=>{
        let imgDate = fs.readFileSync(src+'/' + element);
        readImgExif(imgDate)
        .then(imgEXIF=>{
            let img = {'src':src+'/'+element,'name':element,'exif':imgEXIF};
            imgs.push(img)
        })
        console.log(imgs)
    });
}
stream('img')


/**
 * 给一个目录，返回目录里面的文件名
 * @param {string} src 
 */
function readDir(src) {
    return new Promise(function (resolve, reject) {
        fs.readdir(src, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    })
}

/**
 * 给图片的buffer类型，返回EXIF数据
 * @param {buffer} imgDate 
 */

function readImgExif(imgDate) {
    return new Promise(function (resolve, reject) {
        try {
            new ExifImage({
                image: imgDate
            }, function (error, exifData) {
                if (error)
                    reject(error)
                else {
                    resolve(exifData)
                    // console.log(exifData.gps); // Do something with your data!
                }
            });
        } catch (error) {
            reject(error)
        }
    })
}