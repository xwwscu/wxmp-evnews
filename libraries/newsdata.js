const API_URL = 'http://www.dadiscoder.com/ev-news/';
const Promise = require('./bluebird')

function fetchData(url, page, wxUser) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
 
  })
}

module.exports = {
  findNews(page=1, wxUser='') {
    let url = `${API_URL}get-hot?page=${page}&token=${wxUser}`
    console.log(`findNews url: ${url}`)
    return fetchNews(url, page, wxUser).then(res => res.data)
  }, 
  findComments(page=1, wxUser='') {
    let url = `${API_URL}get-app-comment?page=${page}&token=${wxUser}`
    console.log(`findComments url: ${url}`)
    return fetchData('subject/' + id).then(res => res.data)
  }
}

