  //连接数据库
var mysql = require('mysql');
var moment = require('moment');

var connection = mysql.createConnection({
	host: 'rm-2zex66f6614uooltf.mysql.rds.aliyuncs.com',
	user: 'ad',
	password: '47J52rxnzWpP',
	database: 'ad'
});

connection.connect();

// //查询
// connection.query("select machine_id, merchant_id, sum(IF(use_id='85d254ab12174f63b38fadf0335798a7',deal_money,0)) as deal_money, count(if(deal_money!='null',true,null)) as num from strategy_screen_ad where ad_end_time > '" + moment(new Date()).format('YYYY-MM-DD') + "' GROUP BY machine_id", function(err, rows, fields) {
// 	if (err) throw err;
// 	var rows = rows;
// 	for (let i = 0; i < rows.length; i++) {
// 		connection.query("select distinct merchant_id from strategy_screen_ad where use_id!='85d254ab12174f63b38fadf0335798a7' and machine_id=" + rows[i].machine_id, function(err, m_rows, fields) {
// 			if (err) throw err;
// 			connection.query("insert into gc_ad_money (machine_id,merchant_id,money,time,num) VALUES ('" + rows[i].machine_id + "','" + m_rows[0].merchant_id + "'," + rows[i].deal_money + ",'" + moment(new Date()).format('YYYY-MM-DD') + "','" + rows[i].num + "')", function(err) {
// 				if (err) throw err;
// 			})
// 		})
// 	}
// });

//查询
connection.query("SELECT * FROM deal_screen_ad where end_time<'" + (moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + "'"), function(err, rows, fields) {
	if (err) throw err;
	for (var i = 0; i < rows.length; i++) {
		connection.query("update deal_screen_ad set deal_status=2 where deal_id=" + rows[i].deal_id, function(err) {
			if (err) throw err;
		})
	}
});

//查询
connection.query("SELECT * FROM strategy_screen_ad where ad_end_time<'" + (moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + "' and use_id != '85d254ab12174f63b38fadf0335798a7'"), function(err, rows, fields) {
	if (err) throw err;
	for (var i = 0; i < rows.length; i++) {
		connection.query("update strategy_screen_ad set use_id='" + rows[i].merchant_id + "', ad_status=0, deal_money=0, ad_image=null, ad_end_time=null where ad_id=" + rows[i].ad_id, function(err) {
			if (err) throw err;
		})
	}
});

//关闭连接
// connection.end();
