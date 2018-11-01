// pages/作业提交/作业提交.js
Page({

  /**
   * Page initial data
   */
  data: {
    Home: "Return To Home",
    array: [
      {
        "img": '../images/list/Upload.jpg',
        "title": 'CPE 490 Prof: Ahuja',
        "type": 'Assignments/',
        "content": 'Content: 2/',
        "Deadline": 'Due: 2018/12/31'
      },
      {
        "img": '../images/list/Upload.jpg',
        "title": 'EE 441 Prof: Yao',
        "type": 'Assignments/',
        "content": 'Content: 3/',
        "Deadline": 'Due: 2018/12/30'
      }
    ]
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/课程/课程',
      success: function () {
        console.log("called switchetab");
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