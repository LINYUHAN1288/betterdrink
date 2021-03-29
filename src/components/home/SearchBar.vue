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
            :placeholder="hotSearch.length === 0 ? '拍照识别' : hotSearch"
            v-model="searchWord"
            @input="change"
            confirm-type="search"
          />
          <van-icon 
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
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
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
    onChange (e) {
      const { value } = e.mp.detail
      this.$emit('onChange', value)
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