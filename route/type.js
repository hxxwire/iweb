const express=require("express")
const router=express.Router();//创建路由对象
const pool=require('../pool')
//课程分类路由
router.get('/',(req,res)=>{
    let obj=req.body
    let sql="SELECT * FROM type"
    pool.query(sql,(err,result)=>{
        if(err) throw err
        if(result){
            res.json({
                code:200,
                msg:'请求成功',
                data:result                  
            })
        }
    })
})


//模块导出
module.exports=router;