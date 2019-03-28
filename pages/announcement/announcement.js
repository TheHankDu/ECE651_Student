// pages/作业提交/作业提交.js
Page({

  /**
   * Page initial data
   */
  data: {
    Home: "Return To Home",
    Input: "",
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/courselist/courselist',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  UserInput: function(e){
    this.setData({
      Input: e.detail.value 
    })
  },

  Upload: function(){
    var that = this
    const address = getApp().globalData.address
    const tkn = getApp().globalData.token
    console.log(this.data.Input)
    wx.request({
      url: address + '/courses' +'/addAnnouncement',
      data:{
        content: this.data.Input,
        course: "5bf4b8624a2739238b8e95f7"
      },
      method: "POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': tkn
      },
      success: function(res){
        console.log(res);
      },
      fail: function(res){

      },
      complete: function(res){

      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '声明'
    })
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