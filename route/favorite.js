const express=require("express")
const router=express.Router();//创建路由对象
const bodyParser=require('body-parser')
const pool=require("../pool")

router.post('/add',(req,res)=>{
    let sql=""
    let obj=req.body
    console.log(obj)
    let sql="INSERT INTO favorite VALUES(NULL,?,?,?)"
    pool.query(sql,[obj.uid,obj.cid,obj.fTime],(err,result)=>{
        if(err) throw err
        console.log(result)
      let time=  Math.ceil(new Date().getTime()/1000)
      console.log(time)
        if(result.affectedRows>0){
            res.json({
                code:200,
                msg:"success"
            })
        }else{
            res.json({
                code:300,
                msg:"failed"
            })
        }
    })
})

module.exports=router;