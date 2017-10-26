var cfg = {
	keyname: "bill"
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
//
//
//db.transaction(function(tx) {
//	//tx.executeSql("insert into mytable (mytitle,timestamp) values('111',"+d.toLocaleString()+")",[],null,null);
//	try{
//		tx.executeSql("insert into bill (id,money,des,date,createtime,state) values(?,?,?,?,?,?)", [d.getTime(), '22', '吃的', d.toLocaleString(),d.toLocaleString(), 1], null, null);
//	}catch(e){
//		//TODO handle the exception
//		console.log(e);
//	}
//});
db.query = function( sql, func){
	if(db && sql){
		db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, results) {
				func(results);
			}, null);
		});
	}
};
db.addbill=function(m,des,t)
{
	db.transaction(function(tx) {
	tx.executeSql("insert into bill (id,money,des,date,createtime,state) values(?,?,?,?,?,?)", [d.getTime(), m, des,t,d.toLocaleString(), 1], null, null);
	})
	
}
db.showbill=function(func)
{
	
	db.query("select * from bill order by createtime desc",function(res){
		var data=[];
		for (var i=0;i<res.rows.length;i++) {
			data.push(res.rows.item(i));
		}
		func(data);
	})
}
db.delbill=function()
{
	db.transaction(function(tx) {
	tx.executeSql("delete from bill", [], null, null);
	})
}
//db.addbill(23,"呵呵呵",d.toLocaleString())
//db.transaction(function(tx) {
//	tx.executeSql("delete from mytable");
//});