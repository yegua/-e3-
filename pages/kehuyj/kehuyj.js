// pages/kehuyj/kehuyj.js
var Echarts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
var areaChart = null;
Page({
  data: {
    dayDate: '日查询（5天）',
    monthDate: '月查询（5月）',
    kehuName: '请选择客户',
    pickshow: true,
    iconshow: false,
    confirmshow: true,
    nameshow: true,
    customerCode: '',
    curDate: '',
    showtoast: true
    
  },
  //按天查询
  bindDateDay: function (e) {
    this.setData({
      dayDate: util.dateDiffDay((e.detail.value), 4, 'before') + '-' + (e.detail.value).replace(/-/g, '/'),
      monthDate: '月查询（5月）'
    })
  },
  //按月查询
  bindDateMonth: function (e) {
    this.setData({
      dayDate: '日查询（5天）',
      monthDate: util.dateRangeByMonth(e.detail.value)
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
    var curDate = this.data.dayDate,
      curMonth = this.data.monthDate;
      console.log(curMonth);
    if (curDate !=='日查询（5天）'){
      this.setData({
        dayDate: util.dateDiffDay(curDate.split('-')[0], 5, 'before') + '-' + util.dateDiffDay(curDate.split('-')[0],1,'before')    
      });
    }else{
      this.setData({
        monthDate: util.dateRangeByMonth(util.dateDiffMonth(curMonth.split('-')[0],1,'before'))
      });
    }
    this.requestData();
  },
  //后查
  bindAfter: function () {
    var curDate = this.data.dayDate,
      curMonth = this.data.monthDate;
    console.log(curMonth);
    if (curDate !== '日查询（5天）') {
      this.setData({
        dayDate: util.dateDiffDay(curDate.split('-')[1], 1, 'after') + '-' + util.dateDiffDay(curDate.split('-')[1], 5, 'after')
      });
    } else {
      this.setData({
        monthDate: util.dateRangeByMonth(util.dateDiffMonth(curMonth.split('-')[1], 1, 'after'),4,'after')
      });
    }
    this.requestData();
  },
  touchHandler: function (e) {
    console.log(areaChart.getCurrentDataIndex(e));
    areaChart.showToolTip(e);
  },  
  selectKehu: function () {
    wx.hideKeyboard();
    wx.navigateTo({
      url: '/pages/kehumd/kehumd'
    });
    this.setData({
      pickshow: true,
      iconshow: false,
      confirmshow: true
    });
  },
  requestData: function (code) {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        self.setData({
          windowWidth: res.windowWidth
        })
      }
    });
    var _timeObj = null,
      _type = '0';
    var _curDate = this.data.dayDate,
      _curMonth = this.data.monthDate;
    if (_curDate !== '日查询（5天）') {
        _timeObj = _curDate.split('-');
        this.setData({
          curDate: _curDate
        })       
    } else {
      _timeObj = _curMonth.split('-');
      this.setData({
        curDate: _curMonth
      });
       _type = '1';
    };
    util.requestData('performance.customer',{
      startTime: _type != '1' ? _timeObj[0] : _timeObj[0] + '-01',
      endTime: _type != '1' ? _timeObj[1] : util.endDayOfMonth(_timeObj[1]),
      customerCode: this.data.customerCode,
      dayMonth: _type
    }, wx.getStorageSync('sessionid'), function (res) {
      var datas = [],dates = [];
      res.forEach(function(item){
          datas.push(item.value);
          dates.push(item.date);
      });
      areaChart = new Echarts({
        canvasId: 'echarts-canvas',
        type: 'area',
        categories: dates,
        series: [{
          name: '货量',
          data: datas          
        }],
        yAxis: {
          title: '货量 (件)'
        },
        extra: {
          legendTextColor: '#cb2431'
        },
        width: self.data.windowWidth,
        height: 300
      });
    })
  },
  onLoad: function (option) {
    var self = this;
    self.setData({
      showtoast: false,
      toastMsg: '请先选择客户'
    });
    setTimeout(function () {
      self.setData({
        showtoast: true,
      });
    }, 2000)
    if (option.customerCode){
      this.setData({
        customerCode: option.customerCode,
        nameshow: false,
        kehuName: option.name,
        dayDate: util.dateDiffDay(util.formatTime(new Date(), 'date'), 4, 'before') + '-' + util.formatTime(new Date(), 'date'),
        curDate: util.dateDiffDay(util.formatTime(new Date(), 'date'), 4, 'before') + '-' + util.formatTime(new Date(), 'date')
      });
      
      this.requestData();
    };
  },
  onReady: function (option) {

  }

});