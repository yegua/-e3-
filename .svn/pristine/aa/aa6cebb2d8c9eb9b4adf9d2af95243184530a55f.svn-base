// pages/yingyee/yingyee.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    startdate: util.formatTime(new Date(), 'date'),
    enddate: util.formatTime(new Date(), 'date'),
    pickshow: true,
    iconshow: false,
    confirmshow: true,
    dataProfit:'',
    dataContent: [],
    dataIncome: '',
    dataOutcome: '',
    showtoast: true,
    dataDate: util.formatTime(new Date(), 'date')

  },
  //起始时间
  bindDateStart: function (e) {
    this.setData({
      startdate: (e.detail.value).replace(/-/g, '/')      
    })
  },
  //结束时间
  bindDateEnd: function (e) {
    this.setData({
      enddate: (e.detail.value).replace(/-/g, '/')    
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
      startdate: util.dateDiffDay(curStart, 1, 'before'),
      enddate: util.dateDiffDay(curStart, 1, 'before')
    });
    this.requestData();
  },
  //后查
  bindAfter: function () {
    var curStart = this.data.startdate,
      curEnd = this.data.enddate;
    this.setData({
      startdate: util.dateDiffDay(curEnd, 1, 'after'),
      enddate: util.dateDiffDay(curEnd, 1, 'after')
    });
    this.requestData();
  },
  requestData: function () {
    var self = this;
    util.requestData('statistics.turnover',{startTime: this.data.startdate, endTime: this.data.enddate},
      wx.getStorageSync('sessionid'),
      function (res) {       
        console.log(res);       
        if (self.data.startdate === self.data.enddate){
          self.setData({
              dataDate: self.data.startdate
          })
        } else if (!util.compareWithDate(self.data.enddate, self.data.startdate)){
            self.setData({
              showtoast: false,
              toastMsg: '起始日期不能大于结束日期'
            });
            setTimeout(function () {
              self.setData({
                showtoast: true,
              });
            }, 2000);
            return false;	
        }else{
            self.setData({
                dataDate: self.data.startdate + '-' + self.data.enddate
            });
        };

        self.renderChart(res);
      })
  },
  renderChart: function(result) {
	    		
      var _resultData = result[0],
      _costFeeNum = parseFloat(_resultData['costFee']),
      _scanningFeeNum = parseFloat(_resultData['scanningFee']),
      _manageFeeNum = parseFloat(_resultData['manageFee']),
      _weighFeeNum = parseFloat(_resultData['weighFee']),
      _materialScienceFee = parseFloat(_resultData['materialScienceFee']),
      _cashNum = parseFloat(_resultData['cash']),
      _monthlyNum = parseFloat(_resultData['monthly']),
      _toPayNum = parseFloat(_resultData['toPay']),
      _transitNum = parseFloat(_resultData['transit']),
      //根据数据计算
      _outcomeNum = ((_costFeeNum + _scanningFeeNum + _manageFeeNum + _weighFeeNum + _materialScienceFee) / 10000).toFixed(2),
      _incomeNum = ((_cashNum + _monthlyNum + _toPayNum + _transitNum) / 10000).toFixed(2),
      _profitNum = (_incomeNum - _outcomeNum).toFixed(2),
      _labelArr =['cash', 'costFee', 'monthly', 'scanningFee', 'toPay', 'manageFee', 'transit', 'weighFee', 'none', 'materialScienceFee'],
      _labelObj = {
        'cash': '现金',
        'monthly': '月结',
        'toPay': '到付',
        'transit': '中付',
        'none': '',
        'costFee': '成本费',
        'scanningFee': '扫描费',
        'manageFee': '管理费',
        'weighFee': '称重',
        'materialScienceFee': '材料费'
      };
      var _resArr = [],
      _curName= '',
      _itemObj = {};
      for( var i = 0; i<_labelArr.length; i++ ) {
          _curName = _labelArr[i];
          _itemObj = {
            name: _labelObj[_curName],
            value: _resultData[_curName] ? _resultData[_curName].toFixed(2) : '-'
          };

          _resArr.push(_itemObj);
      };
      console.log(_resultData['costFee']);
      this.setData({
          dataProfit: _profitNum,
          dataIncome: _incomeNum,
          dataOutcome: _outcomeNum,
          dataContent: _resArr
      })    
				
	},
  onLoad: function () {   
    this.requestData();
  },
  onReady: function () {
    // 页面渲染完成



  }

});