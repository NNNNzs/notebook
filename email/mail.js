const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host:'smtp.qq.com',
    secureConnection:true,
    port:465,
    auth:{
        user:'nnnnzs@vip.qq.com',
        pass:'xrvvnoybowaxbbhi'
    }
});
var html = `
<div>

<p class="section txt">巴西甲：弗鲁米塞顿vs克罗塞罗</p>
<p class="section txt">在连续输给伊亚斯、桑托斯,遭遇赛季开门，“两连黑”之后，俘虏 弥敦塞随后大爆发，在上半场就0-3落后下，最终以5-4逆转战胜格雷米奥，表现出人意料。</p>
<p class="section txt">但是回到主场，俘虏弥敦塞0-1负于实力不强的博塔弗戈，攻击手再次集体“隐身”’，这很像是上赛季他们的常态表现。虽然新援库佩特已有进球，但能力有限，还是没能改变球队攻击力不强的问题。</p>
<p class="section txt">防守端，俘虏弥敦塞也没有表现出进步的迹象，每场都有失球，本场迎战克鲁塞罗前景不妙。往绩方面，弗鲁米顿塞过去10次主场对阵克鲁塞罗仅输1场，有一定优势。</p>
<p class="section txt">克鲁塞罗新赛季已经遭遇两场失利，分别输给弗拉门戈、巴西国际，这两个对手都是上赛季三甲球队，输得不算意外，但也预示着球队重返争冠行列还需时日。</p>
<p class="section txt">与弗鲁米顿塞一样，克鲁塞罗也是一支缺乏得力攻击手的球队，上赛季队内头号射手阿拉斯卡埃塔仅6球交差，本赛季已经转会离开，二号射手拉尼尔新新赛季遭遇伤病，尚未复出。</p>
<figure class="section img">
<a class="img-wrap" style="padding-bottom: 66.72%;" data-href="https://08imgmini.eastday.com/mobile/20190519/20190519064929_5485e2094323a6397ace3b34bcea6d7c_1.jpeg" data-size="640x427">
<img width="100%" alt="" src="https://08imgmini.eastday.com/mobile/20190519/20190519064929_5485e2094323a6397ace3b34bcea6d7c_1.jpeg" data-weight="640" data-width="640" data-height="427">
</a>
</figure>
<p class="section txt">6.老将弗雷德尚未在巴甲开张，新援佩德罗-罗沙发挥最稳，已有2球入账，但是从未打满全场，似乎体能不佳，总之两队目前问题相似，相对来说，似乎体能不佳，总之两队目前问题相似，相对来说，克鲁塞罗防守水准更高。不如看好小球。</p>
</div>

`
var mailOptions={
    from:'NNNNzs nnnnzs@vip.qq.com',
    to:'709934831@qq.com',
    subject:'Hello',
    text:'hello',
    html:html,
}
transport.sendMail(mailOptions,(err,res)=>{
    if(err)console.log(err)
    else console.log(res)
})