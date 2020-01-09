const express=require("express")//引用expre 框架
const router=express.Router();//创建路由对象
const bodyParser=require('body-parser')
const pool=require("../pool")//使用连接池
//我的收藏添加接口
router.post('/add',(req,res)=>{
    let obj=req.body
    if(!obj.uid){ddd
        res.json({
            code:301, 
            msg:"uid is required"
        })
        return;
    }
    //根据uid ，cid 查询收藏夹表
    // 如果记录不存在，则执行添加
    // 如果记录已存在则返回code:201
    let sql="SELECT count(*) as num  FROM favorite WHERE userId=? AND courseId=?"
    pool.query(sql,[obj.uid,obj.cid],(err,result)=>{
        console.log(result)
        if(result[0].num){
            res.json({
                code:201,
                msg:'favorite 已存在'
            })
            return
        }else{
            var fTime = Math.ceil((new Date()).getTime()/1000)
            let sql="INSERT INTO favorite VALUES(NULL,?,?,?)"
            pool.query(sql,[obj.uid,obj.cid,fTime],(err,result)=>{
                if(err) throw err
                console.log(result)
            let time=  Math.ceil(new Date().getTime()/1000)
            console.log(time)
                if(result.affectedRows>0){
                    res.json({
                        code:200,
                        msg:"add favorite success",
                        data:result.insertId
                    })
                }else{
                    res.json({
                        code:303,
                        msg:"failed"
                    })
        }
        
     })
    }
    })
})
//我的收藏-查询接口
router.post('/list',(req,res)=>{
    var obj=req.body
    if(!obj.uid){
        res.json({
            code:303,
            msg:"uid required"
        })
    }
    let sql="SELECT course.cid,course.title,course.pic,course.price FROM favorite,course WHERE favorite.courseId=course.cid And userId=? order by favorite.fTime DESC"
    pool.query(sql,[obj.uid],(err,result)=>{
        if(err)throw err
        if(result.length>0){
            res.json({
                code:200,
                msg:"success",
                data:result
            })
        }else{
            res.json({
                code:301,
                msg:'no favorite'
            })
        }
    })
})
module.exports=router;