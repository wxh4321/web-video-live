const H5 = 'H5';
const IOS = 'IOS';
const ANDROID = 'ANDROID';
const H5_CHINESE_NAME = '网页H5';

const parseParams = (str) => {
    let params = {}
    str = str.replace('?', '')
        str = str.split('&')
        for (let i in str) {
            let dict = str[i].split('=')
            if (dict.length > 1) {
                params[dict[0]] = dict[1]
            }
        }

        return params
}

const checkField = (fn,text)  => (rule,value,callback) => {
    var newFn = typeof fn != 'function' ? fn.test : fn;
    try{
        if(!newFn.call(fn,value)){
            callback(text)
        }else{
            callback()
        }
    }catch(e){
        console.log(e)
    }
    
}


//是否在微信环境
function isInWeiXin(){
    var ua = navigator.userAgent.toLowerCase();
    console.log(ua);
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        return true;
    }else{
        return false;
    }
}
//是否在微信小程序环境
function isWeChatMiniApp() {
    var ua = navigator.userAgent.toLowerCase();
    // web-view下的页面内
    function ready() {
        if(window.__wxjs_environment === 'miniProgram'||window.__wxjs_environment === 'miniprogram'||
        ua.indexOf('miniProgram') != -1||ua.indexOf('miniprogram') != -1){
            window.env['appName'] = WECHATMINI;
        }
    }
    if (typeof window.WeixinJSBridge == "undefined"|| !window.WeixinJSBridge.invoke) {
        if( document.addEventListener){
            document.addEventListener('WeixinJSBridgeReady', ready, false);
        }
    } 
    else {
        ready();
    }
  }

//获取微信回掉参数
function getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let url = window.location.href.split('#')[0]
    let search = url.split('?')[1]
    if (search) {
      var r = search.substr(0).match(reg)
      if (r !== null) return unescape(r[2])
      return null
    } else {
      return null
    }
}
//解决浏览器缓存
function timestamp(){
    let url = window.location.href;
    if(url.indexOf('timestamp')>-1){
        return;
    }
    if(url.indexOf('response_type')>-1){//微信内置支付判断
        return;
    }
    
    var  getTimestamp = new Date().getTime();
    if(url.indexOf("?")>-1){
        url=url+"&timestamp="+getTimestamp
    }else{
        url=url+"?timestamp="+getTimestamp
    }
    window.history.replaceState(null,null,url);//H5跳转页面不刷新
}

//记录访问过的url//暂时没用到
function historyPushLastUrl(){
    let obj;
    if(localStorage.getItem('urlstack')){
      obj = JSON.parse(localStorage.getItem('urlstack'));
    }
    else{
      obj = {};
    }
    let {urlstack} = obj;
    console.log('urlstack: ');
    console.log(urlstack);
    if(urlstack&&urlstack.length>=0){//window.location.pathname
        let current_url = window.location.pathname+window.location.search.split('timestamp')[0];
        if(urlstack.length>0&&current_url!==urlstack[urlstack.length-1]){
          urlstack.push(current_url);
        }
        else if(urlstack.length==0){
          urlstack.push(current_url);
        }
        
    }
    else{
        urlstack = [];
    }
    localStorage.setItem('urlstack',JSON.stringify({urlstack:urlstack}));
}
const dataURLtoBlob=(dataURL)=> {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bStr = atob(arr[1]);
    let n = bStr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bStr.charCodeAt(n);
    }
    //   return new Blob([u8arr], { type: mime });
    var blob = new Blob([u8arr], { type: mime });
    const files = new window.File(
        [blob],
        'qianzi.png',
        { type: 'image/png' }
    );
    return files;
}
const blob2base64=(blob, callback) => {
    // const blobUrl = URL.createObjectURL(blob);
    const File = new FileReader();
    File.onload = function(e) {
      callback(e.target.result);
    };
    File.readAsDataURL(blob);
}
const generateUUID = () => {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


const Tools = {
    generateUUID,
    parseParams,
    checkField,
    ANDROID,
    IOS,
    H5,
    isInWeiXin,
    isWeChatMiniApp,
    getUrlParam,
    timestamp,
    historyPushLastUrl,
    dataURLtoBlob,
    blob2base64,
}

module.exports = Tools
