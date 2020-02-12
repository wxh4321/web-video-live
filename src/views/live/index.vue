<template>
  <div @click="onClickDiv">
    <div class="home" v-if="isOnClick">
      <div class="title">{{ title }}</div>
      <Row type="flex" justify="center" :gutter="20">
        <Col :span="18">
          <Row type="flex" justify="start" :gutter="20" >
            <i-col :span="12" v-for="(item, i) in imageLiveInfo" :key="`info-${i}`" style="margin-bottom:30px;">
              <Card>
                <p slot="title" style="">{{ item.title }}</p>
                <div @click="ClickVideo(item)">
                  <ImageLive :index="`${i+1}`" :imageName="item.imageName"></ImageLive>
                </div>
              </Card>
            </i-col>
          </Row>
        </Col>
      </Row>
    </div>
    <div class="home" v-if="!isOnClick">
      <ImageLive :index="`${0}`" :imageName="bigImageName"></ImageLive>
    </div>
  </div>
</template>

<script>
import ImageLive from "@/components/ImageLive.vue";
let supreceiver = new WebSocket("wss://"+document.domain+":8008/"+"SuperClient"+new Date().getTime());

export default {
  name: "home",
  components: {
    ImageLive,
  },
  data () {
    return {
      title: '直播',
      subtitle: '视频流',
      imageLiveInfo: [],
      ObjectList:[],
      count:0,
      isRowAlive:true,
      isOnClick:true,
      bigImageName:''
    }
  },
  beforeMount(){
    let that = this;
    //监听消息
    supreceiver.onmessage = function(data)
      {
        const msg = JSON.parse(data.data);
        if(msg.ObjectName=='noid'){
           that.imageLiveInfo = [];
        }
        if(that.count!==msg.ObjectList.length){
          that.imageLiveInfo = [];
          that.ObjectList = msg.ObjectList;
          msg.ObjectList.forEach((e,i) => {
            let obj = {
                title:'直播'+(i+1),
                imageName:e
            };
            setTimeout(()=>{
              that.imageLiveInfo.push(obj);
            },100);
          });
          that.count = msg.ObjectList.length;
        }
    }
   
  },
  mounted () {
   
  },

  methods: {
    ClickVideo(item){
      let _this = this;
      _this.bigImageName = item.imageName;
    },
    onClickDiv(){
      let _this = this;
      _this.isOnClick = !_this.isOnClick;
      if(_this.isOnClick){
        _this.imageLiveInfo = [];
        _this.ObjectList.forEach((e,i) => {
          let obj = {
              title:'直播'+(i+1),
              imageName:e
          };
          setTimeout(()=>{
            _this.imageLiveInfo.push(obj);
          },100);
        });
      }
    },
    refreshRow() {
     this.isRowAlive = false;
     setTimeout(() => {this.isRowAlive = true;},800);
   }   
  }
};
</script>

<style lang="less" scoped>
a {
  color: #42b983;
  // color: #fff;
}
a:hover {
  color: #fff;
}
#receiver{
  background-color:#fff;
  border:1px solid red;
  height:400px;
  width:600px;
}
.title {
  height: 1em;
  line-height: 1em;
  font-weight: 700;
  font-size: 4rem;
  margin: 1.5em 0 1.2em;
}
.subtitle {
  font-size: 1.8em;
  color: #a5a5a5;
  margin: 1em 0;
  font-weight: bold;
}
.actions {
  margin-top: 3em;
  margin-bottom: 2em;
}
.example-title {
  font-size: 1.8em;
  font-weight: bold;
  margin-top: 3em;
  margin-bottom: 2em;
}
</style>

