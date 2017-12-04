const express = require('express');
const router = express.Router();

const iconv = require('iconv-lite');

const exec = require('child_process').exec;
const http = require('http');
const cheerio = require('cheerio');
const request = require('request');

const charset = require("superagent-charset");
const agent = require("superagent");

charset(agent);

let pad = function(number, length, pos) {
    var str = "%" + number;
    while (str.length < length) {
        //向右边补0
        if ("r" == pos) {
            str = str + "0";
        } else {
            str = "0" + str;
        }
    }
    return str;
}
let toHex = function(chr, padLen) {
    if (null == padLen) {
        padLen = 2;
    }
    return pad(chr.toString(16), padLen);
}

function chinese2Gb2312(data) {
    var gb2312 = iconv.encode(data.toString('UCS2'), 'GB2312');
    var gb2312Hex = "";
    for (var i = 0; i < gb2312.length; ++i) {
        gb2312Hex += toHex(gb2312[i]);
    }
    return gb2312Hex.toUpperCase();
}
var homePage = ["", "", "", "", ""];
getHomeMsg();

function getHomeMsg() {
    doThis();
    setInterval(function() {
        doThis();
    }, 1000 * 60 * 30)
}

function doThis() {

    exec('python /root/msReader/python/grab_index.py ' + 1, function(error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        homePage[0] = JSON.parse(stdout);
        exec('python /root/msReader/python/grab_index.py ' + 2, function(error, stdout, stderr) {
            if (error) {
                console.error('error: ' + error);
                return;
            }
            homePage[1] = JSON.parse(stdout);
            exec('python /root/msReader/python/grab_index.py ' + 3, function(error, stdout, stderr) {
                if (error) {
                    console.error('error: ' + error);
                    return;
                }
                homePage[2] = JSON.parse(stdout);
                exec('python /root/msReader/python/grab_index.py ' + 4, function(error, stdout, stderr) {
                    if (error) {
                        console.error('error: ' + error);
                        return;
                    }
                    homePage[3] = JSON.parse(stdout);

                    exec('python /root/msReader/python/grab_index.py ' + 5, function(error, stdout, stderr) {
                        if (error) {
                            console.error('error: ' + error);
                            return;
                        }
                        homePage[4] = JSON.parse(stdout);
                    });
                });
            });
        });
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {

    // 调用python获取 抓取数据对象
    var type = req.query.type;
    res.json(homePage[type - 1]);

});

/* GET home page. */
router.get('/article', function(req, res, next) {

    var type = req.query.type;
    var num = req.query.num;
    // 调用python获取 抓取数据对象
    exec('python /root/msReader/python/grab_article.py ' + type + ' ' + num, function(error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        var pageInfo = JSON.parse(stdout);
        // pageInfo = JSON.parse(pageInfo[0]);
        res.json(pageInfo);
    });

});

/* GET home page. */
router.get('/pageInfo', function(req, res, next) {

    var link = req.query.link;
    // 调用python获取 抓取数据对象
    exec('python /root/msReader/python/grab_pageInfo.py ' + link, function(error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        var pageInfo = JSON.parse(stdout);
        // pageInfo = JSON.parse(pageInfo[0]);
        res.json(pageInfo);
    });

});

/* GET home page. */
router.get('/chapter', function(req, res, next) {

    var link = req.query.link;
    var page = req.query.page;
    // 调用python获取 抓取数据对象
    exec('python /root/msReader/python/grab_chapter.py ' + link + ' ' + page, function(error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        var pageInfo = JSON.parse(stdout);
        // pageInfo = JSON.parse(pageInfo[0]);
        res.json(pageInfo);
    });

});

/* GET home page. */
router.get('/content', function(req, res, next) {

    var link = req.query.link;
    // 调用python获取 抓取数据对象
    link = decodeURI(link);
    exec('python /root/msReader/python/grab_content.py ' + link, function(error, stdout, stderr) {
        if (error) {
            console.error('error: ' + error);
            return;
        }
        var pageInfo = JSON.parse(stdout);
        // pageInfo = JSON.parse(pageInfo[0]);
        res.json(pageInfo);
    });

});

/* GET home page. */
router.get('/search', function(req, res, next) {

    var search = decodeURI(req.query.search);
    var html = ''; //用来存储请求网页的整个html内容
    var returnData = {
            type: 0,
            data: []
        }
        // 调用python获取 抓取数据对象
    agent.get("http://m.quanshuwang.com/modules/article/search.php?searchkey=" + chinese2Gb2312(search) + "&type=").charset('gbk').end((err, response) => {
        var html = response.text;
        var $ = cheerio.load(html); // 采用cheerio模块解析html

        $('.book_list li a').each(function() {
            returnData.data.push({
                link: $(this).attr('href').replace('/book_', '').replace('.html', ''),
                img: $(this).children("img").attr('src'),
                name: $(this).children("p").eq(0).text(),
                type: $(this).children("p").eq(1).children("span").text(),
                author: $(this).children("p").eq(1).text().replace('连载', ''),
                page: $(this).children("p").eq(2).text()
            });
        })
        res.json(returnData);
    })

});



module.exports = router;
