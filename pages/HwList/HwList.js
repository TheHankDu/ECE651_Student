// pages/HwList/HwList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AssignmentArray: [
      {
        str: 'Assignment 1: Due: 10/18/2018 9:59',
        styleClass: 'list_title'
      },
      {
        str: 'Assignment 2: Due: 12/25/2018 23:59',
        styleClass: 'list_title'
      },
      {
        str: 'Assignment 3: Due: 12/31/2018 23:59',
        styleClass: 'list_title'
      }
    ] 
  },

  Assignment: function () {
    wx.navigateTo({
      url: '../../pages/Homework/Homework',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/Course/Course',
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
      title: 'HwList',
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