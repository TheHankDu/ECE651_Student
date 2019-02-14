// pages/UserCenter/UserCenter.js
Page({

   data: {
  //   Username: '',
  //   Password: '',
  //   authcode: '',
  //  time: '获取验证码', //倒计时 
  //  currentTime: 60,//限制60s
  //  isClick: false,//获取验证码按钮，默认允许点击
   },

  bindUsernameInput: function(e){
    this.setData({
      email: e.detail.value
    })
  },

  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // authcodeInput: function (e) {
  //   // console.log("password==", event.detail.value)
  //   this.setData({ authcode: e.detail.value })
  // },
  

  login: function(e){
    wx.showToast({
      title: '登陆请求中',
      icon: 'loading',
      duration: 1500
    });
    const address = 'https://dingziku.herokuapp.com'
    getApp().globalData.address = address
    this.data.email = 'feng@gdao.com'
    this.data.password = 'gaofeng'
    wx.request({ //网络请求开始
      url: address +'/users'+'/getToken',
      data:{ 
        email: this.data.email,
        password: this.data.password
      },
      method: "POST",
      header:{
        'content-type':'application/x-www-form-urlencoded', 
      },
      success: function(res){
        console.log('---Successful---');
        console.log(res);
        wx.hideToast();
        if (res && res.data && res.data.token){ 
          var tkn = res.data.token
          getApp().globalData.token = tkn       
          wx.request({
            url: address +'/users'+'/getInfo',
            method: "GET",
            header:{
              'content-type': 'application/x-www-form-urlencoded',
              'x-access-token': tkn,
            },
            success: function(res){
              console.log('---Successful---');
              console.log(res);
              if (res.data.data.role == 0) { //role=0,登录成功,访问学生 
                wx.navigateTo({
                  url: '../Course/Course',
                })         
              }
              if (res.data.data.role != 0) { //role!=0,登录失败
                console.log('登录信息有误');
                wx.showModal({
                   title: '登陆失败',
                   content: '请检查您填写的用户信息',
                   showCancel: false,                 
                });
                // wx.navigateTo({
                //   url: '../Course列表/Course列表',
                // })    
              }
            },
            fail: function(res){
              console.log('---Fail---');
              console.log(res);
            },
            complete: function(res){
              console.log('---Complete---');
            }
          });
        }
        else{
          wx.showModal({
            title: '登陆失败',
            content: '请检查您填写的用户信息',
            showCancel: false,
            // success: function(res){
            // //回调函数
            // }
          });
        }
      },
      fail: function(res){
        console.log('---Fail---');
        console.log(res);
      },
      complete: function(res){
        console.log('---Complete---');
      }
    });
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

  },

  forgetpassword: function (e) {
    /*第一步：验证手机号码*/
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
    if (this.data.input.length == 0) {
      util.progressTips('手机号码不能为空')
      return;
    }

    if (that.data.Username.length < 11) {
      util.progressTips('手机号码长度有误！')
      return;
    }

    if (!myreg.test(that.data.Username)) {
      util.progressTips('错误的手机号码！')
      return;
    }
    /*第二步：设置计时器*/
    // 先禁止获取验证码按钮的点击
    that.setData({
      isClick: true,
    })
    // 60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;//减
      that.setData({
        time: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '获取验证码',
          currentTime: 60,
          isClick: false
        })
      }
    }, 1000);
    /*第三步：请求验证码接口，并记录服务器返回的验证码用于判断，这里服务器也可能不返回验证码，那验证码的判断交给后台*/
    // wx.request({})
  },

  /**
   * 登录
   */
  loginBtnClick: function () {
    let that = this;
    // 判断账户、密码、验证码
    // wx.request({})
  }
})
