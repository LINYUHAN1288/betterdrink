import { get, post } from '../utils/request'

const API_PREFIX = 'http://10.242.6.24:4000'
const APP_ID = 'wx37254b1a897c735a'
const APP_SECRET = '2bf0aa3cc75ca34125d0059e14b2ad50'

export function getHomeData (openId) {
  return get(`${API_PREFIX}/book/home/v2`, { openId })
}

export function getHomeSectionData (key) {
  return get(`${API_PREFIX}/book/home/${key}/v2`)
}

export function getOpenId (code) {
  return get(`${API_PREFIX}/openId/get`, {
    appId: APP_ID,
    secret: APP_SECRET,
    code
  })
}

export function category () {
  return get(`${API_PREFIX}/book/category/list/v2`)
}

export function recommend () {
  return get(`${API_PREFIX}/book/home/recommend/v2`)
}

export function freeRead () {
  return get(`${API_PREFIX}/book/home/freeRead/v2`)
}

export function hotBook () {
  return get(`${API_PREFIX}/book/home/hotBook/v2`)
}

export function getAlipayOpenId (code) {
  return get(`${API_PREFIX}/openId/get/alipay`, {})
}

export function register (openId, user) {
  return post(`${API_PREFIX}/user/register`, { openId, ...user, platform: mpvuePlatform })
}

export function getDetailData (openId, fileName) {
  return get(`${API_PREFIX}/book/detail`, { fileName, openId })
}

export function getHistory (openId) {
  return get(`${API_PREFIX}/history/get`, { openId })
}

export function getHistoryById (Id) {
  return get(`${API_PREFIX}/history/getdetail`, { Id })
}

export function saveHistory (history) {
  return post(`${API_PREFIX}/history/save`, { ...history })
}

export function getShelf (openId, fileName) {
  const params = {}
  openId && (params.openId = openId)
  fileName && (params.fileName = fileName)
  console.log(params)
  return get(`${API_PREFIX}/book/shelf/get`, params)
}

export function search (params) {
  if (params.keyword) {
    params.keyword = encodeURIComponent(params.keyword)
  }
  if (!params.pageSize) {
    params.pageSize = 20
  }
  if (!params.page) {
    params.page = 1
  }
  return get(`${API_PREFIX}/book/search`, params)
}

export function searchBook (params) {
  if (params.publisher) {
    params.publisher = encodeURIComponent(params.publisher)
  }
  if (params.author) {
    params.author = encodeURIComponent(params.author)
  }
  if (params.category) {
    params.category = encodeURIComponent(params.category)
  }
  if (!params.pageSize) {
    params.pageSize = 20
  }
  if (!params.page) {
    params.page = 1
  }
  return get(`${API_PREFIX}/book/search-list`, params)
}

export function hotSearch () {
  return get(`${API_PREFIX}/book/hot-search`)
}

export function saveShelf (shelf) {
  return get(`${API_PREFIX}/book/shelf/save`, { shelf: encodeURIComponent(JSON.stringify(shelf)) })
}

export function removeShelf (shelf) {
  return get(`${API_PREFIX}/book/shelf/remove`, { shelf: encodeURIComponent(JSON.stringify(shelf)) })
}
