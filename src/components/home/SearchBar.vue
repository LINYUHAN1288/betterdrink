<template>
  <div class="searchbar">
      <div class="wrapper" @click="onSearchBarClick()">
          <van-icon 
            class="search"
            name="search"
            size="16px"
            color="#858C96"
          />
          <input 
            class="searchInput"
            :focus="focus"
            :disabled="disabled"
            :maxlength="limit"
            :placeholder="hotSearch || '搜索'"
            v-model="searchWord"
            @input="onChange"
            @confirm="onConfirm"
            confirm-type="search"
          />
          <van-icon
            v-if="searchWord.length > 0"
            class="clear"
            name="clear"
            size="16px"
            color="#858C96"
            @click="onClearClick()"
          />
      </div>
  </div>
</template>

<script>
export default {
  props: {
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    hotSearch: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchWord: ''
    }
  },
  methods: {
    onSearchBarClick () {
      this.$emit('onClick')
    },
    onClearClick () {
      this.searchWord = ''
      this.$emit('onClear')
    },
    onChange (v) {
      let value = v.mp.detail.value
      if (value.length > this.limit) {
        value = value.slice(0, this.limit)
        this.searchWord = this.searchWord.slice(0, this.limit)
      }
      this.$emit('onChange', value)
    },
    onConfirm (v) {
      this.$emit('onConfirm', v.mp.detail.value)
    },
    setValue (v) {
      this.searchWord = v
    },
    getValue () {
      return this.searchWord
    }
  }

}
</script>

<style lang="less" scoped>
  .searchbar {
    padding: 10px 15px;
    height: 40px;
    .wrapper {
      display: flex;
      background: #F5F7F9;
      border-radius: 20px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 2px 15px;
      .search {
        display: flex;
        align-items: center;
        height: 100%; 
      }
      .searchInput {
        flex: 1;
        height: 100%;
        color: #333;
        font-size: 14px;
        margin-left: 5px;
        background: transparent;
      }
      .clear {
        display: flex;
        align-items: center;
        height: 100%; 
        &:active {
          opacity: .7;
        }
      }
    }
  }
</style>