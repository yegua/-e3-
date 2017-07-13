Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var userDetail = JSON.parse(wx.getStorageSync('userDetail')).funclist;
    var curDetail = [];
    console.log(userDetail)
    userDetail.forEach(function(item,index){
        curDetail.push(item);
    });
    curDetail.forEach(function(item){
        item.imgurl = '../../' + item.imgurl; 
        item.url = item.url.split('.')[0];  
    });
    console.log(curDetail);
    this.setData({
      indexmenu: curDetail
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
 onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})