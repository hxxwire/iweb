//创建MySql的连接池
// 引入mysql模块
const mysql=require('mysql')
var pool=mysql.createPool({
    host:'127.0.0.1', //数据库地址
    user:'root', //数据库用户名
    password:'', //用户名密码
    port:3306, //数据库端口
    database:'iweb', //数据库名称
    connectionLimit:15 //设置最大连接
})

//导出数据库连接

module.exports=pool;