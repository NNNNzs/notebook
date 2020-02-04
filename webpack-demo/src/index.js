import log from './log';
import imgSrc from './img/1.jpg'//打包之后的文件名
import style from './index.scss'

log(style)
var img = new Image();
img.src = imgSrc;
img.classList.add(style.avatar)//局部引用

document.getElementById('root').append(img)