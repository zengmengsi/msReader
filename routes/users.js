const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    // 调用python获取 抓取数据对象
    var type = req.query.type;
    // exec('python /Users/wcx/Desktop/grab_index.py ' + type, function(error, stdout, stderr) {
    //     if (error) {
    //         console.error('error: ' + error);
    //         return;
    //     }
    //     var pageInfo = JSON.parse(stdout);
    //     // pageInfo = JSON.parse(pageInfo[0]);
    //     res.json(pageInfo);
    // });
    res.json(pageInfo);
});

module.exports = router;