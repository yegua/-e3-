// pages/paisongsx/paisongsx.js
var Echarts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    startdate: '',
    enddate: util.formatTime(new Date(), 'date'),
    pickshow: true,
    iconshow: false,
    confirmshow: true
  },
  //起始时间
  bindDateStart: function (e) {
    this.setData({
      startdate: (e.detail.value).replace(/-/g, '/'),
      enddate: util.dateDiffDay((e.detail.value), 4, 'after')
    })
  },
  //结束时间
  bindDateEnd: function (e) {
    this.setData({
      enddate: (e.detail.value).replace(/-/g, '/'),
      startdate: util.dateDiffDay((e.detail.value), 4, 'before')
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
    console.log(this.data.startdate);
    this.requestData();
  },
  //前查
  bindBefore: function () {
    var curStart = this.data.startdate,
      curEnd = this.data.enddate;
    this.setData({
      startdate: util.dateDiffDay(curStart, 5, 'before'),
      enddate: util.dateDiffDay(curEnd, 5, 'before')
    });
    this.requestData();
  },
  //后查
  bindAfter: function () {
    var curStart = this.data.startdate,
      curEnd = this.data.enddate;
    this.setData({
      startdate: util.dateDiffDay(curStart, 5, 'after'),
      enddate: util.dateDiffDay(curEnd, 5, 'after')
    });
    this.requestData();
  },
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

    util.requestData('delivery.prescription',
      { startTime: this.data.startdate, endTime: this.data.enddate, dayMonth: '0' },
      wx.getStorageSync('sessionid'),
      function (res) {
        var dateList = [];
        var data1=[], data2=[], data3=[];
        console.log(res);
        res.forEach(function (item) {
          dateList.push(item.date);
          data1.push(parseInt(item.data1Ratio));
          data2.push(parseInt(item.data2Ratio));
          data3.push(parseInt(item.data3Ratio));
        });
        
        new Echarts({
          canvasId: 'echarts-canvas',
          type: 'column',
          categories: dateList,
          series: [{
            name: '一派',
            data: data1
          },{
              name: '二派',
              data: data2
          },{
            name: '三派',
            data: data3
          }],
          yAxis: {
            min: 0
          },
          width: self.data.windowWidth,
          height: 300
        });
       })
  },
  onLoad: function () {
    var self = this;
    this.setData({
      startdate: util.dateDiffDay(self.data.enddate, 4, 'before')
    });
    console.log(typeof this.data.enddate);
    this.requestData();
  },
  onReady: function () {
    // 页面渲染完成



  }

});