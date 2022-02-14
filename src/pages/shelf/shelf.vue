<template>
  <div class="shelf">
    <shelf-user-info
      :num="shelfList.length > 0 ? shelfList.length - 1 : 0"
      :user-info="userInfo"
      :read-day="readDay"
    />
    <shelf-list
      :shelf-list="shelfList"
    />
  </div>
</template>

<script>
import { getStorageSync } from '../../api/wechat'
import ShelfList from '../../components/shelf/shelfList.vue'
import shelfUserInfo from '../../components/shelf/shelfUserInfo.vue'
import { handleError } from '../../utils'
import { getShelf } from '@/api'
export default {
  components: { shelfUserInfo, ShelfList },
  data () {
    return {
      userInfo: {},
      shelfList: [],
      readDay: 1
    }
  },
  mounted () {
    const openId = getStorageSync('openId')
    if (openId) {
      getShelf(openId).then(response => {
        if (handleError(response)) {
          this.shelfList = response.data.data
          this.shelfList.push({})
        }
      })
    }
  }
}
</script>

<style>

</style>