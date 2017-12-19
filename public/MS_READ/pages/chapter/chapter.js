
var http = require('../../utils/request');
var chapterLink;
var name = "";
var author = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageArr: [],
    next: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var th = this;
    th.setData({ name: options.name, author: options.author });
    chapterLink = options.link;
    var datas = { link: options.link, page: 1 };
    http.getData("/chapter", datas, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ pageArr: datarr });
      console.log(datarr)
    })
  },
  toContent: function (event) {
    var link = event.currentTarget.dataset.link;
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/content/content?link=" + link + "&name=" + name + "&author=" + author
    })
  },
  toChapter: function (event) {
    var th = this;
    var datas = { link: chapterLink, page: event.currentTarget.dataset.next };
    http.getData("/chapter", datas, function (data) {
      var datarr = [];
      for (var i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ pageArr: datarr, next: event.currentTarget.dataset.next + 100 });
      console.log(datarr)
    })
  }
})