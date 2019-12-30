const express=require("express")
const router=express.Router();//创建路由对象
const bodyParser=require('body-parser')
const pool=require("../pool");

router.get('/user',(req,res)=>{
    res.send('user 测试接口')
})

router.post('/register',(req,res)=>{
    var obj=req.body
   console.log(obj)
// 比较两次输入的密码如果不一致则不向下进行
// 如果输入的密码一致就删掉upwd2
    if(obj.upwd!=obj.upwd2){
        console.log('密码不一致')
        res.json({
            code:201,
            msg:'密码不一致'
        })
    }else{
        delete obj.upwd2
         //防sql注册
        var sql="INSERT INTO user SET ?"
        pool.query(sql,[obj],(err,result)=>{
       if (err) throw err 
       console.log(result)
       res.json({
           code:200,
           msg:"success",
           data:{uid:result.insertId,uname:obj.uname}
       })
   })
    }
  
})
module.exports=router;