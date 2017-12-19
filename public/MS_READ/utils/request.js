function getResponse(url, data, callback) {
  wx.request({
    method: 'GET',
    url: "https://www.aisbi.com/api" + url,
    data: data,
    // header: headerObj,
    success: (res) => {
        typeof callback == "function" && callback(res.data, '');
    },
    fail: (err) => {
      typeof callback == "function" && callback(null, err.errMsg);
    }
  });
}

module.exports = {
  getData: getResponse
};