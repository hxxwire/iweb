const express=require("express")

const router=express.Router()
//首页路由
router.get('/',(req,res)=>{
    res.send('首页接口')
})

module.exports = router