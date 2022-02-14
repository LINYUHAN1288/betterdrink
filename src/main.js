import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  traceUser: true
})

const app = new Vue(App)
app.$mount()
