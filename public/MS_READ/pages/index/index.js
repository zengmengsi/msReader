//index.js
//获取应用实例
var http = require('../../utils/request');
var app = getApp();
var search = "";

Page({
  data: {
    navbar: ["玄幻魔法", "武侠修真", "纯爱耽美", "都市言情", "职场校园", "穿越重生", "历史军事", "网游动漫", "恐怖灵异", "科幻小说", "美文名著"],
    search_data: "",
    inputContent: {},
    data0: [],
    data1: [],
    data2: [],
    data3: [],
    data4: [],
  },
  onLoad: function () {
    var th = this;
    http.getData("", { type: 1 }, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ data0: datarr });
    });
    http.getData("", { type: 2 }, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ data1: datarr });
    });
    http.getData("", { type: 3 }, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ data2: datarr });
    });
    http.getData("", { type: 4 }, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ data3: datarr });
    });
    http.getData("", { type: 5 }, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ data4: datarr });
    });
  },
  toArticle: function (event) {
    var type = event.currentTarget.dataset.type + 1;
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/article/article?type=" + type
    })
  },
  topageInfo: function (event) {
    var link = event.currentTarget.dataset.link;

    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/pageInfo/pageInfo?link=" + link
    })
  },
  toContent: function (event) {
    var clink = "" + event.currentTarget.dataset.clink;
    console.log(clink)
    clink = clink.split("/");
    var chapterLink = clink[0] + "/" + clink[1];
    var link = clink[2];
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/content/content?link=" + link + "&chapterLink=" + chapterLink
    })
  },
  userInput: function (e) {
    search = e.detail.value;
  },
  toHome: function (event) {
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/index/index"
    })
  },
  bindChange: function (e) {
    inputContent[e.currentTarget.id] = e.detail.value
  },
  toSearch: function (event) {
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/author/author?search=" + search
    })
  }
})
