// pages/query/queryDetail/queryDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  gotoLast: function(){
      var num = getCurrentPages();
      console.log(num);
      wx.navigateBack({
         delta: 1
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      this.setData({
        queryCode: options.code
      });
      wx.getStorage({
        key: 'queryData',
        success: function(res) {
            console.log(res);
            self.setData({
              queryDetail: JSON.parse(res.data)
            })
        },
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