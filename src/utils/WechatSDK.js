import wx from "weixin-js-sdk";
import URLPath from '../config/URLPath'
import axios from 'axios'

const instance = axios.create({
    // baseURL: URLPath.backend,
    baseURL: URLPath.backend,
});

const get_signature = (url, callback) => {
    instance.get('/ticket_signature/', {
        params: {
            url: url
        }
    })
        .then(obj => {
            if (obj.status === 200) {
                callback && callback(obj.data)
            }
        })
        .catch(e => {
        })

}

const config = (url) => {
    return new Promise((resolve, reject) => {
        get_signature(url, ({result}) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appID, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.noncestr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            resolve()
        })
    })


}
const ready = (title = '', desc = '', link = URLPath.domain, imgUrl = URLPath.logo_url, success, cancel) => {

    config(link)
        .then(() => {
            wx.ready(function () {
                let shareData = {
                    title: title,	//	标题
                    desc: desc,	//	描述
                    link: link,	//	分享的URL，必须和当前打开的网页的URL是一样的
                    imgUrl: imgUrl,	//	缩略图地址
                    success: success && success(),
                    cancel: cancel && cancel()
                };
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareWeibo(shareData);
                wx.onMenuShareQZone(shareData);

            })
        })


}

const error = (error) => {
    wx.error(function (res) {
        error && error(res)
    });
}

var wechat = {
    config,
    ready,
    error
}

export default wechat