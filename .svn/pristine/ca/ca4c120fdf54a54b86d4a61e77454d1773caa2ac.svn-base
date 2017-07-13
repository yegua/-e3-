// pages/query/resultFail/resultFail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  gotoLast: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  goExpressWebsite: function(){
    var self = this;
    //不能跳转外链接
    wx.navigateTo({
      url: 'expressSite.html?name=' + encodeURIComponent(self.data.companyName) + '&address=' + encodeURIComponent(self.data.website)
      })
    //window.location.href = 'expressSite.html?name=' + encodeURIComponent(self.data.companyName) + '&address=' + encodeURIComponent(self.data.website);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.getStorage({
      key: 'dec_resultFailPage_company',
      success: function(res) {
          var companyInfo = JSON.parse(res.data);
          self.setData({
            companyName: companyInfo.name,
            code: companyInfo.code,
            phone: companyInfo.thumbnail,
            phoneToggle: companyInfo.thumbnail ? false : true,
            website: companyInfo.description,
            siteToggle: companyInfo.description ? false : true
          });
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