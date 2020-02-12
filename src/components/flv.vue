<template>
  <div @click="clickVideo">
    <video autoplay muted :id="id" style="background-color:#fff;height:600px;width:100%;"
  ></video>
  </div>
</template>

<script>
import flvjs from 'flv.js';
function openVideoListener(videoElement,_this){
  var vol = 0.1;//1代表100%音量，每次增减0.1
  var time = 10;//单位秒，每次增减10秒
  document.onkeyup = function(event){//键盘抬起事件
    console.log("keycode:"+event.keyCode);
    var e = event||window.event||arguments.callee.arguments[0];

    //键盘上下控制音量
    if(e&&(e.keyCode===38||e.keyCode===85)){
      if(videoElement.volume>=1){
         _this.$Message.info('声音开到最大啦');
         return false;
      }
      //向上键
      videoElement.volume!==0?videoElement.volume+=vol:1;
      return false;
    }
    else if(e&&(e.keyCode===40||e.keyCode===68)){
      if(videoElement.volume<=0.1){
         _this.$Message.info('声音开到最小啦');
         return false;
      }
      //向下键
      videoElement.volume!==0?videoElement.volume-=vol:1;
      return false;
    }
     else if(e&&e.keyCode===37){
      //向左键
      videoElement.currentTime!==0?videoElement.currentTime-=time:1;
      return false;
    }
     else if(e&&e.keyCode===39){
      //向右键
      videoElement.currentTime!==0?videoElement.currentTime+=time:1;
      return false;
    }
     else if(e&&e.keyCode===32){
      //空格键暂停
      //判断当前是否暂停
      videoElement.paused===true?videoElement.play():videoElement.pause();
      return false;
    }
  }
}
export default {
  name: 'flvjs',
  props: {
    src: {
      type: String,
      default: 'http://cyberplayerplay.kaywang.cn/cyberplayer/demo201711-L1.flv'
      // default: 'http://192.168.9.12:8080/live?app=live&stream=stream'
    },
    index:0,
  },
  data () {
    return {
      id:"videoElement"+this.index
    }
  },
  mounted () {
    let _this = this;
    let flvSrc = this.src
    // console.log('flvSrc:', flvSrc)
    // console.log('videoElement'+_this.index);
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById(_this.id);
      var flvPlayer = flvjs.createPlayer({
        type: 'mkv',
        // url: 'http://yunxianchang.live.ujne7.com/vod-system-bj/TLaf2cc9d469939803949187b46da16c45.flv'
        url: flvSrc
      })
      flvPlayer.attachMediaElement(videoElement)
      flvPlayer.load()
      flvPlayer.play()
    }
  },
  methods:{
    clickVideo(){
       let _this = this;
       var videoElement = document.getElementById(_this.id);
       openVideoListener(videoElement,_this);
       if(videoElement.muted){
          _this.$Message.info('您开启了声音');
          videoElement.muted = false;
        }
        else{
          _this.$Message.info('您关闭了声音');
          videoElement.muted = true;
        }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
