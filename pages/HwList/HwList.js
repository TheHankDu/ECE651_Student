// pages/HwList/HwList.js
Page({

  /**
   * 页面的初始数据
   * Hw + status
   */

  data: {
    course_id:'',
    AssignmentArray: [
      {
        str: 'A1',
        homework_id: '',
        status: 1,
        styleClass: 'list_title'
      },
      {
        str: 'A2',
        homework_id: '',
        status: 2,
        styleClass: 'list_title'
      },
      {
        str: 'A3',
        homework_id: '',
        status: 3,
        styleClass: 'list_title'
      }
    ],

      Status :[{
      SUBMITTED: 1,
      NOTSUBMITTED: 2,
      OVERDUE: 3,
        properties: {
          1: { name: "submitted", value: 1, code: "S" },
          2: { name: "notsubmitted", value: 2, code: "N" },
          3: { name: "overdue", value: 3, code: "o" }
        }
    }]
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
    var that = this
    const address = getApp().globalData.address
    const tkn = getApp().globalData.token

    //Get Homework
    wx.request({
      url: address + '/course/homework/get_all',
      method: "GET",
      //parameter: ""
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': tkn,
      },
      success: function (res) {
        //probably use for loop to set all item in array?
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

    //Get Status
    /*wx.request({
      url: address + '/course/homework/submission/get_self',
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
    })*/
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