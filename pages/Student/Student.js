// pages/Student/Student.js
Page({

  /**
   * Page initial data
   */
  data: {
    imgUrls:[
      '../images/poster/Study1.jpg',
      '../images/poster/Study2.jpg',
      '../images/poster/Study3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    array:[
      {
        "img":'../images/list/Course.jpg',
        "title":'CPE 490 Prof: Ahuja',
        "type":'Assignments/',
        "content":'Content: 2/',
        "Deadline":'Due: 2018/12/31'
      },
      {
        "img": '../images/list/Course.jpg',
        "title": 'EE 441 Prof: Yao',
        "type": 'Assignments/',
        "content": 'Content: 3/',
        "Deadline":'Due: 2018/12/30'
      }
    ]
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