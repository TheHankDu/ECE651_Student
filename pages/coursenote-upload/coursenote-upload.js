Page({

  /**
   * Page initial data 
   */
	data: {
		Home: "Return Class List",
		Title: '',
		tmpImageUrl: [],
		flexImageSize: {
			width: 0,
			height: 0
		}
	},

	BindTitle: function (e) {
		this.setData({
			Title: e.detail.value
		})
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
					tmpImageUrl: res.tempFilePaths
				});
			},
		})
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
	Home: function () {
		wx.switchTab({
			url: '../../pages/coursenote/coursenote',
			// success: function () {
			// 	console.log("called switchetab");
		})
	},

	Submit: function () {
		const address = 'http://dingziku.herokuapp.com'
		getApp().globalData.address = address
		wx.request({
			url: address + '/course/slides/create',
			data: {
				course_id: "zxci238rxw", // 字符串，课程ID
				author: "ajiasjifaisd", // 字符串，上传者ID
				title: "课件1", // 字符串，课件名
				content: "课件1地址：http://xxxx.com" // 字符串，课件内容
			},
			method: "POST",
			header: {

			}
		})
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
		wx.setNavigationBarTitle({
			title: 'File Upload',
		})

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