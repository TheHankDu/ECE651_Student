// pages/作业信息/作业信息.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Add: "Add-Assignment",
    AssignmentArray: [
      {
        str: 'Assignment 1: 15-Submissions',
        styleClass: 'list_title'
      },
      {
        str: 'Assignment 2: 3-Submissions',
        styleClass: 'list_title'
      },
      {
        str: 'Assignment 3: 0-Submission',
        styleClass: 'list_title'
      }
    ],
    SubmissionArray:[
     { str:'15-submissions'},
     {str:"3-Submissions"},
     {str:"0-Submission"}
    ]
  },

  Add: function () {
    wx.navigateTo({
      url: '../../pages/content/content',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  View: function () {
    wx.navigateTo({
      url: '../../pages/submissions/submissions',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/courselist/courselist',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '作业信息'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})