<template>
  <div class="card">
    <div class="card-info-l">
      <div class="card-img">
        <image-view :src="data.image_url"></image-view>
      </div>
    </div>
    <div class="card-info-r">
      <div class="card-name">{{(data.sku_name) || ''}}</div>
      <div class="shop-name">{{(data.shop_name) || ''}}</div>
      <div class="price">￥{{(data.price) || ''}}</div>
    </div>
  </div>
</template>

<script>
import imageView from '../base/imageView.vue'
export default {
  components: { imageView },
  props: {
    data: Object
  }
}
</script>

<style lang="less" scoped>
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

      .price {
        margin-top: 10px;
        font-size: 15px;
        line-height: 16px;
        max-height: 16px;
        overflow: hidden;
        color: rgb(134, 57, 57);
        text-overflow: clip;
      }
    }
  }
</style>