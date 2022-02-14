<template>
  <div>
    <home-wine
      :data="category"
      :row="(category && category.length / 2) || 0"
      :col="2"
      :showBtn=false
      :showTitle=false
      :mode="modeCategory"
      @onWineClick="gotoCategoryList"
    />
  </div>
</template>

<script>
import { get } from '@/utils/request'
import { HOMEWINE_MODE, CATEGORY } from '@/utils/const'
import HomeWine from '../../components/home/HomeWine.vue'
export default {
  components: { HomeWine },
  data () {
    return {
      category: []
    }
  },
  computed: {
    modeRow () {
      return HOMEWINE_MODE.ROW
    },
    modeCategory () {
      return HOMEWINE_MODE.CATEGORY
    }
  },
  mounted () {
    this.getCategoryInfo()
    // this.test()
  },
  methods: {
    getCategoryInfo () {
      get('http://10.242.6.24:4000/book/category/list/v2').then(
        (res) => {
          const data = res.data.data
          this.category = data
          this.category.forEach(c => {
            c.text = c.categoryText
          })
          console.log(res)
        }
      )
    },
    test () {
      this.category.forEach(c => {
        c.text = CATEGORY[c.categoryText.toLowerCase()]
      })
    },
    gotoCategoryList (data) {
      const { category, text } = data
      const query = { categoryId: category, title: text }
      this.$router.push({path: '/pages/list/main', query})
    },
    showCategoryList () {}
  }
}
</script>

<style>

</style>