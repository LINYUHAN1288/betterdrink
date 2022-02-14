<template>
    <div class="cameraButton">
        <div class="img" :style="{backgroundImage: 'url(' + img + ')'}">
            <div class="title">{{title}}</div>
            <div class="sub-title" @click="onButtonClick">{{subTitle}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
    img: String
  },
  methods: {
    onButtonClick () {
      this.$router.push('/pages/camera/main')
    }
  }
}
</script>

<style lang="less" scoped>
  .cameraButton {
    padding: 10px 15px;

    .img {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 125px;
      border-radius: 10px;
      background-size: 100% 100%;
      background-color: #808080;
      background-repeat: no-repeat;

      .title {
        font-size: 18px;
        color: #fff;
      }

      .sub-title {
        margin-top: 10px;
        font-size: 14px;
        color: #fff;
        border: 1px solid #ccc;
        background: #4585ff;
        border-radius: 50px;
        padding: 5px 15px;
      }
    }
  } 
</style>