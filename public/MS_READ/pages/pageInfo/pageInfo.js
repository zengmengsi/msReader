//index.js
//获取应用实例
var app = getApp()
var http = require('../../utils/request');

Page({
  data: {
    navbar: ["玄幻魔法", "武侠修真", "纯爱耽美", "都市言情", "职场校园", "穿越重生", "历史军事", "网游动漫", "恐怖灵异", "科幻小说", "美文名著"],
    pageInfo: '',
    isdead: true,
  },
  onLoad: function (options) {
    console.log(options);
    var th = this;

    var datas = { link: options.link };
    http.getData("/pageInfo", datas, function (data) {
      th.setData({ pageInfo: data, isdead:false });
      console.log(data)
    })
  },
  toChapter: function (event) {
    var link = event.currentTarget.dataset.link;
    console.log(link)
    var name = event.currentTarget.dataset.name;
    var author = event.currentTarget.dataset.author;
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/chapter/chapter?link=" + link
    })
  },
  toHome: function (event) {
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/index/index"
    })
  }
})
