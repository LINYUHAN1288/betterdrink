<template>
  <div class="wrapper">
    <div class="cameraIndex" @click="onClick">
      <div class="img" :style="{backgroundImage: 'url(' + img + ')'}" @click="buttonClick">
          <van-icon name="photograph" color="white" size="5em"></van-icon>
      </div>
      <div class="sub-title">点击进入识别</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: 'https://i.loli.net/2021/03/28/2agZ3MhWtnoQjcA.jpg'
    }
  },
  methods: {
    buttonClick () {
      this.$router.push('/pages/camera/main')
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #eeeeee;
  width: 100%;
  height: 100vh;
  .cameraIndex { 
    width: 50%;
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
    }
  }
  .sub-title {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    font-size: 14px;
    color: #fff;
    border: 1px solid #ccc;
    background: #696b70;
    border-radius: 20px;
    padding: 5px 15px;
  }
}
</style>