// pages/成绩列表/成绩列表.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GradeArray: [
      {
        str: 'Assignment 1: Grade',
        styleClass: 'list_title'
      },
      {
        str: 'Assignment 2: Grade',
        styleClass: 'list_title'
      }
    ]
  },

 
  Grade: function () {
    wx.navigateTo({
      url: '../../pages/成绩/成绩',
      success: function () {
        console.log("called switchetab");
      }
    });
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '成绩列表',
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