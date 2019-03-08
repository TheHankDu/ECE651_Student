// pages/作业列表/作业列表.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AssignmentArray: [] 
  },

  Assignment: function () {
    wx.navigateTo({
      url: '../../pages/作业/作业',
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
    var that = this
    const address = getApp().globalData.address
    wx.request({
      url: address + '/course/homework/get_all',
      data: {
        course_id: getApp().globalData.currentCourse,
      },
      header: {
        //'content-type': 'application/x-www-form-urlencoded',
        'cookie': getApp().globalData.cookie
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        var ALT = [];
        var getHomeworkLength = res.data.homeworks.length;
        for (var i = 0; i < getHomeworkLength; i++) {
          if (res.data.homeworks[i].deadline.length > 10) {
            res.data.homeworks[i].deadline = res.data.homeworks[i].deadline.substring(0, 10);
          }
        }
        ALT.push(res.data.homeworks)
        that.setData({
          AssignmentArray: ALT[0]
        })
        console.log(that.data.AssignmentArray)

      }, 
    })
    wx.setNavigationBarTitle({
      title: '作业列表',
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