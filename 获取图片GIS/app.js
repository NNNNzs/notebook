const fs = require('fs');
var ExifImage = require('exif').ExifImage

async function stream() {
    // let imgArray = await readDir(src);
    // let imgs = []
    // imgArray.forEach(element => {
    // let imgDate = fs.readFileSync(src + '/' + element);
    let imgDate = fs.readFileSync('img/P80221-162354.jpg');
    let s = readImgExif(imgDate).then(res => {
        // console.log(res.gps)
        let gps = res.gps
        let GPSLatitude = `${gps.GPSLatitude[0]}°${gps.GPSLatitude[1]}'${gps.GPSLatitude[2]}''${gps.GPSLatitudeRef}`
        let GPSLongitude = `${gps.GPSLongitude[0]}°${gps.GPSLongitude[1]}'${gps.GPSLongitude[2]}''${gps.GPSLongitudeRef}`
        console.log(`${GPSLatitude},${GPSLongitude}`)
    })
    // console.log(s)
    // .then(imgEXIF=>{
    //     let img = {'src':src+'/'+element,'name':element,'exif':imgEXIF};
    //     imgs.push(img)
    // })
    // });
}
stream()




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

async function readImgExif(imgDate) {
    return new Promise(function (resolve, reject) {
        try {
            new ExifImage({
                image: imgDate
            }, function (error, exifData) {
                if (error)
                    reject(error)
                else {
                    resolve(exifData)
                }
            });
        } catch (error) {
            reject(error)
        }
    })
}


function getAa000000() {
    function getA() {
        var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        return String.fromCharCode(65 + ranNum)//生成A-Z
    }
    return getA() + getA().toLowerCase() + Math.ceil(Math.random() * 999999)
}