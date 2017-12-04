//article.js
//获取应用实例
var http = require('../../utils/request');
var sType = 0;
var sPage = 1;
Page({
  data: {
    navbar: ["玄幻魔法", "武侠修真", "纯爱耽美", "都市言情", "职场校园", "穿越重生", "历史军事", "网游动漫", "恐怖灵异", "科幻小说", "美文名著"],
    pageArr: [],
    toPage: 1
  },
  onLoad: function (options) {
    var th = this;
    sType = options.type;
    sType = options.type;
    var datas = { type: sType, num: sPage };
    http.getData("/article", datas, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ pageArr: datarr });
    })
  },
  topageInfo: function (event) {
    var link = event.currentTarget.dataset.link;

    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/pageInfo/pageInfo?link=" + link
    })
  },
  toArticle: function (event) {
    var type = event.currentTarget.dataset.type + 1;
    var th = this;
    sPage = 1;
    var datas = { type: type, num: sPage };
    http.getData("/article", datas, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      console.log(datarr);
      th.setData({ pageArr: datarr });
    })
  },
  toHome: function (event) {
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/index/index"
    })
  },
  toPages: function (event) {
    var th = this;
    console.log(event.currentTarget.dataset.newpage)
    if (event.currentTarget.dataset.newpage != 0){
      var datas = { type: sType, num: event.currentTarget.dataset.newpage };
      http.getData("/article", datas, function (data) {
        var datarr = [];
        for (var i = 0; i < data.length; i++) {
          datarr.push(JSON.parse(data[i]));
        }
        th.setData({ pageArr: datarr, toPage: event.currentTarget.dataset.newpage });
      })
    }
  }
})
