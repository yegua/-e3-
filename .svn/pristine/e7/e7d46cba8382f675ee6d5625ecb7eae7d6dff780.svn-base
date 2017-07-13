// pages/tongbi/tongbi.js
var Echarts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    tongbiYear: util.dateRangeByYear(util.formatTime(new Date(), 'date')),
    pickshow: true,
    iconshow: false,
    confirmshow: true,
    swiperCurrent: 0
  },
  //同比年份
  bindYearDate: function (e) {
    this.setData({
      tongbiYear: util.dateRangeByYear(e.detail.value)
    })
  },
  bindShow: function () {
    console.log(111);
    this.setData({
      pickshow: false,
      iconshow: true,
      confirmshow: false
    })
  },
  bindHide: function () {
    this.setData({
      pickshow: true,
      iconshow: false,
      confirmshow: true
    });
    this.requestData();
  },
  //前查
  bindBefore: function () {
    var _currentMonthDate = this.data.tongbiYear.split('-')[1] + '-01',
      _beforMonthDate = util.dateDiffMonth(_currentMonthDate, 1, 'before');
      this.setData({
        tongbiYear: util.dateRangeByYear(_beforMonthDate)
      })  
    this.requestData();
  },
  //后查
  bindAfter: function () {
    var _currentMonthDate = this.data.tongbiYear.split('-')[1] + '-01',
      _beforMonthDate = util.dateDiffMonth(_currentMonthDate, 1, 'after');
    this.setData({
      tongbiYear: util.dateRangeByYear(_beforMonthDate)
    })  
    this.requestData();
  },
  // swiperChange: function (e) {
  //   this.setData({
  //     swiperCurrent: e.detail.current
  //   })
  // },
  // clickCurrent: function (e) {
  //   var _index = e.target.dataset.index;
  //   this.setData({
  //     swiperCurrent: _index
  //   })
  // },
  requestData: function () {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        self.setData({
          windowWidth: res.windowWidth
        })
      }
    });

    util.requestData('contrast.tongbi',
      { date: this.data.tongbiYear.split('-')[1],
        dayMonth: '1'},
      wx.getStorageSync('sessionid'),
      function (res) {
        var dateList = [];
        var outData = [], importData = [], totalImport = 0, totalOut=0;
        res.forEach(function (item) {
          dateList.push(item.date);
          outData.push(item.purchase);
          importData.push(item.shipments);
          totalImport += Number(item.purchase);
          totalOut += Number(item.shipments);
        });
        self.setData({
          listData: res.reverse(),
          totalPur: totalImport,
          totalShip: totalOut
        });
        new Echarts({
          canvasId: 'echarts-canvas',
          type: 'column',
          categories: dateList,
          series: [{
            name: '出港',
            data: outData
          }, {
            name: '入港',
            data: importData
          }],
          yAxis: {
            format: function (val) {
              return val + '件';
            },
            min: 0
          },
          width: self.data.windowWidth,
          height: 300
        });
      })
  },
  onLoad: function () {
    var self = this;
    // this.setData({
    //   tongbiYear: util.dateDiffDay(self.data.enddate, 4, 'before')
    // });
    this.requestData();
  },
  onReady: function () {
    // 页面渲染完成



  }

});