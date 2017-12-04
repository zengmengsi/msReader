
var http = require('../../utils/request');
var chapterLink;
var name = "";
var author = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["玄幻魔法", "武侠修真", "纯爱耽美", "都市言情", "职场校园", "穿越重生", "历史军事", "网游动漫", "恐怖灵异", "科幻小说", "美文名著"],
    name: "",
    author: "",
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
    name = options.name;
    author = options.author;
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