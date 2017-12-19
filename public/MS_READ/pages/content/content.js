var http = require('../../utils/request');
var chapterLink = "";
var name = "";
var author = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentInfo : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var th = this;
    name = options.name;
    author = options.author;
    var datas = { link: options.link };
    var asLink = options.link.split('/')
    chapterLink = asLink[0] +'/'+ asLink[1];
    console.log(options.link);
    http.getData("/content", datas, function (data) {
      th.setData({ contentInfo: data });
      console.log(data)
    })
  },
  toArticle: function (event) {
    var type = event.currentTarget.dataset.type + 1;
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/article/article?type=" + type
    })
  },
  toHome: function (event) {
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/index/index"
    })
  },
  toChapter: function (event) {
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/chapter/chapter?link=" + chapterLink + "&name=" + name + "&author=" + author
    })
  },
  toContent: function (event) {
    var th = this;
    var datas = { link: event.currentTarget.dataset.link };
    http.getData("/content", datas, function (data) {
      th.setData({ contentInfo: data });
    })
  }
})