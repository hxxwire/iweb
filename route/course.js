const express=require("express")
const router=express.Router();//创建路由对象
router.get('/course',(req,res)=>{
    res.send(' course 测试接口')
})

//模块导出
module.exports=router;