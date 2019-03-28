// pages/coursenote/coursenote.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		namelist: [
			{
				str: 'ECE651',
				styleClass: 'classname'
			}
		],
		filelist: [
			{
				str: 'File 1',
				styleClass: 'filetitle'
			},
			{
				str: 'File 2',
				styleClass: 'filetitle'
			},
			{
				str: 'File 3',
				styleClass: 'filetitle'
			},
		]
	},

	File: function () {
		wx.navigateTo({
			url: '../../pages/coursenote-details/coursenote-details',
			success: function () {
				console.log("called switchetab");
			}
		});
	},
	Edit: function () {
		wx.navigateTo({
			url: '../../pages/coursenote-edit/coursenote-edit',
			success: function () {
				console.log("called switchetab");
			}
		});
	},

	Upload: function () {
		wx.navigateTo({
			url: '../../pages/coursenote-upload/coursenote-upload',
			success: function () {
				console.log("called switchetab");
			}
		});
	},

	onLoad: function (options) {
		var that = this
		wx.request({
			url: '',
			success: function (res) {
				var FileList = that.data.list;
				FileList.push(res.data.list);
				that.setData({
					filelist: FileList[0]
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */

	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		wx.setNavigationBarTitle({
			title: 'File List',
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