// pages/作业内容/作业内容.js
Page({

  /**
   * 页面的初始数据
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

  UserInput: function (e) {
    this.setData({
      Input: e.detail.value
    })
  },

  Upload: function () {
    var that = this
    const address = getApp().globalData.address
    const tkn = getApp().globalData.token
    console.log(this.data.Input)
    var courseid = getApp().globalData.currentCourse
    var d = new Date("December 28, 2018 11:59:59")
    wx.request({
      url: address + '/courses' + '/postAssignment',
      data: {
        assignment: { title: "assignment1", content: this.data.Input, dueTime: "28 Dec, 2018"},
        course: courseid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': tkn
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '作业内容'
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