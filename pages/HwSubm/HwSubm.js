// pages/HwSubm.js

Page({

  /**
   * page initial data
   */
  data: {
    course_id: '',
    homework_id: '',
    cloudLink: '',
    answer: '',
    recordFiles: [],
    imageFiles: []
  },

  /*
  * Home button function
  */
  home: function () {
    wx.navigateTo({
      url: '../../pages/Course/Course',
      success: function () {
        console.log("From HwSubm to Course");
      }
    });
  },

  /* 
  * 图片上传
  */
  loadImage: function () {
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

  tmpImageLoaded: function (res) {
    console.log(res);
    var width = 250;
    var height = 250 / res.detail.width * res.detail.height
    this.setdata({
      'flexImageSize.width': width + 'rpx',
      'flexImageSize.height': height + 'rpx'
    });
  },

  /*
  * View Image that are being selected
  */
  previewImage: function (e) {
    console.log(e.currentTarget)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imageFiles // 需要预览的图片http链接列表
    })
  },

  /*
  * Delete Image when long press 
  */
  delImage: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var tmp = that.data.imageFiles
    tmp.splice(index,1)

    that.setData({
      imageFiles: tmp
    });
  },

  /*
  * Start recorderManager and recording
  */
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

  /* 
  * Stop recorderManager and store recorded file
  */ 
  stopRecord: function(){
    this.recorderManager.stop()
    console.log('stop recording')
  },

  /*
  * Play selected recorded file
  */
  playRecord: function (item) {
    var src = item.currentTarget.id;
    console.log(src)
    if (!src) {
      wx.showToast({
        title: '请先录音！',
      })
      return;
    }
    this.innerAudioContext.src = src
    this.innerAudioContext.play() //To be diagnosed 
  },

/*
* Delete Recorded sound track when long press 
*/
  delRecord: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var tmp = that.data.recordFiles
    tmp.splice(index, 1)

    that.setData({
      recordFiles: tmp
    });
  },

  del: function(object){
    //TODO: delete exist doc
  },

  /*
  * Submit Function
  */
  submit: function(object){
    const address = 'https://dingziku.herokuapp.com'
    var formatted_data = JSON.parse('{}') // Cannot parse empty string
    if(this.data.cloudLink != "" ){
      formatted_data = JSON.parse('{"type": "text", "content": ' + data.cloudLink + '}')
    }
    for(var i = 0; i < this.data.recordFiles.length; i++){
      var date = new Date();
      file_name = date.getFullYear + '-' + date.getMonth() + '-' + date.getDay + '-' + i + '.aac'
      wx.uploadFile({
        url: '', // TODO: Uploaded url
        filePath: this.data.recordFiles[i].tempFilePaths,
        name: file_name,
      })
      formatted_data += JSON.parse('{"type": "audio", "file_name": ' + file_name + '}')
    }
    if (this.data.answer != "") {
      formatted_data += JSON.parse('{"type": "text", "content": ' + data.answer + '}')
    }
    for (var i = 0; i < this.data.imageFiles.length; i++) {
      var date = new Date();
      file_name = date.getFullYear + '-' + date.getMonth() + '-' + date.getDay + '-' + i + data.imageFiles[i].tempFilePaths.split('.').pop()
      wx.uploadFile({
        url: '', // TODO: Uploaded url
        filePath: this.data.imageFiles[i],
        name: file_name,
      })
      formatted_data += JSON.parse('{"type": "image", "file_name": ' + file_name + '}')
    }

    /*
    * Request to upload all hw info to backend
    */
    wx.request({
      data:{ 
        course_id: this.data.course_id, //TODO Bind with global data or somehow
        homework_id: this.data.homework_id, //TODO Bind with global data or somehow
        content: formatted_data
      },
      url: address + '/course/homework/submission/submit',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-access-token': tkn,
      },
      success: function (res) {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1500
        });
        console.log('---Submit Successfully---');
        console.log(res);
      },
      fail: function (res) {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
          duration: 1500
        });
        console.log('---Fail---');
        console.log(res);
      },
      complete: function (res) {
        console.log('---Complete---');
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      course_id: options.course_id,
      homework_id: options.homework_id 
    })
    wx.setNavigationBarTitle({
      title: '作业提交',
    })
    console.log('Load 作业提交')

    var that = this;

    this.recorderManager = wx.getRecorderManager()
    this.innerAudioContext = wx.createInnerAudioContext()

    this.innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    this.innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    this.recorderManager.onError((res) => {
      console.log('recorder error')
      console.log(res)
      wx.showToast({
        title: 'Error',
        icon: 'none',
        duration: 1000
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
        recordFiles: that.data.recordFiles.concat(res)
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


