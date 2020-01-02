const express=require("express")
const router=express.Router();//创建路由对象
const bodyParser=require('body-parser')
const pool=require("../pool")

router.post("/add",(req,res)=>{
    let obj=req.body
    // 用户id参数
    if(!obj.uid){
        res.json({
            code:301,
            msg:"uid required",
        })
        return
    }
      // 商品id参数
      if(!obj.cid){ 
        res.json({
            code:301,
            msg:"cid required",
        })
        return
    }
    if(!obj.count){
        obj.count=1
    }
    console.log(obj)
    //查询要添加的商品是否在数据表内 用户的购物车当中是否已经添加过该商品
    let sql="SELECT count(*) as num FROM cart WHERE userId=? AND courseId=?"
    pool.query(sql,[obj.uid,obj.cid],(err,result)=>{
        if(err) throw err
        //如果商品已存在（更新）
        if(result[0].num>0){
             var sql=`UPDATE cart SET count=count+${obj.count} WHERE userID=${obj.uid} AND courseId=${obj.cid}`
        } else{
            //商品尚未添加到购物车中执行添加
            var sql=`  INSERT INTO cart VALUES(NULL,${obj.uid},${obj.cid},${obj.count})`
        }
        pool.query(sql,(err,result)=>{
            if(err){throw err}
            console.log(result)
            if(result.affectedRows >0){
                res.json({
                    code:200,
                    msg:'success',
                })
            }else{
                res.json({
                    code:400,
                    msg:'faild',
                })
            }
        })
    })
})
//3.2查询购物车列表 cart/list
router.post("/list",(req,res)=>{
    let obj=req.body
    if(!obj.uid){
        res.json({
            code:301,
            msg:"uid required"
        })
    }
        let sql="SELECT cart.ctid,cart.courseId,cart.count,course.title,course.pic,course.price FROM cart,course WHERE cart.userId=? AND cart.courseId=course.cid"
        pool.query(sql,[parseInt(obj.uid)],(err,result)=>{
        if(err) throw err
        if(result.length>0){
            res.json({
                code:200,
                msg:"suceess",  
                data:result
            })
        }else{
            res.json({
                code:201,
                msg:"cart is empty",  
            })
        }
    })
})
// 更新购物车接口
router.post('/update',(req,res)=>{
    //判断参数是否为空
    let obj=req.body
    if(!obj.ctid){
        res.json({
            code:301,
            msg:"ctid required",  
        })
        return
    }
    if(!obj.count){
        res.json({
            code:301,
            msg:"count required",  
        })
        return
    }
//查询数据库
    let sql="UPDATE cart SET count=? where ctid=?"
    pool.query(sql,[parseInt(obj.count),parseInt(obj.ctid)],(err,result)=>{
        if(err) throw err
        console.log(result)
        if(result.affectedRows>0){
            res.json({
                code:200,
                msg:"success",  
                data:result
            })
        }else{
            res.json({
                code:301,
                msg:"falid",  
            })
        }
       
    })
})
//清空购物车接口
router.post('/empty',(req,res)=>{
    let obj=req.body
    //判断参数是否为空
    if(!obj.uid){
        res.json({code:301,msg:"uid required"})
        return
    }
    let sql="DELETE FROM cart WHERE userId=?"
    pool.query(sql,[parseInt(obj.uid)],(err,result)=>{
         if(err) throw err
         if(result.affectedRows>0){
            res.json({
                code:200,
                msg:'success',
                data:result
            }) 
         }else{
            res.json({
                code:300,
                msg:'fail',
            }) 
         }
    })
})
router.post("/delete",(req,res)=>{
    let obj=req.body
    let sql="DELETE FROM cart WHERE ctid=?"
    pool.query(sql,[parseInt(obj.ctid)],(err,result)=>{
        if(err) throw err
        if(result.affectedRows>0){
            res.json({
                code:200,
                msg:'success'
            })
        }else{
            res.json({
                code:300,
                msg:'failed'
            })
        }
    })
})
//模块导出
module.exports=router;