// pages/wuliaokc/wuliaokc.js
var util = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:[],
    showtoast: true
  },
  requestData: function () {
    var self = this;
    util.requestData('material.inventory',{},wx.getStorageSync('sessionid'), function (res) {
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
          contentList={letter:'',data:[]},newsortData=[];
        for(var i=0;i<letters.length;i++){
            contentList = {letter: letters[i],data:[]};
            res.forEach(function(item){
                res['letter'] = util.pinyin.getCamelChars(item.name.substring(0, 1));
                if (res['letter']==letters[i]){
                    contentList.data.push(item);
                };               
            });
            if(contentList.data.length!= 0){
                newsortData.push(contentList);
            };
        }

        self.setData({
          contents: newsortData
        });
        console.log(newsortData);
    })
  },

  infoSearch: function(e){
    var self = this;
    var dataList = this.data.contents,
      keyValue = e.detail.value,
      temperData = null,
      curData = {},
      newSortData = [];
    console.log(dataList);
    if (keyValue.length === 0) {
      self.requestData();
    } else {
      dataList.forEach(function (item) {
        curData = { data: [], letter: '' },
          temperData = item.data;
        for (var i = 0; i < temperData.length; i++) {
          if (temperData[i].name.indexOf(keyValue) != -1) {
            curData.letter = item.letter;
            curData.data.push(temperData[i]);
          };
        };
        if (curData.data.length != 0) {
          newSortData.push(curData);
        };
        console.log(newSortData);
      });

      if (newSortData.length != 0) {
        self.setData({
          contents: newSortData
        });
      } else {
        self.setData({
          showtoast: false,
          toastMsg: '查无此记录'
        });
        setTimeout(function () {
          self.setData({
            showtoast: true,
          });
        }, 2000)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestData();
    console.log(util.pinyin.getCamelChars('五'));
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