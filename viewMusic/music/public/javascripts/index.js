function $(s){
    return document.querySelectorAll(s);
}
var size = 128;
var box = $("#box")[0];
var height,width;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var lis = $("#list li");
var line;
var mv = new MusicVisualizer({
    size:size,
    visualizer:draw
});

for(var i=0;i<lis.length;i++){
    lis[i].onclick = function(){
        for(var j=0;j<lis.length;j++){
            lis[j].className = "";
        }
        this.className = "selected";
        // load("/media/" + this.title);
        mv.play("/media/" + this.title);
        setScrollTitle(this.title);
    }
}

box.appendChild(canvas);
var Dots=[];
function random(m,n){
    return Math.round(Math.random()*(n-m) + m);
}
function getDots(){
    Dots =[];
    for(var i=0;i<size;i++){
        var x= random(0,width);
        var y= random(0,height);
        var color =`rgba(${random(0,255)},${random(0,255)},${random(0,255)},0.5)`;
        Dots.push({
            x:x,
            y:y,
            dx:random(1,4),
            color:color,
            cap:0
        });
    }
}
function resize(){
    height = box.clientHeight;
    width = box.clientWidth;
    canvas.height = height;
    canvas.width = width;
    canvas.textContent ="当前浏览器不支持canvas，请更换浏览器";
    line = ctx.createLinearGradient(0,0,0,height);
    line.addColorStop(0,"red");
    line.addColorStop(0.5,"yellow");
    line.addColorStop(1,"green");
    getDots();
}
resize();
window.onresize = resize;
function draw(arr){
    ctx.clearRect(0,0,width,height);
    var w = width / size;
    var cw = w*0.8;
    var capH = cw > 10? 10:cw;
    ctx.fillStyle = line;
    for(var i=0;i<size;i++){
        var o = Dots[i];
        if(draw.type =="column" ){
        var h = arr[i] /256 * height;
        ctx.fillRect(w * i, height -h ,cw ,h);
        ctx.fillRect(w * i, height -(o.cap+capH) ,cw ,capH);        
        o.cap-=5;
        if(o.cap < 0 ){
            o.cap = 0;
        }
        if(h>0 && o.cap< h +40 ){
            o.cap = h+40 > height - capH? capH :h+40;
        }
        }else if(draw.type == "dot"){
            ctx.beginPath();
            var r = 10 + arr[i] /256 * (height >width?width:height) /10;
            ctx.arc(o.x, o.y,r,0,Math.PI *2, true);
            var g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);
            g.addColorStop(0,"#fff");
            g.addColorStop(1,o.color);
            ctx.fillStyle = g;
            ctx.fill();
            o.x+=o.dx;
            o.x = o.x-r > width ? 0:o.x ;
            // ctx.strokeStyle = o.color;
            // ctx.stroke();
        }
    }
}
draw.type ="column";
var types = $("#type li");
for(var i=0;i<types.length;i++){
    types[i].onclick=function(){
        for(var j=0;j < types.length;j++){
            types[j].className = "";
        }
        this.className = "selected";
        draw.type = this.getAttribute("data-type");
    }
}
var time1 = null;
function setScrollTitle (s){
    clearInterval(time1);
    s =`正在播放  ${s}  `;
    s = s.split(""); //字符串分割成数组
    time1 = setInterval(function(){
    s.push(s[0]); //将第一个推到最后面
    s.shift();  //删除第一个
    document.title = s.join("");//把数组放入字符串
    },500);
}

$("#volume")[0].oninput = function(){
    mv.changeVolume(this.value/this.max);
};
$("#volume")[0].oninput();