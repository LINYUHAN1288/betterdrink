<template>
  <div>
    <history-table :data="data"/>
  </div>
</template>

<script>
import { getHistory } from '@/api'
import { getStorageSync } from '../../api/wechat'
import HistoryTable from '../../components/history/historyTable.vue'
export default {
  components: { HistoryTable },
  data () {
    return {
      data: []
    }
  },
  methods: {
    getHistoryInfo () {
      const openId = getStorageSync('openId')
      getHistory(openId).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          this.data = response.data.data
          // this.page++
        }
      })
    }
  },
  mounted () {
    this.getHistoryInfo()
  }
}
</script>

<style>

</style>