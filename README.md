# vue、python Flask、websocket实现家用视频监控
兼容性目前仅支持chrome浏览器
已知未解决bug：手机端打开chrome存在噪音，仔细google下应该能解决，懒得弄了，华为荣耀8手机可以直接静音，不影响视频录制
# web-video-live

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

注释：本git与[LiveCameraServer（视频存储后台）](https://github.com/wxh4321/LiveCameraServer)和[web-video-live-Server（监控后台）](https://github.com/wxh4321/web-video-live-Server)配合使用,并可以使用openssl生成证书搭建局域网监控设备。

#node版本 v10.11.0

## 特别鸣谢以下文章作者和相关技术大佬
#1、[web-video-live](https://github.com/fuyi501/web-video-live)
#2、[HTML5中的websocket实现直播](https://blog.csdn.net/qq_39364032/article/details/79744309)

