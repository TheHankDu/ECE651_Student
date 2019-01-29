// pages/HwSubm.js
Page({

  /**
   * Page initial data
   */
  data: {
      cloudLink: "",
      recordFiles: [],
      imageFiles: []
  },

  Home: function () {
    wx.navigateTo({
      url: '../../pages/Course/Course',
      success: function () {
        console.log("From HwSubm to Course");
      }
    });
  },

  Upload: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        that.setData({
          imageFiles: that.data.imageFiles.concat(res.tempFilePaths)
        });
      }
    })
  },

  PreviewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imageFiles // 需要预览的图片http链接列表
    })
  },

  StartRecord: function (){
    const options = {
      duration: 60000,
      sampleRate: 44100,
      audioSource: 'auto',
      numberOfChannels: 2,
      encodeBitRate: 192000,
      format: 'aac',
      frameSize: 50
    }
    recorderManager.start(options)
    
  },

  StopRecord: function(){
    recorderManager.stop()
  },

  tmpImageLoaded: function (res) {
    console.log(res);
    var width = 250;
    var height = 250 / res.detail.width * res.detail.height
    this.setData({
      'flexImageSize.width': width + 'rpx',
      'flexImageSize.height': height + 'rpx'
    });
  },

  Delete: function(object){
    //TODO: Delete exist doc
  },

  Submit: function(object){
    //TODO: Upload every thing to Cloud
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '作业提交',
    })
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

  }
})

const recorderManager = wx.getRecorderManager()

recorderManager.onStart(() => {
  console.log('recorder start')
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})
recorderManager.onStop((res) => {
  console.log('recorder stop', res)
  const { tempFilePath } = res
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})