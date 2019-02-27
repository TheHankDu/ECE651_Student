// pages/HwSubm.js
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
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
        that.setData({
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
    recorderManager.start(options)
    console.log('start recording')
  },

  stopRecord: function(){
    recorderManager.stop()
    console.log('stop recording')
  },

  playRecord: function (item) {
    console.log('start playing recorded sound track')
    var src = item.tempFilePath;
    console.log(item)
    if (src == '') {
      wx.showToast({
        title: '请先录音！',
      })
      return;
    }
    innerAudioContext.src = src;
    innerAudioContext.play()
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
    //Get selected record file path
    //Delete it in recordFiles
  },

  submit: function(object){
    const address = 'https://dingziku.herokuapp.com'
    var formatted_data = JSON.parse('')
    if(data.cloudLink != "" ){
      formatted_data += JSON.parse('{"type": "text", "content": ' + data.cloudLink + '}')
    }
    for(var i = 0; i < data.recordFiles.length; i++){
      var date = new Date();
      file_name = date.getFullYear + '-' + date.getMonth() + '-' + date.getDay + '-' + i + '.aac'
      wx.uploadFile({
        url: '', // TODO: Uploaded url
        filePath: data.recordFiles[i].tempFilePaths,
        name: file_name,
      })
      formatted_data += JSON.parse('{"type": "audio", "file_name": ' + file_name + '}')
    }
    if (data.answer != "") {
      formatted_data += JSON.parse('{"type": "text", "content": ' + data.answer + '}')
    }
    for (var i = 0; i < data.imageFiles.length; i++) {
      var date = new Date();
      file_name = date.getFullYear + '-' + date.getMonth() + '-' + date.getDay + '-' + i + '.jpg'
      wx.uploadFile({
        url: '', // TODO: Uploaded url
        filePath: data.imageFiles[i],
        name: file_name,
      })
      formatted_data += JSON.parse('{"type": "image", "file_name": ' + file_name + '}')
    }
    
    /*content: "[ // JSON格式的字符串；原本是数组，每个元素是一个提交的内容，之后会按照相同顺序返回
    {
      \"type\": \"text\",
      \"content\": \"1+1=2\"
    },
    {
      \"type\": \"audio\",
      \"file_name\": \"a.wav\"
    },
    {
      \"type\": \"text\",
      \"content\": \"e=mc2\"
    },
    {
      \"type\": \"video\",
      \"file_name\": \"a.mp4\"
    },
    {
      \"type\": \"image\",
      \"file_name\": \"a.jpg\"
    },
    {
      \"type\": \"image\",
      \"file_name\": \"b.jpg\"
    },
    ...
]"*/
    wx.request({
      data:{ 
        course_id: '', //TODO Bind with global data or somehow
        homework_id: '', //TODO Bind with global data or somehow
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
    wx.setNavigationBarTitle({
      title: '作业提交',
    })
    console.log('Load 作业提交')

    var that = this;

    recorderManager.onError((res) => {
      console.log('recorder error')
      console.log(res)
      wx.showToast({
        title: 'Error',
        icon: 'none',
        duration: 1000
      })
    });

    recorderManager.onStart(() => {
      console.log('recorder start')
      wx.showToast({
        title: 'Recording',
        icon: 'loading',
        duration: 60000
      })
    });

    recorderManager.onPause(() => {
      console.log('recorder pause')
    });

    recorderManager.onStop(function (res) {
      console.log('recorder stop', res)
      that.setData({
        recordFiles: that.data.recordFiles.concat(res)
        })
      wx.showToast({
        title: 'Record Finished',
        icon: 'success'
      })
    });

    recorderManager.onFrameRecorded((res) => {
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


