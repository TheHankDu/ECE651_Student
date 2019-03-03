// pages/Course列表/Course列表.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classArray: [
      { 
        str: '',
        styleClass: 'list_title'
      },
      {
        str: '',
        styleClass: 'list_title'
      },
      {
        str: '',
        styleClass: 'list_title'
      }
    ]
  },

  course: function () {
    wx.switchTab({
      url: '../../pages/Attendance/Attendance',
      success: function () {
        console.log("called switchetab");
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const address = getApp().globalData.address
    const tkn = getApp().globalData.token
    wx.request({
      url: address + '/users' + '/getCourse',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': tkn,
      },
      success: function (res) {
        that.setData({
          'classArray[0].str': res.data.data[0].prefix + res.data.data[0].number + '/section: ' + res.data.data[0].section
        });
        console.log('---Successful---');
        console.log(res);
      },
      fail: function (res) {
        console.log('---Fail---');
        console.log(res);
      },
      complete: function (res) {
        console.log('---Complete---');
      }
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