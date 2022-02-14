<template>
  <div class="search-table">
    <div class="search-book" v-for="item in data" :key="item.id" @click="onClick(item)">
      <div class="search-img-wrapper">
        <div class="search-img">
          <image-view :src="item.cover" />
        </div>
      </div>
      <div class="search-info">
        <div class="search-title">{{item.wineName}}</div>
        <div class="search-author">{{item.winery}}</div>
        <div class="search-category">{{item.region}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import imageView from '../base/imageView.vue'
export default {
  components: { imageView },
  props: {
    data: Array
  },
  methods: {
    onClick (wine) {
      console.log(wine.id)
      this.$router.push({ path: '/pages/historydetail/main', query: { id: wine.id } })
    }
  }
}
</script>

<style lang="less">
  .search-table {
    padding: 0 15px;
    .search-book {
      display: flex;
      padding: 15px 0;
      .search-img-wrapper {
        flex: 0 0 45px;
        width: 60px;
        height: 80px;
        .search-img {
          width: 60px;
          height: 80px;
        }
      }

      .search-info {
        display: flex;
        overflow: hidden;
        flex-flow: column nowrap;
        margin-left: 15px;
        height: 60px;
        justify-content: space-between;
        .search-title {
          width: 100%;
          font-size: 14px;
          color: #333;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .search-author {
          width: 100%;
          font-size: 12px;
          color: #666;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .search-category {
          width: 100%;
          font-size: 11px;
          color: #999;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
</style>