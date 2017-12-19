//wx-drawer
let http = require('../../utils/request');
let chapterLink;
let next;
let chapterHua = true;
let conentHua = true;
let contentPageUp = 0;
let contentPageDown = 0;
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
let app = getApp()
Page({
  data: {
    pageArr: [],
    hidden: false,
    ui: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true
    }
  },
  onLoad(options) {
    try {
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
      this.data.ui.offsetLeft = 0;
      this.data.ui.windowWidth = res.windowWidth;
      this.setData({ ui: this.data.ui })
    } catch (e) { };
    let th = this;
    next = 1;
    contentPageUp = 0;
    contentPageDown = 0;
    chapterLink = options.link;
    let datas = { link: options.link, page: 1 };
    http.getData("/chapter", datas, function (data) {
      let datarr = [];
      for (let i = 0; i < data.length; i++) {
        datarr.push(JSON.parse(data[i]));
      }
      th.setData({ pageArr: datarr });
      let datas = { link: datarr[0].link };
      let asLink = datarr[0].link.split('/')
      chapterLink = asLink[0] + '/' + asLink[1];
      http.getData("/content", datas, function (data) {
        th.setData({ contentInfo: [data] });
        console.log(data)
      })
    })
  },
  addMessage: function () {
    if (chapterHua) {
      let th = this;
      next += 100;
      let datas = { link: chapterLink.split('/')[1], page: next };
      http.getData("/chapter", datas, function (data) {
        let datarr = [];
        for (let i = 0; i < data.length; i++) {
          datarr.push(JSON.parse(data[i]));
        }
        th.setData({ pageArr: th.data.pageArr.concat(datarr) });
        console.log(th.data.pageArr.length);
        wx.vibrateShort()
        if (datarr.length == 0) {
          chapterHua = false;
        }
      })
    }
  },
  plusConent: function () {
    if (conentHua) {
      let th = this;
      contentPageDown += 1;
      let datas = { link: th.data.pageArr[contentPageDown].link };
      http.getData("/content", datas, function (data) {
        th.setData({ contentInfo: th.data.contentInfo.concat([data]) });
        wx.vibrateShort()
      })
    }
  },
  lessConent: function () {
    contentPageUp -= 1;
    if (contentPageUp > 0) {
      let th = this;
      let datas = { link: th.data.pageArr[contentPageUp].link };
      http.getData("/content", datas, function (data) {
        th.data.contentInfo.unshift(data)
        th.setData({ contentInfo: th.data.contentInfo });
        wx.vibrateShort()
      })
    }
  },
  toContent: function (event) {
    if (conentHua) {
      let th = this;
      let index = event.currentTarget.dataset.link;
      contentPageUp = index;
      contentPageDown = index;
      let datas = { link: th.data.pageArr[index].link };
      http.getData("/content", datas, function (data) {
        th.setData({ contentInfo: [data] });
      })
    }
  },
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.data.ui.tStart = true;
    this.setData({ ui: this.data.ui })
  },
  handlerMove(e) {
    let { clientX } = e.touches[0];
    let { ui } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    ui.offsetLeft -= offsetX;
    if (ui.offsetLeft <= 0) {
      ui.offsetLeft = 0;
    } else if (ui.offsetLeft >= ui.menuWidth) {
      ui.offsetLeft = ui.menuWidth;
    }
    this.setData({ ui: ui })
  },
  handlerCancel(e) {
    // console.log(e);
  },
  handlerEnd(e) {
    this.data.ui.tStart = false;
    this.setData({ ui: this.data.ui })
    let { ui } = this.data;
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
      //向左
      if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
        ui.offsetLeft = 0;
      } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        if (ui.offsetLeft >= ui.menuWidth / 2) {
          ui.offsetLeft = ui.menuWidth;
        } else {
          ui.offsetLeft = 0;
        }
      }
    } else {
      if (ui.offsetLeft >= ui.menuWidth / 2) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        ui.offsetLeft = 0;
      }
    }
    this.setData({ ui: ui })
  },
  handlerPageTap(e) {
    let { ui } = this.data;
    if (ui.offsetLeft != 0) {
      ui.offsetLeft = 0;
      this.setData({ ui: ui })
    }
  },
  handlerAvatarTap(e) {
    let { ui } = this.data;
    if (ui.offsetLeft == 0) {
      ui.offsetLeft = ui.menuWidth;
      this.setData({ ui: ui })
    }
  }
})