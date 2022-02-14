<template>
  <div>
    <image :src="data.cover" class="img"></image>
    <div class="info-wrapper">
      <div class="wine-name">红酒名称: {{data.wineName}}</div>
      <div class="wine-name">所属国家: {{data.country}}</div>
      <div class="wine-name">红酒产区: {{data.region}}</div>
      <div class="wine-name">所属酒庄: {{data.winery}}</div>
      <div class="wine-name">糖分类型: {{data.sugar}}</div>
      <div class="wine-name">红酒类型: {{data.cate}}</div>
      <div class="wine-name">品尝温度: {{data.temparature}}</div>
      <div class="wine-name">酒品描述: {{data.des}}</div>
    </div>
  </div>
</template>

<script>
import { getHistoryById } from '@/api'
export default {
  data () {
    return {
      result: [],
      data: {}
    }
  },
  methods: {
    getDetailInfo () {
      const Id = this.$route.query.id
      getHistoryById(Id).then(res => {
        this.result = res.data.data
        this.data = this.result[0]
      })
    }
  },
  mounted () {
    this.getDetailInfo()
  }
}
</script>

<style lang="less" scoped>
  .img {
    width: 100%;
    height: 45vh;
  }
  .info-wrapper {
    margin: 10px 20px;
    height: 44vh;
    .wine-name {
      font-size: 14px;
      color: #67686b;
      line-height: 2;
      overflow: hidden;
      font-weight: 500;
    }
  }
</style>