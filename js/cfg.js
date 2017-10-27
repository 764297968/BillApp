var cfg = {
	keyname: "bill",
	downloadkey: "DownLoadPath",
	downloadpath: function() {
		var path = plus.storage.getItem(cfg.downloadkey);

		if(path == null) {  
			plus.io.resolveLocalFileSystemURL("_downloads/", function(entry) {
					path = entry.fullPath.substr(0, entry.fullPath.indexOf('Android')) + "Download/";
					plus.storage.setItem(cfg.downloadkey, path);
					return path;
				},
				function(err) {
					console.log(err.message);
				})

		} else {
			return path;
		}

	},
	dateToStr: function(datetime) {
		var year = datetime.getFullYear(),
			month = datetime.getMonth() + 1,
			date = datetime.getDate(),
			hour = datetime.getHours(),
			minutes = datetime.getMinutes(),
			second = datetime.getSeconds();
		if(month < 10) {
			month = "0" + month;
		}
		if(date < 10) {
			date = "0" + date;
		}
		if(hour < 10) {
			hour = "0" + hour;
		}
		if(minutes < 10) {
			minutes = "0" + minutes;
		}
		if(second < 10) {
			second = "0" + second;
		}
		return(year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second);
	},
	setstorge:function(key,value)
	{
		plus.storage.setItem(key,value);
	}
};

var db = window.openDatabase("mydatabase", "1.0", "我的数据库描述", 20000);
var d = new Date();

//创建数据表
var sql = "CREATE TABLE bill (" +
	"id TEXT," +
	"money text," +
	"des text," +
	"date REAL," +
	"createtime real," +
	"state int)";
db.transaction(function(tx) {
	tx.executeSql(sql);
});
db.query = function(sql, func) {
	if(db && sql) {
		db.transaction(function(tx) {
			tx.executeSql(sql, [], function(tx, results) {
				func(results);
			}, null);
		});
	}
};
db.addbill = function(m, des, t) {
	db.transaction(function(tx) {
		tx.executeSql("insert into bill (id,money,des,date,createtime,state) values(?,?,?,?,?,?)", [d.getTime(), m, des, t, d.toLocaleString(), 1], null, null);
	})

}
db.showbill = function(func) {

	db.query("select * from bill order by createtime desc", function(res) {
		var data = [];
		for(var i = 0; i < res.rows.length; i++) {
			data.push(res.rows.item(i));
		}
		func(data);
	})
}
db.delbill = function() {
	db.transaction(function(tx) {
		tx.executeSql("delete from bill", [], null, null);
	})
}
//db.addbill(23,"呵呵呵",d.toLocaleString())
//db.transaction(function(tx) {
//	tx.executeSql("delete from mytable");
//});