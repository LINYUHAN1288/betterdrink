<template>
  <div>
    <div class="price-wrapper" v-for="(item, index) in result" :key="index">
      <price-card
        :data="item"
      />
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request'
import priceCard from '../../components/price/priceCard.vue'
import { hideLoading, showLoading } from '../../api/wechat'
export default {
  components: { priceCard },
  data () {
    return {
      content: '',
      token: '7yQdGyInGrOg5heuo',
      result: []
    }
  },
  mounted () {
    const name = this.$route.query.name
    showLoading({ title: '正在加载' })
    const params = {
      content: name,
      appkey: this.token
    }
    get('https://api.mkstone.club/api/v1/open/jd/searchGoodsSimple', params).then(
      (res) => {
        const data = res.data.Data
        this.result = data
        hideLoading()
      }
    )
  }
}
</script>

<style>

</style>