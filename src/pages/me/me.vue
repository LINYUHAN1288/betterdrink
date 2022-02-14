<template>
  <div>
    <div class="out-wrapper" @click="gotoSetting">
      <div class="wrapper">
        <image
          class="img"
          mode="scaleToFill"
          :src="userInfo.avatarUrl"
        />
        <div class="right">
          <div class="name">{{userInfo.nickName}}</div>
          <div class="region">地区: {{userInfo.country}}</div>
        </div>
      </div>
      <van-icon color="#fff" name="arrow" class="arrow"></van-icon>
    </div>
    <van-cell-group>
      <van-cell
        is-link
        icon="like-o"
        title="我的酒柜"
        link-type="navigateTo"
        size="large"
        url="/pages/shelf/main"
      />
      <van-cell
        is-link
        title="历史识别"
        icon="completed"
        link-type="navigateTo"
        size="large"
        url="/pages/history/main"
      />
      <van-cell
        is-link
        title="个人设置"
        icon="setting-o"
        size="large"
        link-type="navigateTo"
        url="/pages/setting/main"
      />
      <van-cell
        is-link
        title="用户反馈"
        icon="records"
        size="large"
        link-type="navigateTo"
        url="/pages/suggest/main"
      />
      <van-cell
        is-link
        title="关于我们"
        icon="manager-o"
        size="large"
        link-type="navigateTo"
        url="/pages/about/main"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getStorageSync } from '../../api/wechat'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.userInfo = getStorageSync('userInfo') || {}
    },
    gotoSetting () {
      this.$router.push('/pages/setting/main')
    }
  }
}
</script>

<style lang="less" scoped>
.out-wrapper {
  padding: 30px 20px;
  background-image: linear-gradient(90deg, #64515c 0%, #724a61 100%);
  display: flex;
  align-items: center;
  .wrapper {
    width: 100%;
    padding: 10px;
    height: 100px;
    align-items: center;
    display: flex;
    .img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
    }
    .right {
      margin-left: 20px;
      .name {
        font-size: 20px;
        color: azure;
        line-height: 2;
      }
      .region {
        font-size: 12px;
        color: azure;
        line-height: 32px;
        display: inline-block;
        white-space: nowrap; 
        width: 200px; 
        overflow: hidden;
        text-overflow:ellipsis;
      }
    }
  }
  .arrow {
    margin-left: 20px;
  }
}
</style>