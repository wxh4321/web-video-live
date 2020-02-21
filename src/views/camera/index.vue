<template>
  <div class="camera">
    <div class="title">视频监控端</div>
    <video id="video" autoplay></video>
    <Button id="snap">按钮模拟拍照</Button>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import { getWebLive } from "@/services/api";
import { blob2base64 } from "@/utils/Tools";
let socket = null,
  aVideo = null,
  aCanvas = null,
  ctx = null;

//访问用户媒体设备的兼容方法
function getUserMedia1(constrains, success, error) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //最新标准API
    navigator.mediaDevices
      .getUserMedia(constrains)
      .then(success)
      .catch(error);
  } else if (navigator.webkitGetUserMedia) {
    //webkit内核浏览器
    navigator
      .webkitGetUserMedia(constrains)
      .then(success)
      .catch(error);
  } else if (navigator.mozGetUserMedia) {
    //Firefox浏览器
    navagator
      .mozGetUserMedia(constrains)
      .then(success)
      .catch(error);
  } else if (navigator.getUserMedia) {
    //旧版API
    navigator
      .getUserMedia(constrains)
      .then(success)
      .catch(error);
  }
}

function sendSocketData(socket, back, backcontext, video) {
  // polyfill 提供了这个方法用来获取设备的 pixel ratio
  var getPixelRatio = function(context) {
    var backingStore =
      context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;

    return (window.devicePixelRatio || 1) / backingStore;
  };
  var ratio = getPixelRatio(backcontext);

  let { width, height } = window.getComputedStyle(back, null);
  width = width.replace('px', '');
  height = height.replace('px', '');
  // 根据设备像素比优化canvas绘图
  const devicePixelRatio = window.devicePixelRatio;
  if (devicePixelRatio) {
    back.style.width = `${width}px`;
    back.style.height = `${height}px`;
    back.height = height * devicePixelRatio;
    back.width = width * devicePixelRatio;
    backcontext.scale(devicePixelRatio, devicePixelRatio);
  } else {
    back.width = width;
    back.height = height;
  }
  //打开socket
  socket.onopen = function() {
    draw();
    console.log("open success");
  };

  // 将视频帧绘制到Canvas对象上,Canvas每100ms切换帧，形成肉眼视频效果
  var draw = function() {
    try {
      // backcontext.drawImage(video, 0, 0, back.width, back.height);
      //增强canvas清晰度
      backcontext.drawImage(video, 0, 0, back.width * ratio, back.height * ratio);
    } catch (e) {
      if (e.name == "NS_ERROR_NOT_AVAILABLE") {
        return setTimeout(draw, 100);
      } else {
        throw e;
      }
    }

    if (video.srcObject) {
      // Canvas的内容转化成PNG data URI并发送到服务器，0.5为和压缩系数
      socket.send(back.toDataURL("image/jpeg", 0.5));
    }
    setTimeout(draw, 100);
  };
}

function gotStream(stream) {
  video.srcObject = stream;
  video.onerror = function() {
    stream.stop();
  };
  stream.onended = noStream;
  video.onloadedmetadata = function() {
    let cameraid = stream.id;
    socket = new WebSocket(
      "wss://" + document.domain + ":8008/" + "camera" + cameraid
    );
    let mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = function(blob) {
      let file = new File(
        [blob.data],
        "msr-" + new Date().toISOString().replace(/:|\./g, "-") + ".mkv",
        {
          type: "video/x-matroska"
        }
      );

      let params = {
        cameraid: cameraid,
        streamer: file
      };
      if (blob.data.size > 0) {
        sendLiveStream(params);//保存视频到后台
      }
    };
    mediaRecorder.start(1000);
    sendSocketData(socket, aCanvas, ctx, aVideo); //socket发送直播数据
  };
}

function noStream(err) {
  alert(err);
}
function sendLiveStream(params) {
  var formData = new FormData();
  formData.append("streamer", params.streamer);
  formData.append("cameraid", params.cameraid);
  var request = new XMLHttpRequest();
  var url = "https://" + document.domain + ":30800/web/live/";
  request.open("POST", url);
  request.send(formData);
  let self = this;
  request.onreadystatechange = function() {
    var res = request.responseText;
    console.log(res);
  };
}

function runner() {
  aVideo = document.getElementById("video");
  aCanvas = document.getElementById("canvas");
  ctx = aCanvas.getContext("2d");
  document.getElementById("snap").addEventListener("click", function() {
    ctx.drawImage(aVideo, 0, 0, 300, 150); //将获取视频绘制在画布上
  });
}
export default {
  name: "hello",
  components: {},
  data() {
    return {
      title: "web监控设备",
      subtitle: "使用flv.js视频流"
    };
  },
  beforeMount() {
    getUserMedia1(
      {
        audio: true,
        video: { facingMode: "environment" } //后置摄像头
        // video: { facingMode: "user" }
      },
      gotStream,
      noStream
    ); //参数1获取用户打开权限；参数二成功打开后调用，并传一个视频流对象，参数三打开失败后调用，传错误信息
  },
  mounted() {
    console.log("mounted ");
    runner();
  },
  methods: {}
};
</script>
<style lang="less" scoped>
#video,
canvas {
  width: 600px;
  height: 400px;
  border: 1px solid red;
  margin: 5px;
}
.ivu-btn {
  background: #eee;
}
.camera {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #eee;
}
.title {
  height: 1em;
  line-height: 1em;
  font-weight: 700;
  font-size: 4rem;
  margin: 1.5em 0 1.2em;
}
</style>

