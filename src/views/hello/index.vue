<template>
  <div class="hello">
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  name: "hello",
  components: {
  
  },
  data () {
    return {
      title: 'web监控设备',
      subtitle: '请使用google浏览器PC端和移动端',
    }
  },
  mounted () {
   
  },
  methods: {
    
  }
};
</script>

<style lang="less" scoped>

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
  font-size: 18px;
  font-weight: bold;
  margin: 1em 0;
}


</style>

