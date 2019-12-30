const express=require('express')
const bodyParser=require('body-parser');
var app=express();
app.listen(5050)
//新浪云的Node服务器只能监听5050端口
console.log('Server is listening 5050')


// 引入路由
const teacherRouter=require("./route/teacher.js")
//teacher/list  讲师列表
//teacher/add   添加讲师
//teacher/info?tid=2 讲师详情
//teacherRouter 中的所有路由都会加上/teacher
app.use('/teacher',teacherRouter)
const userRouter=require("./route/user.js")
app.use('/user',userRouter)
const courseRouter=require("./route/course.js")
app.use('/courser',courseRouter)
const indexRouter=require('./route/index.js')
app.use('/',indexRouter)
