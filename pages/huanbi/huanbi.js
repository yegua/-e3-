// pages/echart-line/echart-line.js
var Echarts=require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
var app = getApp()
Page({
    data:{
        startdate: '',
        enddate: util.formatTime(new Date(),'month'),
        pickshow: true,
        iconshow: false,
        confirmshow: true,
        swiperCurrent: 0           
    },
    //起始时间
    bindDateStart: function(e){
        this.setData({
            startdate: (e.detail.value).substring(0,7).replace(/-/g,'/'),
            enddate: util.dateDiffMonth((e.detail.value),4,'after')
        })
    },
    //结束时间
    bindDateEnd: function(e){
        this.setData({
            enddate: (e.detail.value).substring(0,7).replace(/-/g,'/'),
            startdate: util.dateDiffMonth((e.detail.value),4,'before')
        })
    },
    bindShow: function(){
        console.log(111);
        this.setData({
            pickshow: false ,
            iconshow: true,
            confirmshow: false 
        })
    },
    bindHide: function(){
        this.setData({ 
            pickshow: true ,        
            iconshow: false,
            confirmshow: true 
        });
        console.log(this.data.startdate);
        this.requestData();
    },
    //前查
    bindBefore: function(){
        var curStart = this.data.startdate,
            curEnd = this.data.enddate; 
        this.setData({
            startdate: util.dateDiffMonth(curStart,1,'before'),
            enddate: util.dateDiffMonth(curEnd,1,'before')
        });
        this.requestData();
    },
    //后查
    bindAfter: function(){
        var curStart = this.data.startdate,
            curEnd = this.data.enddate; 
        this.setData({
            startdate: util.dateDiffMonth(curStart,1,'after'),
            enddate: util.dateDiffMonth(curEnd,1,'after')
        });
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
    requestData: function(){
        var self=this;
        wx.getSystemInfo({
          success: function(res) {     
            console.log(res.windowWidth); 
            self.setData({
              windowWidth: res.windowWidth
            })      
          }
        });
        util.requestData('contrast.huanbi', 
          {startTime:this.data.startdate + '/01',
          endTime:this.data.enddate + '/01'},
          wx.getStorageSync('sessionid'),
          function(res){
            var _shipments = [], _purchase = [], dateList = [], totalImport=0, totalOut=0;
            res.forEach(function(item){
                _shipments.push(item.shipments);
                _purchase.push(item.purchase);
                dateList.push(item.date);
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
                type: 'line',
                categories: dateList,
                series: [{
                    name: '入港',
                    data: _shipments,
                    format: function (val) {
                        return (val/10000).toFixed(2) + '万';
                    }
                }, {
                    name: '出港',
                    data: _purchase,
                    format: function (val) {
                        return (val/10000).toFixed(2) + '万';
                    }
                }],
                yAxis: {
                    title: '货量 (万件)',
                    format: function (val) {
                        return (val/10000).toFixed(2);
                    },
                    min: 0
                },
                width: self.data.windowWidth,
                height: 300
            });
        })
    },
    onLoad:function(){
      var self=this;                     
      this.setData({
         startdate: util.dateDiffMonth(self.data.enddate,4,'before').replace('-','/')
       }); 
       console.log(typeof this.data.enddate);   
       this.requestData();  
    },
    onReady: function(){
       // 页面渲染完成
       
        this.requestData();
        
    }

});