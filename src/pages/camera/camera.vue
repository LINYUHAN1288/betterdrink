<template>
  <div class="camera-wrapper">
    <camera v-if="!src" class="mycamera" device-position="back" flash="off" binderror="error"></camera>
    <div class="button-wrapper">
      <van-button square color="#8f6e85" v-if="!src" size="large" class="chooseButton" @click="chooseImage" icon="photo"></van-button>    
      <van-button square color="#8f6e85" v-if="!src" size="large" class="cameraButton" @click="takePhoto" icon="photograph"></van-button>
    </div>
    <div class="footer" v-if="!src"></div>
    <image v-if="src" :src="src" class="img"></image>
    <div class="info-wrapper" v-if="src && result">
      <div class="wine-name" v-if="result.wineNameCn || result.wineNameEn">红酒名称: {{result.wineNameCn || result.wineNameEn}}</div>
      <div v-if="result.hasdetail === 1">
        <div class="wine-name">所属国家: {{result.countryCn}}</div>
        <div class="wine-name">红酒产区: {{result.regionCn}}</div>
        <div class="wine-name">所属酒庄: {{result.wineryCn}}</div>
        <div class="wine-name">糖分类型: {{result.classifyBySugar}}</div>
        <div class="wine-name">红酒类型: {{result.classifyByColor}}</div>
        <div class="wine-name">品尝温度: {{result.tasteTemperature}}</div>
        <div class="wine-name">酒品描述: {{result.description}}</div>
      </div>
      <div class="space" v-if="result && result.wineNameCn === '' && result.wineNameEn === ''">
        <image class="img" src="https://img01.yzcdn.cn/vant/empty-image-search.png"></image>
        暂时无法识别
      </div>
    </div>
    <div class="space" v-if="!result || result == 'undefined' || result.wineNameCn == 'undefined'">
      <image class="img" src="https://img01.yzcdn.cn/vant/empty-image-search.png"></image>
      网络开小差，请重试
    </div>
    <div class="button-wrapper1">
      <van-button square icon="search" class="moreButton" color="#8f6e85" v-if="src" size="large" @click="moreClick(name)">查看相似红酒价格</van-button>
    </div>
    <div class="footer1" v-if="src"></div>
  </div>
</template>

<script>
import { showLoading, hideLoading, getStorageSync } from '../../api/wechat'
import imageView from '../../components/base/imageView.vue'
import { showToast } from '../../utils'
import { saveHistory } from '@/api'
export default {
  components: { imageView },
  data () {
    return {
      device: true,
      src: '',
      ctx: {},
      result: {},
      name: '',
      url: '',
      token: '24.37521926d70e9ec47cb63d232d3926cb.2592000.1623033653.282335-23930879'
    }
  },
  onUnload () {
    this.src = ''
  },
  mounted () {
    this.ctx = wx.createCameraContext()
  },
  methods: {
    takePhoto () {
      this.ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.src = res.tempImagePath
          showLoading({ title: '识别中' })
          wx.cloud.uploadFile({
            cloudPath: 'test/' + Math.floor(Math.random() * 100000) + '.jpg',
            filePath: res.tempImagePath,
            success: (res) => {
              console.log('success', res)
              wx.cloud.getTempFileURL({
                fileList: [res.fileID],
                success: res => {
                  const params = {
                    url: res.fileList[0].tempFileURL
                  }
                  this.url = res.fileList[0].tempFileURL
                  wx.request({
                    method: 'POST',
                    url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/redwine?access_token=' + this.token,
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: params,
                    success: (res) => {
                      if (res.data.result) {
                        this.result = res.data.result
                        this.name = res.data.result.wineNameCn || res.data.result.wineNameEn || ''
                        this.historySave()
                        hideLoading()
                      } else {
                        hideLoading()
                        showToast('网络错误，请返回重试')
                      }
                    }
                  })
                }
              })
            },
            fail: (err) => {
              console.log(err)
            }
          })
        }
      })
    },
    chooseImage () {
      wx.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: (res) => {
          this.src = res.tempFilePaths[0]
          showLoading({ title: '识别中' })
          wx.cloud.uploadFile({
            cloudPath: 'test/' + Math.floor(Math.random() * 100000) + '.jpg',
            filePath: res.tempFilePaths[0],
            success: (res) => {
              console.log('success', res)
              wx.cloud.getTempFileURL({
                fileList: [res.fileID],
                success: res => {
                  const params = {
                    url: res.fileList[0].tempFileURL
                  }
                  this.url = res.fileList[0].tempFileURL
                  wx.request({
                    method: 'POST',
                    url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/redwine?access_token=' + this.token,
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: params,
                    success: (res) => {
                      if (res.data.result) {
                        this.result = res.data.result
                        this.name = res.data.result.wineNameCn || res.data.result.wineNameEn || ''
                        this.historySave()
                        hideLoading()
                      } else {
                        hideLoading()
                        showToast('网络错误，请返回重试')
                      }
                    },
                    fail: err => {
                      console.log(err)
                      hideLoading()
                      showToast('失败')
                    }
                  })
                },
                fail: err => {
                  console.log(err)
                  hideLoading()
                  showToast('失败')
                }
              })
            }
          })
        }
      })
    },
    moreClick (res) {
      this.$router.push({path: '/pages/price/main', query: {name: res}})
    },
    exitCamera () {
      this.src = ''
    },
    historySave () {
      const myopenId = getStorageSync('openId')
      const history = {
        openId: myopenId,
        region: this.result.regionCn,
        wineName: this.result.wineNameCn,
        temparature: this.result.tasteTemperature,
        country: this.result.countryCn,
        cover: this.url,
        winery: this.result.wineryCn,
        sugar: this.result.classifyBySugar,
        des: this.result.description,
        cate: this.result.classifyByColor
      }
      saveHistory(history).then(res => {
        if (res.data.error_code === 0) {
          console.log('保存成功')
        } else {
          console.log('保存失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.camera-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .mycamera {
    width: 100%;
    height: 92vh;
  }
  .button-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .cameraButton {
      flex: 1;
    }
    .chooseButton {
      flex: 1;
    }
  }
  .button-wrapper1 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .moreButton {
      flex: 1;
    }
  }
  .footer {
    margin-top: 0;
    width: 100%;
    height: 5px;
    background-color: #8f6e85;
  }
  .footer1 {
    margin-top: 0;
    width: 100%;
    height: 5px;
    background-color: #8f6e85;
  }
  .img {
    width: 100%;
    height: 45vh;
  }
  .info-wrapper {
    margin: 10px 20px;
    height: 44vh;
    .wine-name {
      font-size: 14px;
      color: #67686b;
      line-height: 2;
      overflow: hidden;
      font-weight: 500;
    }
    .space {
      font-size: 14px;
      color: #67686b;
      font-weight: 500;
      .img {
        width: 100%;
        height: 80px;
      }
    }
  }
}
</style>