<template>
  <div>
    <van-cell-group>
      <van-cell title="名字" value="yuhan" />
      <van-cell title="性别" value="男" />
      <van-cell title="地区" value="中国" />
      <van-cell title="手机号码" value=" " />
      <van-cell title="个性签名" value=" " />
    </van-cell-group>
    <div class="wrapper">
      <van-button class="button" type="info">修改个人资料</van-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>