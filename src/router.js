import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import hello from "./views/hello/index";
import Camera from "./views/camera";
import ShowLive from "./views/showlive";
import Live from "./views/live";
import VueVideoPlayer from 'vue-video-player'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(Router);
Vue.use(VueVideoPlayer);
Vue.use(ViewUI);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/live",
      name: "live",
      component: Live
    },
    {
      path: "/showlive",
      name: "showlive",
      component: ShowLive
    },
    {
      path: "/opencamera",
      name: "camera",
      component: Camera
    },
    {
      path: "/",
      name: "hello",
      component: hello
    }
  ]
});
