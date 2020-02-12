<template>
  <div @click="clickImage">
      <Tooltip :content="ttContent" placement="top">
            <img :id="id"/>
      </Tooltip>
  </div>
</template>

<script>
let receiver_socket = null;
function init(that){
  if(that.index==0){
    that.ttContent='点击缩小';
  }
}
function changeImageSize(that,image){
  if(that.index==0){
    image.style.height = window.innerHeight+"px";
    image.style.width = window.innerWidth+"px";
  }
}
export default {
  name: "livePage",
  props: {
    index: 0,
    imageName:'',
  },
  data() {
    return {
      id: "imageLive" + this.index,
      ttContent:'点击放大'
    };
  },
  beforeMount(){
     receiver_socket = new WebSocket("wss://"+document.domain+":8008/"+"client"+this.index+new Date().getTime());

  },
  mounted() {
    let _this = this;
    init(_this);
    //创建一个socket实例
    var image = document.getElementById(_this.id);
    changeImageSize(this,image);
    // 监听消息
    receiver_socket.onmessage = function(data) {
        const msg = JSON.parse(data.data);
        if(_this.imageName==msg.ObjectName){
            image.src = msg.ObjectData;
        }
    };

  },
  methods: {
    clickImage() {
     
    }
  }
};
</script>

<style lang="less" scoped>
img{
    width:600px;
    height:400px;
}
</style>
