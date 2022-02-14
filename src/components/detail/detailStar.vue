<template>
  <div>
    <div class="card">
      <div class="card-info-l">
        <div class="card-img">
          <image-view :src="data.cover"></image-view>
        </div>
      </div>
      <div class="card-info-r">
        <div class="card-name">{{(data.title) || ''}}</div>
        <div class="shop-name">{{(data.author) || ''}}</div>
        <div class="shop-name">{{(data.publisher) || ''}}</div>
      </div>
    </div>
    <div class="detail-stat">
      <div class="detail-stat-l">
        <div class="detail-stat-rate-wrapper">
          <span class="detail-stat-rate">{{data.score/20.0}}</span>
          <van-rate
            :value="data.score/20.0"
            :size="16"
            color="#edbd55"
            void-color="#DEE0E2"
            void-icon="star"
          ></van-rate>
        </div>
      </div>
      <div class="detail-stat-r">
        <div class="detail-stat-num-wrapper">
          <span class="detail-stat-num">{{data.comments}}</span>
          人点评
        </div>
      </div>
    </div>
    <div class="card-info-bottom">
      <div class="card-desc">酒品描述：{{(data.originalName) || ''}}</div>
    </div>
    <div class="content-img">
      <image-view :src="data.cover"></image-view>
    </div>
    <div class="content-img">
      <image-view :src="data.cover"></image-view>
    </div>
    <div class="detail-bottom">
      <div class="detail-btn-wrapper">
        <van-button
          round
          @click="handleShelf" size="large" v-if="!isInShelf">加入酒柜</van-button>
        <van-button
          round
          @click="handleShelf" size="large" v-if="isInShelf">移出酒柜</van-button>
      </div>
      <div class="detail-btn-wrapper">
        <van-button
          round
          size="large"
          @click="moreClick">查看酒柜</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import imageView from '../base/imageView.vue'
import {
  // getDetailData,
  // getDetailContents,
  // getShelf,
  saveShelf,
  removeShelf
  // rank
} from '@/api'
import { getStorageSync, showToast, showModal } from '../../api/wechat'
export default {
  components: { imageView },
  props: {
    data: Object,
    fileName: String,
    isInShelf: Boolean
  },
  methods: {
    moreClick () {
      this.$router.push('/pages/shelf/main')
    },
    handleShelf () {
      if (this.isInShelf) {
        const vue = this
        showModal({
          title: '移出酒柜',
          content: `是否移出酒柜`,
          callback () {
            vue.removeFromShelf()
          }
        })
      } else {
        this.saveToShelf()
      }
    },
    saveToShelf () {
      const openId = getStorageSync('openId')
      if (!openId) {
        showToast('获取用户信息失败，请登录后重试')
      } else {
        saveShelf({
          fileName: this.fileName,
          openId
        }).then(response => {
          if (response.data.error_code === 0) {
            showToast('加入酒柜成功', true)
            this.isInShelf = true
          } else {
            showToast('失败')
          }
        })
      }
    },
    removeFromShelf () {
      const openId = getStorageSync('openId')
      if (!openId) {
        showToast('获取用户信息失败，请登录后重试')
      } else {
        removeShelf({
          fileName: this.fileName,
          openId
        }).then(response => {
          if (response.data.error_code === 0) {
            showToast('移出成功', true)
            this.isInShelf = false
          } else {
            showToast('失败')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .content-img {
    width: 100%;
    margin-top: 20px;
    padding: 20px 15px 60px 0;
  }
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 0 rgba(250, 250, 250, .9);
    .detail-btn-wrapper {
      flex: 1;
      margin: 2px;
    }
  }
  .card-info-bottom {
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    background: rgb(155, 129, 142);
    .card-desc {
      font-size: 16px;
      line-height: 22px;
      max-height: 66px;
      font-weight: 500;
      overflow: hidden;
      color: white;
      text-overflow: clip;
    }
  }
  .card {
    display: flex;
    padding: 10px 15px;

    .card-info-l {
      padding-right: 15px;

      .card-img {
        width: 100px;
      }
    }

    .card-info-r {
      flex: 1;
      overflow: hidden;

      .card-name {
        font-size: 16px;
        line-height: 22px;
        max-height: 66px;
        font-weight: 500;
        overflow: hidden;
        color: #000;
        text-overflow: clip;
      }

      .shop-name {
        margin-top: 10px;
        font-size: 14px;
        line-height: 18px;
        max-height: 36px;
        overflow: hidden;
        color: #333;
        text-overflow: clip;
      }
    }
  }
  .detail-stat {
    display: flex;
    padding: 10px 15px;

    .detail-stat-l {
      flex: 0 0 50%;
      width: 50%;

      .detail-stat-rate-wrapper {
        display: flex;
        align-items: center;

        .detail-stat-rate {
          font-size: 24px;
          color: #5E5E5E;
          margin-right: 10px;
        }
      }
    }

    .detail-stat-r {
      flex: 0 0 50%;
      width: 50%;

      .detail-stat-num-wrapper {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #868686;

        .detail-stat-num {
          font-size: 24px;
          color: #5E5E5E;
          margin-right: 5px;
        }
      }
    }
  }
</style>