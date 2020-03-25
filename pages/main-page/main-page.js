const newsdata = require('../../libraries/newsdata.js');
const dealUrl = require('../../libraries/dealUrl.js');
const app = getApp();
Page({
    data: {
        swiper: {},
        news: [],
        newsPage: 1,
        newsTotalPage: 1,
        comments:[],
        commentsPage: 1,
        commentsTotalPage: 1,
        loading: true,
        hasMore: true,
        subtitle: '',
        scrollTop: 0,
        showGoTop: false,
    },
    
    showLoading() {
        wx.showNavigationBarLoading();
        this.setData({
            subtitle: '加载中...',
            loading: true,
        });
    },
    hideLoading() {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        this.setData({
            loading: false
        });
    },
    /**
     * [initLoad 初始化加载数据]
     * @return {[type]} [description]
     */
    initLoad() {
        this.showLoading();
        let userId = app.globalData.userInfo ? app.globalData.userInfo.wxOpenId : null
        newsdata.findNews(newsPage, userId)
                .then(data => {
                    console.log(data)
                    this.hideLoading();
                })
                .catch(e => {
                    console.error(e)
                    this.hideLoading();
                })
    },

    /**
     * [loadMore 加载更多数据]
     * @return {[type]} [description]
     */
    loadMore() { 
        // this.showLoading();
        /* let currentPage = this.data.news.currentPage;
        if (currentPage >= this.data.news.totalPage) {
            this.setData({
                hasMore: false,
            });
            return;
        } */
           
    },
    navToSpecial(event) {
      console.log(event)
        let str = dealUrl.getUrlTypeId(event);
        wx.navigateTo({
            url: '../special-page/special-page' + str ,
            success: (res) => {},
            fail: (err) => {
                console.log(err)
            }
        });
    },
    navToPicture(event) {
        let str = dealUrl.getUrlTypeId(event);
        wx.navigateTo({
            url: '../picture-page/picture-page' + str,
            success: (res) => {},
            fail: (err) => {
                console.log(err)
            }
        });
    },
    navToArticle(event) {
        let str = dealUrl.getUrlTypeId(event);
        //console.log(str)
        wx.navigateTo({
            url: '../article-page/article-page' + str,
            success: (res) => {},
            fail: (err) => {
                console.log(err)
            }
        });
    },
    toTop() {
        console.log(111)
    },
    bindSearch() {//输入框点击完成事件
        wx.showModal({
            title: '提示',
            content: `你输入的数据：是空的 ,但是没用，我没做这个功能。`,
            success: () => {},
            fail: () => {}
        });
    },
    scroll(event) {
        this.setData({
            showSearch: true,
        }); 
    },
    /**
     * [onLoad 载入页面时执行的生命周期初始函数]
     * @return {[type]} [description]
     */
    onLoad() {
        this.initLoad();
    },

    /**
     * [onPullDownRefresh 下拉刷新数据]
     * @return {[type]} [description]
     */
    onPullDownRefresh() {
        this.initLoad();
    },

    /**
     * [onReachBottom 上拉加载更多]
     * @return {[type]} [description]
     */
    onReachBottom() {
        this.loadMore();
    },

    //右上角分享功能
    onShareAppMessage: function (res) {
        var that = this;
        return {
            title: 'Sports News',
            //path: '/pa
            //右上角分享功能
            onShareAppMessage: function (res) {
                var that = this;
                return {
                    title: 'Sports News',
                    //path: '/pages/main-page/main-page?id=' + that.data.scratchId,
                    success: function (res) {
                        // 转发成功
                        wx.showToast({
                            title: '转发成功！',
                        })
                        that.shareClick();
                    },
                    fail: function (res) {
                        // 转发失败
                        wx.showToast({
                            icon: 'none',
                            title: '转发失败',
                        })
                    }
                }
            }
        }
    }

})