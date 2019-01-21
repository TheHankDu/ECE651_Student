// pages/Course/Course.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classArray:[]
  },

  course(event) {
    //console.log(event.currentTarget.dataset.course._id);
    getApp().globalData.currentCourse = event.currentTarget.dataset.course._id;
    wx.switchTab({
      url: '../../pages/Module/Module',
      success: function () {
        console.log(event.currentTarget.dataset);
      }
    });
  }, 
  
  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'Course',
    })
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
        var cl = that.data.classArray;
        cl.push(res.data.data);
        that.setData({
          classArray: cl[0]
        });
        //console.log(cl);
        //console.log(that.data.classArray);
        console.log('---Successful---');
        //console.log(res);
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