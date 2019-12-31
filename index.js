const express=require('express')
const bodyParser=require('body-parser');
var app=express();
app.listen(5050)
//新浪云的Node服务器只能监听5050端口
console.log('Server is listening 5050')
//注册body-parser 为中间件
app.use(bodyParser.json())
//false 使用querystring来解析数据
//true 使用qs
app.use(bodyParser.urlencoded({ extended: false }));
// 引入路由
const teacherRouter=require("./route/teacher.js")
//teacher/list  讲师列表
//teacher/add   添加讲师
//teacher/info?tid=2 讲师详情
//teacherRouter 中的所有路由都会加上/teacher
app.use('/teacher',teacherRouter)
const userRouter=require("./route/user.js")
const courseRouter=require("./route/course.js")
const indexRouter=require('./route/index.js')
const typeRouter=require('./route/type.js')

app.use('/user',userRouter)
app.use('/course',courseRouter)
app.use('/',indexRouter)
app.use('/type',typeRouter)

