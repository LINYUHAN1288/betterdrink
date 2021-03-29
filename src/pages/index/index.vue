<template>
  <div>
    <search-bar
    ></search-bar>
    <camera-button 
      img="https://i.loli.net/2021/03/28/2agZ3MhWtnoQjcA.jpg"
      title="强大的红酒识别功能"
      subTitle="立即体验"
    />
    <home-card />
    <home-wine title="为你推荐" :row="1" :col="3" />
    <van-tabbar :active="active" @change="onChange" active-color="#2C2180"
  inactive-color="#888B8C">
      <van-tabbar-item name="home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item name="photo" icon="photograph">识别</van-tabbar-item>
      <van-tabbar-item name="search" icon="search">发现</van-tabbar-item>
      <van-tabbar-item name="setting" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar.vue'
import CameraButton from '../../components/home/CameraButton.vue'
import ImageView from '../../components/base/imageView.vue'
import HomeCard from '../../components/home/HomeCard.vue'
import HomeWine from '../../components/home/HomeWine.vue'
export default {
  components: {
    SearchBar,
    CameraButton,
    ImageView,
    HomeCard,
    HomeWine
  },
  data () {
    return {
      active: 'home'
    }
  },
  methods: {
    onChange (event) {
      this.active = event.mp.detail
    }
  }
}
</script>

<style scoped>
</style>
