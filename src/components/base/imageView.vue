<template>
  <div class="image-view" @click="onClick">
    <img
      :class="round ? 'round image' : 'image'" 
      :style="{ height }"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading && !error"
    />
    <img
      :class="round ? 'round image' : 'image'"
      src="http://10.242.6.24/res/img/Biomedicine/80722c13708e6bd5092874e3dda743ef.jpg"
      :mode="mode"
      :lazy-load="lazyLoad"
      v-show="isLoading || error"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'widthFix'
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
    round: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      isLoading: true,
      error: false
    }
  },
  watch: {
    src (value, preValue) {
      if (value && value.length > 0 && value !== preValue) {
        this.$nextTick(() => {
          this.isLoading = true
        })
      }
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    },
    onError () {
      this.error = true
      this.isLoading = false
    },
    onLoad () {
      this.isLoading = false
      this.error = false
    }
  }
}
</script>

<style lang="less" scoped>
  .image-view {
    width: 100%;
    height: 100%;
    .round {
      border-radius: 50%;
    }
    .image {
      width: 100%;
    }
  }
</style>