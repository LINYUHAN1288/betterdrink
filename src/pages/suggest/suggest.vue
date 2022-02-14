<template>
  <div>
    <div class="section">
      <form class="out" @submit="bindFormSubmit">
        <textarea class="content" placeholder="请输入" name="textarea"/>
        <button class="button" form-type="submit"> 提交 </button>
      </form>
    </div>
  </div>
</template>

<script>
import { showToast } from '../../utils'
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    bindFormSubmit () {
      showToast('提交成功')
    }
  }
}
</script>

<style lang="less" scoped>
  .out {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content {
      flex: 1;
      margin: 5px;
      padding: 10px;
      border-radius: 10px;
      border: 0.5px solid rgba(204, 201, 201, 0.959);
    }
    .button {
      margin: 20px;
    }
  }
</style>