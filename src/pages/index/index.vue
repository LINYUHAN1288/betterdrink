<template>
  <div>
    <div class="home" v-if="prepare && authorized">
      <search-bar
        disabled
        @onClick="onSearchBarClick"
        :hotSearch="hotSearch && hotSearch.keyword"
      ></search-bar>
      <camera-button 
        img="https://i.loli.net/2021/03/28/2agZ3MhWtnoQjcA.jpg"
        title="强大的红酒识别功能"
        subTitle="立即体验"
      />
      <home-card
        :data="homeCardData"
        :num="shelfCount"
        :hasSign="hasSign"
        :signDay="continueSignDay"
        @onWineClick="gotoWineDetail"
      />
      <home-wine
        title="为你推荐"
        :data="recommend"
        :row="1"
        :col="3"
        linearBg
        btnText="换一换"
        @onWineClick="gotoWineDetail"
        @onMoreClick="() => onSuggestChange('recommend')"
      />
      <home-wine
        :data="hotBook"
        :row="1"
        :col="4"
        title="当前最热"
        btnText="换一换"
        linearBg
        @onWineClick="gotoWineDetail"
        @onMoreClick="() => onSuggestChange('hotBook')"
      />
      <home-wine
        :data="freeRead"
        :row="2"
        :col="2"
        title="红酒专栏"
        :mode="modeRow"
        btnText="查看更多"
        @onWineClick="gotoWineDetail"
        @onMoreClick="() => onSuggestChange('freeRead')"
      />
    </div>
    <div class="authorized" v-if="prepare && !authorized">
      <div class="auth-wrapper">
        <div class="auth-info-wrapper">
          <div class="auth-img">
            <image-view
              src="https://i.loli.net/2021/03/30/9LPBRbxySqu5NVn.jpg"
              height="100%"
              mode="scaleToFill"
              round
            ></image-view>
          </div>
          <div class="auth-text">登录BetterDrink</div>
          <div class="auth-strong-text">全球红酒鉴赏</div>
        </div>
        <button
          class="auth-btn"
          @click="getUserInfo"
          open-type="getUserInfo"
          plain="true"
        >
          授权登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar.vue'
