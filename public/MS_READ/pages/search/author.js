let http = require('../../utils/request');
let search = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["玄幻魔法", "武侠修真", "纯爱耽美", "都市言情", "职场校园", "穿越重生", "历史军事", "网游动漫", "恐怖灵异", "科幻小说", "美文名著"],
    pageArr: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let th = this;
    let datas = { search: options.search };
    http.getData("/search", datas, function (data) {
      th.setData({ pageArr: data.data });
    })
  },
  toArticle: function (event) {
    let type = event.currentTarget.dataset.type + 1;
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
  userInput: function (e) {
    search = e.detail.value;
  },
  toSearch: function () {
    let th = this;
    let datas = { search: search };
    http.getData("/search", datas, function (data) {
      th.setData({ pageArr: data.data });
    })
  },
  topageInfo: function (event) {
    let link = event.currentTarget.dataset.link;
    wx.navigateTo({
      //接口调用成功的回调方法
      url: "../../pages/pageInfo/pageInfo?link=" + link
    })
  }
})