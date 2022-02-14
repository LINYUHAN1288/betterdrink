<template>
  <div>
    <search-bar
      @onClick="onSearchBarClick"
      @onConfirm="onConfirm"
      @onChange="onChange"
      @onClear="onClear"
      :hotSearch="hotSearchWord"
      :focus="searchFocus"
      ref="searchBar"
    ></search-bar>
    <tag-group 
      :value="hotSearch"
      headerText="热门搜索"
      btnText="换一批"
      @onClick="onHotSearchClick"
      @onBtnClick="changeHotSearch"
      v-if="!showSearchList"
    />
    <tag-group 
      headerText="搜索历史"
      btnText="清空"
      @onClick="item => onHistoryClick(item)"
      @onBtnClick="clearHistorySearch"
      :value="historySearch"
      v-if="!showSearchList"
    />
    <search-list
      :data="searchList"
      v-if="showSearchList"
    />
  </div>
</template>

<script>
import tagGroup from '../../components/base/tagGroup.vue'
import SearchBar from '../../components/home/SearchBar.vue'
import SearchList from '../../components/search/searchList.vue'
import { search, hotSearch } from '@/api'
import { setStorageSync, getStorageSync } from '../../api/wechat'
const HOT_SEARCH_KEY = 'historySearch'
const OPEN_ID_KEY = 'openId'
export default {
  components: { tagGroup, SearchBar, SearchList },
  props: {
    hotSearchWord: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tags: [
        '波尔多',
        '干型',
        '起泡酒',
        '旋转木马'
      ],
      hotSearch: [],
      hotSearchKey: null,
      historySearch: [
        '干型葡萄酒'
      ],
      searchList: null,
      openId: null,
      page: 1,
      searchFocus: true
    }
  },
  computed: {
    showSearchList () {
      let keys = []
      if (this.searchList) {
        keys = Object.keys(this.searchList)
      }
      return this.searchList && keys.length > 0
    }
  },
  methods: {
    getHotSearch () {
      hotSearch().then(response => {
        const _hotSearch = response.data.data
        this.hotSearch = []
        this.hotSearchKey = []
        _hotSearch.forEach(i => {
          this.hotSearch.push(i.title)
          this.hotSearchKey.push(i.fileName)
        })
      })
    },
    onSearch (keyword, appendOpenId = false) {
      const params = {
        keyword,
        page: this.page
      }
      if (appendOpenId && this.openId) {
        params.openId = this.openId
      }
      search(params).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          this.searchList = response.data.data
        }
      })
    },
    onConfirm (keyword) {
      if (!keyword || keyword.trim().length === 0) {
        if (this.hotSearchWord && this.hotSearchWord.length > 0) {
          this.$refs.searchBar.setValue(this.hotSearchWord)
          keyword = this.hotSearchWord
        } else {
          return
        }
      }
      if (!this.historySearch.includes(keyword)) {
        this.historySearch.push(keyword)
        setStorageSync(HOT_SEARCH_KEY, this.historySearch)
      }
      this.searchFocus = false
      this.onSearch(keyword, true)
    },
    onChange (keyword) {
      if (!keyword || keyword.trim().length === 0) {
        this.searchList = null
        return
      }
      this.onSearch(keyword)
    },
    onClear () {
      this.searchList = null
    },
    changeHotSearch () {
      this.getHotSearch()
    },
    onHistoryClick (keyword) {
      this.$refs.searchBar.setValue(keyword)
      this.onSearch(keyword, true)
    },
    onHotSearchClick (keyword) {
      const index = this.hotSearch.indexOf(keyword)
      const fileName = this.hotSearchKey[index]
      this.$router.push({ path: '/pages/detail/main', query: { fileName } })
    },
    clearHistorySearch () {
      this.historySearch = []
      setStorageSync(HOT_SEARCH_KEY, this.historySearch)
    }
  },
  mounted () {
    this.historySearch = getStorageSync(HOT_SEARCH_KEY) || []
    console.log('mounted historySearch', this.historySearch)
    this.openId = getStorageSync(OPEN_ID_KEY) || ''
    this.page = 1
    this.searchList = null
    this.getHotSearch()
    this.$refs.searchBar.setValue('')
    this.searchFocus = true
  }
}
</script>

<style>

</style>