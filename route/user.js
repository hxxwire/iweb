const express=require("express")
const router=express.Router();//创建路由对象
router.get('/user',(req,res)=>{
    res.send('user 测试接口')
})
module.exports=router;