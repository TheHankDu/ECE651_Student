// pages/HwSubm.js
Page({

  /**
   * page initial data
   */
  data: {
      cloudLink: "",
      answer: "",
      recordFiles: [],
      imageFiles: []
  },

  home: function () {
    wx.navigateTo({
      url: '../../pages/Course/Course',
      success: function () {
        console.log("From HwSubm to Course");
      }
    });
  },

  upload: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        that.setdata({
          imageFiles: that.data.imageFiles.concat(res.tempFilePaths)
        });
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imageFiles // 需要预览的图片http链接列表
    })
  },

  startRecord: function (){
    const options = {
      duration: 60000,
      sampleRate: 44100,
      audioSource: 'auto',
      numberOfChannels: 2,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    this.recorderManager.start(options)
    console.log('start recording')
  },

  stopRecord: function(){
    this.recorderManager.stop()
    console.log('stop recording')
  },

  playRecord: function () {
    var that = this;
    var src = this.data.src;
    if (src == '') {
      this.tip("请先录音！")
      return;
    }
    this.innerAudioContext.src = this.data.src;
    this.innerAudioContext.play()
  },

  tmpImageLoaded: function (res) {
    console.log(res);
    var width = 250;
    var height = 250 / res.detail.width * res.detail.height
    this.setdata({
      'flexImageSize.width': width + 'rpx',
      'flexImageSize.height': height + 'rpx'
    });
  },

  del: function(object){
    //TODO: delete exist doc
  },

  submit: function(object){
    //TODO: Upload every thing to Cloud
    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 1500
    });
    const address = 'https://dingziku.herokuapp.com'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '作业提交',
    })
    console.log('Load 作业提交')

    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(() => {
      console.log('recorder error')
      wx.showToast({
        title: 'Error',
        icon: 'none',
        duration: 60000
      })
    });

    this.recorderManager.onStart(() => {
      console.log('recorder start')
      wx.showToast({
        title: 'Recording',
        icon: 'loading',
        duration: 60000
      })
    });

    this.recorderManager.onPause(() => {
      console.log('recorder pause')
    });

    this.recorderManager.onStop(function (res) {
      console.log('recorder stop', res)
      that.setData({
        recordFiles: that.data.recordFiles.concat(res.tempFilePath)
        })
      wx.showToast({
        title: 'Record Finished',
        icon: 'success'
      })
    });

    this.recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    });
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
   * page event handler function--Called when user drop down
   */
  onpulldownRefresh: function () {

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

  }
})


