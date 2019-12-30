const express=require("express")
const router=express.Router();//创建路由对象
router.get('/teacher',(req,res)=>{
    res.send(' teacher 测试接口')
})