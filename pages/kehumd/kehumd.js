// pages/kehumd/kehumd.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    letterArr: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    scrollTop: 0,
    isShowLetter: false,
    showLetter: "",
    searchLetter: [],
    tHeight: 0,
    bHeight: 0,
    startPageY: 0,
    showtoast: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.requestData();
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          // console.dir(res);
          var windowWidth = res.windowWidth;
          var windowHeight = res.windowHeight;
          that.setData({
            scrollHeight: windowHeight
          })
        }
      });
      var searchLetter = this.data.letterArr;
      //添加要匹配的字母范围值
      //1、更加屏幕高度设置子元素的高度
      var itemH = this.data.scrollHeight / searchLetter.length;
      var tempObj = [];
      for (var i = 0; i < searchLetter.length; i++) {
        var temp = {};
        temp.name = searchLetter[i];
        temp.tHeight = i * itemH;
        temp.bHeight = (i + 1) * itemH;
        tempObj.push(temp)
      };
      this.setData({      
        itemH: itemH,
        searchLetter: tempObj        
      });
      console.log(this.data.searchLetter);
  },
  
  wxSortPickerViewScroll: function (e) {
    console.log(e.detail.scrollTop);
  },
  searchStart: function(e) {
    var showLetter = e.currentTarget.dataset.tag;
    var pageY = e.touches[0].pageY;
    this.setScrollTop(this, showLetter);
    this.nowLetter(pageY, this);
    this.setData({
      showLetter: showLetter,
      startPageY: pageY,
      isShowLetter: true,
    });
    console.log(pageY);
    
  },
  searchMove: function (e) {
    var pageY = e.touches[0].pageY;
    var startPageY = this.data.startPageY;
    var tHeight = this.data.tHeight;
    var bHeight = this.data.bHeight;
    var showLetter = 0;
    console.log(pageY);
    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    } else {//向下移动
      if (pageY > bHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    }
  },
  searchEnd: function (e) {
    // console.log(e);
    // var showLetter=e.currentTarget.dataset.letter;
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 500)

  },
  nowLetter: function (pageY, that) {//当前选中的信息
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter = "";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight;
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

    this.setScrollTop(that, showLetter);

    that.setData({
      bHeight: bHeight,
      tHeight: tHeight,
      showLetter: showLetter,
      startPageY: pageY
    })
  },
  setScrollTop: function (that, showLetter) {
    var scrollTop = 0;
    var customers = that.data.contents;
    var cusCount = 0;
    var letterCount = 0;
    for (var i = 0; i < customers.length; i++) {
      if (showLetter == customers[i].letter) {
        scrollTop = letterCount * 30 + cusCount * 41-50;
        break;
      } else {
        letterCount++;
        cusCount += customers[i].data.length;
      }
    }

    that.setData({
      scrollTop: scrollTop
    })
  },
  //点击选择客户信息
  selectCustomer: function (e) {
    console.log(e.currentTarget.dataset)
    wx.redirectTo({
      url: '/pages/kehuyj/kehuyj?customerCode=' + e.currentTarget.dataset.code + '&name=' + e.currentTarget.dataset.name
    });
  },
  // 获取数据
  requestData: function () {
    var self = this;
    var _sitecode = JSON.parse(wx.getStorageSync('userDetail')).sitecode;
    util.requestData('download.customer', { siteCode: _sitecode}, wx.getStorageSync('sessionid'), function (res) {
      console.log(res);
     var letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
       contentList = { letter: '', data: [] }, newsortData = [],reg = /^\w$/i;
      for (var i = 0; i < letters.length; i++) {
        contentList = { letter: letters[i], data: [] };
        res.forEach(function (item) {
          if (reg.test(item.name.substring(0, 1))) {
            res['letter'] = '#';
          }else{
            res['letter'] = util.pinyin.getCamelChars(item.name.substring(0, 1));
          };
          if (res['letter'] == letters[i]) {
            contentList.data.push(item);
          };
        });
        if (contentList.data.length != 0) {
          newsortData.push(contentList);
        };
        // console.log(newsortData);
      }

      self.setData({
        contents: newsortData      
      });
    })
  },
  searchInput: function(e){
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
          if (curData.data.length!=0){
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.selectCustomer);
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