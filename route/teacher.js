const express=require("express")
const pool=require("../pool");
const router=express.Router();//创建路由对象

router.get('/list',(req,res)=>{
    let sql="SELECT * FROM  teacher"
    pool.query(sql,(err,result)=>{
        if(err){throw err}
        // console.log(result)
        res.json({
            code:200,     //状态
            msg:'success',//消息
            data:result  //数据
        
        
        })
    })
    
})
module.exports=router;