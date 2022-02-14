<template>
  <div class="authorized">
    <div class="auth-wrapper">
      <div class="auth-info-wrapper">
        <div class="auth-img">
          <image-view
            src="https://i.loli.net/2021/03/30/9LPBRbxySqu5NVn.jpg"
            height="100%"
            mode="scaleToFill"
            round
          ></image-view>
        </div>
        <div class="auth-text">登录BetterDrink</div>
        <div class="auth-strong-text">全球红酒鉴赏</div>
      </div>
      <button
        class="auth-btn"
        @click="getUserInfo"
        open-type="getUserInfo"
        plain="true"
        v-if="platform === 'wx'"
      >
        授权登录
      </button>
      <button
        class="auth-btn"
        plain="true"
        open-type="getAuthorize"
        scope='userInfo'
        v-else
      >
        授权登录
      </button>
    </div>
  </div>
</template>

<script>
import imageView from '../base/imageView'
export default {
  components: {
    imageView
  },
  data () {
    return {
      platform: mpvuePlatform
    }
  },
  methods: {
    getUserInfo (res) {
      this.$emit('getUserInfo', res)
    }
  }
}
</script>

<style lang="less" scoped>
  .authorized {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #999999;

    .auth-wrapper {
      position: relative;
      width: 270px;
      height: 248px;
      background: #f5f5f5;
      border-radius: 18px;

      .auth-info-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 22.5px;

        .auth-img {
          width: 74px;
          height: 74px;
        }

        .auth-text {
          font-size: 13px;
          color: #999;
          margin-top: 18px;
        }

        .auth-strong-text {
          font-size: 16px;
          color: #333;
          margin-top: 3.5px;
          font-weight: 500;
        }
      }

      .auth-btn {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 49px;
        line-height: 49px;
        font-size: 15px;
        font-weight: 500;
        background-image: linear-gradient(270deg, #1EA3F5 0%, #0F87FC 100%);
        color: #fff;
        border: none;
        border-radius: 0 0 18px 18px;
      }
    }
  }
</style>