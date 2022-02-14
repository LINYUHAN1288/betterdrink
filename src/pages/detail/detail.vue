<template>
  <detail-star
    :data="wine"
    :fileName="name"
    :isInShelf="isInShelf"
  />
</template>

<script>
import detailStar from '../../components/detail/detailStar.vue'
import { getStorageSync } from '../../api/wechat'
import { getDetailData, getShelf } from '@/api'
// import { get } from '@/utils/request'
export default {
  components: { detailStar },
  data () {
    return {
      wine: {},
      token: '7yQdGyInGrOg5heuo',
      result: [],
      name: null,
      isInShelf: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const fileName = this.$route.query.fileName
      this.name = fileName
      const openId = getStorageSync('openId')
      if (openId) {
        getShelf(openId, fileName).then(response => {
          const data = response.data.data
          if (data.length === 0) {
            this.isInShelf = false
          } else {
            this.isInShelf = true
          }
        })
      }
      getDetailData(openId, fileName).then(res => {
        this.result = res.data.data
        this.wine = this.result
        console.log(this.wine)
      })
    }
  }
}
</script>

<style>

</style>