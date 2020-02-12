<template>
  <div class="home">
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
    <Row type="flex" justify="center" :gutter="20">
      <Col :span="18">
        <Row type="flex" justify="start" :gutter="20" >
          <i-col :span="12" v-for="(item, i) in videoInfo" :key="`info-${i}`" style="margin-bottom:30px;">
            <Card>
              <p slot="title" style="">{{ item.title }}</p>
              <div >
                <!-- <RtmpLive :src="item.videoSrc"></RtmpLive> -->
                <Flv :src="item.videoSrc" :index="`${i+1}`"></Flv>
              </div>
            </Card>
          </i-col>
        </Row>
      </Col>
    </Row>
    <div class="example-title"> 点击屏幕开启声音,按键盘u增大声音,d减小声音,左键快退，右键快进 </div>
    
  </div>
</template>

<script>
import Flv from "@/components/flv.vue";
import { getUrlList,getBlobFileList } from "@/services/api";

function getLiveVideoList(that) {
  let func = async () => {
    try {
      const res = await getUrlList();
      // const res = await getBlobFileList();
      const { code, list } = res;
      console.log(res);
      if (code == 200) {
        list.forEach((e,i) => {
            let obj = {
                title:'视频'+(i+1),
                videoSrc:e
            };
            that.videoInfo.push(obj);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  func();
}
export default {
  name: "home",
  components: {
    Flv,
  },
  data () {
    return {
      title: '直播回放',
      subtitle: '可以回放昨天视频数据',
      videoInfo: [],
      imgSrc: '', // 图片路径
      canvas: '',
      context: '',
      videoTag: ''
    }
  },
  beforeMount(){
      getLiveVideoList(this);
  },
  mounted () {
   
  },
  methods: {
    
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

