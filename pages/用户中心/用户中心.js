// pages/用户中心/用户中心.js
Page({

  /**
   * Page initial data
   */
  data: {
    Username: '',
    Password: '',
  },

  bindUsernameInput: function(e){
    this.setData({
      Username: e.detail.value
    })
  },

  bindPasswordInput: function (e) {
    this.setData({
      Password: e.detail.value
    })
  },

  login: function(e){
    wx.showToast({
      title: '登陆请求中',
      icon: 'loading',
      duration: 2000
    });
    //网络请求开始
    wx.request({
      url: '',
      header:{
        'Content-Type':'application/json'
      },
      success: function(res){
        wx.hideToast();
        if(res.data.LoginStatus == 1){
          //进行一些用户状态的存储
          //进行 tab 跳转
          wx.switchTab({
            url: '../../pages/Student/Student',
            success: function(){
            console.log("called switchetab"); 
            }
          });
        }
        else{
          wx.showModal({
            title: '登陆失败',
            content: '请检查您填写的用户信息',
            showCancel: false,
            success: function(res){
            //回调函数
            }
          });
        }
      }
    });
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})