import CameraButton from '../../components/home/CameraButton.vue'
import ImageView from '../../components/base/imageView.vue'
import HomeCard from '../../components/home/HomeCard.vue'
import HomeWine from '../../components/home/HomeWine.vue'
import Auth from '../../components/auth/auth.vue'
import { handleError } from '../../utils'
import { HOMEWINE_MODE } from '../../utils/const'
import {
  getHomeData,
  getHomeSectionData,
  // getHomeSectionData,
  register
  // hasSignToday,
  // sign
} from '../../api'
import {
  getUserOpenId as getOpenId,
  showLoading,
  getUserInfo,
  hideLoading,
  getSetting,
  setStorageSync,
  getStorageSync,
  showToast
} from '../../api/wechat'
export default {
  components: {
    SearchBar,
    CameraButton,
    ImageView,
    HomeCard,
    HomeWine,
    Auth
  },
  data () {
    return {
      wineList: [],
      userInfo: null,
      hotSearch: null,
      openId: null,
      authorized: true,
      loading: true,
      prepare: false,
      shelf: [],
      banner: [],
      recommend: [],
      freeRead: [],
      hotBook: [],
      category: [],
      shelfCount: 0
    }
  },
  computed: {
    homeCardData () {
      return {
        wineList: this.wineList,
        userInfo: this.userInfo
      }
    },
    modeRow () {
      return HOMEWINE_MODE.ROW
    },
    modeCategory () {
      return HOMEWINE_MODE.CATEGORY
    }
  },
  mounted () {
    this.init()
    this.hideTabBar()
  },
  methods: {
    hideTabBar () {
      mpvue.hideTabBar()
    },
    showTabBar () {
      mpvue.showTabBar()
    },
    gotoWineDetail (wine) {
      this.$router.push({path: '/pages/detail/main', query: { fileName: wine.fileName }})
    },
    onSearchBarClick () {
      this.$router.push('/pages/search/main')
    },
    async onSuggestChange (key) {
      const response = await getHomeSectionData(key)
      if (handleError(response)) {
        this[key] = response.data.data
      }
    },
    async getHomeData (openId, onComplete) {
      const vue = this
      const response = await getHomeData(openId)
      if (handleError(response)) {
        const data = response.data.data || {}
        const {
          banner,
          shelf,
          recommend,
          category,
          freeRead,
          hotBook,
          hotSearch,
          shelfCount
        } = data
        this.banner = banner
        this.wineList = shelf
        this.recommend = recommend
        this.category = category
        this.freeRead = freeRead
        this.hotBook = hotBook
        this.hotSearch = hotSearch
        this.shelfCount = shelfCount
        onComplete && onComplete()
        vue.$nextTick(() => {
          vue.loading = false
        })
      }
    },
    getUserInfo () {
      const vue = this
      const onOpenIdComplete = (vue, openId, userInfo) => {
        vue.openId = openId
        // 获取首页数据
        vue.getHomeData(openId, hideLoading)
        // 上报用户信息，注册账号
        register(openId, userInfo)
        // 判断用户今天是否签到过
        // vue.getSignState(openId)
      }
      console.log('getUserInfo...')
      getUserInfo(
        (userInfo) => {
          vue.authorized = true
          vue.prepare = true
          vue.userInfo = userInfo
          vue.showTabBar()
          setStorageSync('userInfo', userInfo)
          const openId = getStorageSync('openId')
          console.log('openId', openId)
          if (!openId || openId.length === 0) {
            getOpenId((openId) => {
              onOpenIdComplete(vue, openId, userInfo)
            })
          } else {
            onOpenIdComplete(vue, openId, userInfo)
          }
        },
        (err) => {
          console.log('getUserInfo failed', err)
        }
      )
    },
    getSetting () {
      this.prepare = false
      this.loading = true
      const vue = this
      // 判断当前小程序是否具备userInfo权限
      getSetting(
        'userinfo',
        (res) => {
          console.log('验证成功...', res)
          vue.authorized = true
          vue.prepare = true
          vue.getUserInfo()
        },
        (res) => {
          console.log('验证失败...', res)
          vue.authorized = false
          vue.prepare = true
          hideLoading()
        }
      )
    },
    handleGetUserInfo (res) {
      if (mpvuePlatform === 'wx') {
        const { mp: { detail: { errMsg } } } = res
        if (errMsg === 'getUserInfo:ok') {
          this.init()
          console.log(1)
        } else {
          console.log(errMsg)
          showToast('授权失败，请重试')
        }
      } else if (mpvuePlatform === 'my') {
        mpvue.getAuthCode({
          scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
          success: (res) => {
            console.log('auth_user', res)
            if (res.authCode) {
              this.init()
            } else {
              showToast('授权失败，请重试')
            }
          },
          fail: () => {
            showToast('授权失败，请重试')
          }
        })
      }
    },
    init () {
      showLoading({ title: '正在加载' })
      this.getSetting() // 判断是否已经具备获取用户信息权限
    }
  }
}
</script>

<style lang="less" scoped>
  .authorized {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #999999;

    .auth-wrapper {
      position: relative;
      width: 270px;
      height: 248px;
      background: #f5f5f5;
      border-radius: 18px;

      .auth-info-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 22.5px;

        .auth-img {
          width: 74px;
          height: 74px;
        }

        .auth-text {
          font-size: 13px;
          color: #999;
          margin-top: 18px;
        }

        .auth-strong-text {
          font-size: 16px;
          color: #333;
          margin-top: 3.5px;
          font-weight: 500;
        }
      }

      .auth-btn {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 49px;
        line-height: 49px;
        font-size: 15px;
        font-weight: 500;
        background-image: linear-gradient(270deg, #64515c 0%, #724a61 100%);
        color: #fff;
        border: none;
        border-radius: 0 0 18px 18px;
      }
    }
  }
</style>
