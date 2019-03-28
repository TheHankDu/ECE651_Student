// pages/Announcement/Announcement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AnnouncementArray: []
  },

  Announcement(event) {
    console.log(event.currentTarget.dataset);
    getApp().globalData.announcement = event.currentTarget.dataset.announce.content
    wx.navigateTo({
      url: '../../pages/AnnContent/AnnContent',
      success: function () {
        console.log(event.currentTarget.dataset.announce.content);
      }
    });
  },


  Home: function () {
    getApp().globalData.currentCourse = null
    wx.navigateTo({
      url: '../CrsList/CrsList',
      success: function () {
        //console.log("called switchetab");
      }
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    wx.setNavigationBarTitle({
      title: 'Announcement',
    })
    var that = this
    const address = getApp().globalData.address
    const tkn = getApp().globalData.token
    var courseid = getApp().globalData.currentCourse
    console.log(courseid)
    wx.request({
      url: address + '/courses' + '/getAnnouncement',
      data: {
        course: courseid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': tkn
      },
      success: function (res) {
        that.data.AnnouncementArray = [];
        var al = that.data.AnnouncementArray;
        al.push(res.data.data);
        console.log(res);
        that.setData({
          AnnouncementArray: al[0]
        })
        console.log(al);
        console.log(that.data.AnnouncementArray);
        console.log('---Successful---');
        console.log(res);
      },
      fail: function (res) {

      },
      complete: function (res) {

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
    // wx.setNavigationBarTitle({
    //   title: 'Announcement',
    // })
    var that = this
    const address = getApp().globalData.address
    const tkn = getApp().globalData.token
    var courseid = getApp().globalData.currentCourse
    console.log(courseid)
    wx.request({
      url: address + '/courses' + '/getAnnouncement',
      data: {
        course: courseid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': tkn
      },
      success: function (res) {
        that.setData({AnnouncementArray: res.data.data});
        // that.data.AnnouncementArray = [];
        // var al = that.data.AnnouncementArray;
        // al.push(res.data.data);
        // console.log(res);
        // that.setData({
        //   AnnouncementArray: al[0]
        // })
        // console.log(al);
        // console.log(that.data.AnnouncementArray);
        // console.log('---Successful---');
        // console.log(res);
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })

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