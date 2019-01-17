/***************************************
 * baizhu_xzq   
 * http://www.kelezyw.com
 * By Daiyu              2018/05/14
 **************************************/
function withJQ(callback) {
    if (typeof jQuery === 'undefined') {
        var cdjs = document.createElement("script");
        var requestHandler = "//data.9xiazaiqi.com/script/jquery.min.js";
        cdjs.src = requestHandler;
        cdjs.type = "text/javascript";
        cdjs.onload = cdjs.onreadystatechange = function() {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                jQuery.noConflict();
                if (callback && typeof callback === "function") { callback() }
                cdjs.onload = cdjs.onreadystatechange = null
            }
        };
        document.getElementsByTagName('head')[0].appendChild(cdjs)
    } else { callback() }
};

function withBaizhuPreUrl(callback) {
    if (typeof baizhuPreUrl === 'undefined') {
        var cdjs = document.createElement("script");
        var requestHandler = "//data.9xiazaiqi.com/script/down_track.js";
        cdjs.src = requestHandler;
        cdjs.type = "text/javascript";
        cdjs.onload = cdjs.onreadystatechange = function() {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                if (callback && typeof callback === "function") {
                    callback();
                }
                cdjs.onload = cdjs.onreadystatechange = null;
            }
        };
        document.getElementsByTagName('head')[0].appendChild(cdjs);
    } else {
        callback();
    }
};

withBaizhuPreUrl(function() {
    withJQ(function() {

        var $ = jQuery;

        var xzq_softname = document.title.split('-')[0];
        xzq_softname = xzq_softname.replace(/&nbsp;/ig, "").replace(/\s/ig, "");
        var xzq_channelID = "767";
        var xzq_softID = 2;
        var xzq_URL = function() {
            return baizhuPreUrl + xzq_softname + '@' + xzq_channelID + '_' + xzq_softID + '.exe';
        };
        (function() {
            if ($('.zengdown_tit').length == 0) {
                setTimeout(arguments.callee, 800);
            } else {
                $('.zengdown_tit').eq(0).after('<div><a style="margin-right:30px;margin-bottom:5px" href="' + xzq_URL() + '" bz_track="' + xzq_channelID + '"><div style="max-width:100%; height:80px; background:url(https://data.9xiazaiqi.com/image/5kele/5kele-912.gif) no-repeat;background-size:contain;"></div></a></div> ')
                // $('.zengdown_tit').eq(0).after('<div style="margin-bottom:5px"><a style="margin-right:30px" href="' + xzq_URL() + '" bz_track="' + xzq_channelID + '"><img src="https://data.9xiazaiqi.com/image/5kele/5kele-912.gif"/></a></div> ')
                //after('<div style="margin-bottom:15px"><a style="margin-right:30px" href="' + xzq_URL() + '" bz_track="' + xzq_channelID + '"><img src="https://data.9xiazaiqi.com/image/5kele/5kele_left.png" onmouseover="this.src=\'https://data.9xiazaiqi.com/image/5kele/5kele_left_hover.png\'" onmouseout="this.src=\'https://data.9xiazaiqi.com/image/5kele/5kele_left.png\'"  /></a><a href="' + xzq_URL() + '" bz_track="' + xzq_channelID + '"><img src="https://data.9xiazaiqi.com/image/5kele/5kele_right.png" onmouseover="this.src=\'https://data.9xiazaiqi.com/image/5kele/5kele_right_hover.png\'" onmouseout="this.src=\'https://data.9xiazaiqi.com/image/5kele/5kele_right.png\'"  /></a></div>')
            }
        })();

    });
});