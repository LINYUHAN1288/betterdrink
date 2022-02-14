<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avatar-wrapper">
          <image-view
            :src="userInfo.avatarUrl"
            round 
            mode="scaleToFill"
            height="100%"
          />
        </div>
        <div class="nickname">{{userInfo.nickName}}</div>
        <div class="shelf-text">酒柜中共有{{num}}瓶珍藏</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="drink-info">
        <div class="drink-wrapper">
          <div class="home-card-img" v-for="(item, index) in wineList" :key="index" @click="onWineClick(item)">
            <image-view :src="item.cover"></image-view>
          </div>
        </div>
        <div class="shelf-wrapper" @click="gotoShelf">
          <div class="shelf">酒柜</div>
          <van-icon class="arrow" name="arrow"></van-icon>
        </div>
      </div>
      <div class="feedback-wrapper" @click="onFeedBackClick">反馈</div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import ImageView from '../base/imageView.vue'
import Dialog from 'vant-weapp/dist/dialog/dialog'
export default {
  components: {
    ImageView
  },
  props: {
    data: Object,
    hasSign: {
      type: Boolean,
      default: false
    },
    signDay: {
      type: Number,
      default: 0
    },
    num: Number
  },
  computed: {
    userInfo () {
      return (this.data && this.data.userInfo) || {}
    },
    wineList () {
      return (this.data && this.data.wineList) || {}
    }
  },
  methods: {
    gotoShelf () {
      this.$router.push('/pages/shelf/main')
    },
    onWineClick (wine) {
      this.$emit('onWineClick', wine)
    },
    sign () {},
    onFeedBackClick () {
      Dialog.confirm({
        title: '反馈',
        message: '您是否确认提交反馈信息？',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {
        console.log('是之后的事件')
      }).catch(() => {
        console.log('否之后的事件')
      })
    }
  }

}
</script>

<style lang="less" scoped>
  .home-card {
    position: relative;
    width: 100%;
    padding: 27px 15px 10px 15px;
    box-sizing: border-box;
    .home-card-inner {
      color: white;
      background-image: linear-gradient(90deg, #64515c 0%, #724a61 100%);
      border-radius: 15px;
      padding: 20px 15px 5px;
      .user-info {
        display: flex;
        align-items: center;
        .avatar-wrapper {
          width: 20px;
          height: 20px;
        }
        .nickname {
          font-size: 12px;
          color: #f4f4f4;
          margin-left: 10px;
        }
        .shelf-text {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #aaa;
          margin-left: 10px;
        }
      }
      .drink-info {
        display: flex;
        padding-top: 15px;
        .drink-wrapper {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .home-card-img {
            width: 80px;
            height: 105px;
          }
        }
        .shelf-wrapper {
          flex: 0 0 auto;
          padding-left: 15px;
          display: flex;

          .shelf {
            display: flex;
            align-items: center;
            width: 12px;
            font-size: 12px;
            line-height: 14px;
            color: #f4f4f4;
            word-break: break-word;
          }

          .arrow {
            width: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .feedback-wrapper {
        position: absolute;
        right: 15px;
        top: 47px;
        font-size: 10px;
        // width: 60px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background: #707070;
        color: #f4f4f4;
        border-radius: 50px 0 0 50px;

        &:active {
          opacity: .7;
        }
      }
    }
  }
</style>