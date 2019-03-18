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
  home: function() {
    wx.navigateTo({
      url: '../../pages/Course/Course',
      success: function() {
        console.log("From HwSubm to Course");
      }
    });
  },

  /*
   *回答文本
   */
  bindKeyInput(e) {
    this.setData({
      answer: e.detail.value
    })
  },

  /* 
   * 图片上传
   */
  loadImage: function() {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        that.setData({
          imageFiles: that.data.imageFiles.concat(res.tempFilePaths)
        });
      }
    })
  },

  tmpImageLoaded: function(res) {
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
  previewImage: function(e) {
    console.log(e.currentTarget)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imageFiles // 需要预览的图片http链接列表
    })
  },

  /*
   * Delete Image when long press 
   */
  delImage: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var tmp = that.data.imageFiles
    tmp.splice(index, 1)

    that.setData({
      imageFiles: tmp
    });
  },

  /*
   * Start recorderManager and recording
   */
  startRecord: function() {
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
  stopRecord: function() {
    this.recorderManager.stop()
    console.log('stop recording')
  },

  /*
   * Play selected recorded file
   */
  playRecord: function(item) {
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
  delRecord: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var tmp = that.data.recordFiles
    tmp.splice(index, 1)

    that.setData({
      recordFiles: tmp
    });
  },

  del: function(object) {
    //TODO: delete exist doc
  },

  /*
   * Submit Function
   */
  submit: function(object) {
    const address = 'https://dingziku.herokuapp.com'
    // const cloudAddress = '<BucketName>' + '.bj.bcebos.com' // TODO: Uploaded url
    var formatted_data = "" // Cannot parse empty string
    var filenames = {}
    // var policy = '{"expiration":"2018-05-01T12:00:00Z","conditions":[{"bucket":"你的bucket名称"},{"key":"文件保存在BOS中的文件名"}]}'
    // var base64Policy = base64.encode(policy)
    // var signature = CryptoJS.HmacSHA256("base64Policy", "百度云的SK").toString(CryptoJS.enc.Hex)

    for (var i = 0; i < this.data.recordFiles.length; i++) {
      var date = new Date();
      var file_name = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '-' + i + '.aac'
      filenames[file_name] = this.data.recordFiles[i].tempFilePath
      /*wx.uploadFile({
        url: cloudAddress,
        filePath: this.data.recordFiles[i].tempFilePaths,
        name: 'file',
        formData: {
          accessKey: '百度云提供的ak',
          policy: base64Policy,
          signature: signature,
          key: '文件保存在BOS中的文件名',
               // 注意：这个key必须与policy中的key保持一致，否则会报错
        },
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log(res)
        }
      })*/
      formatted_data += JSON.stringify({"type": "audio", "file_name": file_name}) + ','
    }

    if (this.data.answer != "") {
      formatted_data += JSON.stringify({"type": "text", "content": data.answer}) +','
    }

    for (var i = 0; i < this.data.imageFiles.length; i++) {
      var date = new Date();
      var file_name = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + '-' + i + '.' + this.data.imageFiles[i].split('.').pop()
      filenames[file_name] = this.data.imageFiles[i]
      /*wx.uploadFile({
        url: cloudAddress,
        filePath: this.data.imageFiles[i],
        name: 'file',
        formData: {
          accessKey: '百度云提供的ak',
          policy: base64Policy,
          signature: signature,
          key: '文件保存在BOS中的文件名',
               // 注意：这个key必须与policy中的key保持一致，否则会报错
          'Content-Type': 'image'
        },
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log(res)
        }
      })*/
      formatted_data += JSON.stringify({"type": "image","file_name": file_name})+','
    }
    formatted_data = formatted_data.slice(0,-1)

    var processed_data = {
      "course_id": this.data.course_id,
      "homework_id": this.data.homework_id,
      "content": formatted_data,
    }
    
    var submitted_data = Object.assign({},processed_data,filenames)
    console.log(submitted_data)
    /*
     * Request to upload all hw info to backend
     */
    // wx.request({
    //   data: submitted_data, 
    //   // {
    //   //   course_id: this.data.course_id, //TODO Bind with global data or somehow
    //   //   homework_id: this.data.homework_id, //TODO Bind with global data or somehow
    //   //   content: formatted_data,
    //   //   filename[i]: this.data.imageFiles[i]
    //   // },
    //   url: address + '/course/homework/submission/submit',
    //   method: "POST",
    //   header: {
    //     'content-type': 'multipart/form-data',
    //     'x-access-token': tkn,
    //   },
    //   success: function(res) {
    //     wx.showToast({
    //       title: '上传成功',
    //       icon: 'success',
    //       duration: 1500
    //     });
    //     console.log('---Submit Successfully---');
    //     console.log(res);
    //   },
    //   fail: function(res) {
    //     wx.showToast({
    //       title: '上传失败',
    //       icon: 'none',
    //       duration: 1500
    //     });
    //     console.log('---Fail---');
    //     console.log(res);
    //   },
    //   complete: function(res) {
    //     console.log('---Complete---');
    //   }
    // });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    /*this.setData({
      course_id: options.course_id,
      homework_id: options.homework_id 
    })*/
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

    this.recorderManager.onStop(function(res) {
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
      const {
        frameBuffer
      } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * page event handler function--Called when user drop down
   */
  onpulldownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})