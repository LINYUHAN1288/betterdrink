<template>
  <div class="search-list">
    <search-item
      :data="category.categoryText"
      label="Category"
      icon="apps-o"
      @onClick="showList({ category: category.categoryText })"
      v-if="category"
    />
    <search-item
      :data="author.author"
      label="Winery"
      icon="user-o"
      @onClick="showList({ author: author.author })"
      v-if="author"
    />
    <search-item
      :data="publisher.publisher"
      label="Region"
      icon="newspaper-o"
      @onClick="showList({ publisher: publisher.publisher })"
      v-if="publisher"
    />
    <search-table :data="book"/>
  </div>
</template>

<script>
import SearchItem from './searchItem.vue'
import SearchTable from './searchTable.vue'

export default {
  components: {
    SearchItem,
    SearchTable
  },
  props: {
    data: Object
  },
  computed: {
    category () {
      return this.data &&
        this.data.category &&
        this.data.category.length > 0 &&
        this.data.category[0]
    },
    author () {
      return this.data &&
        this.data.author &&
        this.data.author.length > 0 &&
        this.data.author[0]
    },
    book () {
      return this.data &&
        this.data.book &&
        this.data.book.length > 0 &&
        this.data.book
    },
    publisher () {
      return this.data &&
        this.data.publisher &&
        this.data.publisher.length > 0 &&
        this.data.publisher[0]
    }
  },
  methods: {
    showList (params) {
      const query = {}
      if (params.category) {
        query.category = params.category
      }
      if (params.author) {
        query.author = params.author
      }
      if (params.publisher) {
        query.publisher = params.publisher
      }
      this.$router.push({ path: '/pages/list/main', query })
    }
  }
}
</script>

<style lang="less" scoped>
  .search-list {
    padding: 15px 0;
  }
</style>