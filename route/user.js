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
     //检测用户名是否为空
     if(!obj.uname){
        res.json({
            code:401,
            msg:"用户名不能为空"
        })
    }
     //检测密码是否为空
     if(!obj.upwd){
        res.json({
            code:402,
            msg:"upwd require"
        })
    }
     //检测重复密码是否为空
     if(!obj.upwd2){
        res.json({
            code:403,
            msg:"upwd2 require"
        })
    }
     //检测两次密码是否一样
     if(obj.upwd2!=obj.upwd){
        res.json({
            code:404,
            msg:"两次输入的密码不一致"
        })
    }
     //检测手机号是否为空
     if(!obj.phone){
        res.json({
            code:405,
            msg:"手机号不能为空"
        })
    }
     //检测手机号合法性
    var phoneReg=/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/

     if(!phoneReg.test(obj.phone)){
        res.json({
            code:406,
            msg:"手机号格式不对"
        })
    }   
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
//用户登录
router.post("/login",(req,res)=>{
    var obj=req.body
    console.log(obj)
    //检测用户名是否为空
    if(!obj.uname){
        res.json({
            code:401,
            msg:"用户名不能为空"
        })
    }
     //检测密码是否为空
     if(!obj.upwd){
        res.json({
            code:402,
            msg:"upwd require"
        })
    }
     let sql="SELECT * FROM user WHERE UNAME=? AND UPWD=?"

    pool.query(sql,[obj.uname,obj.upwd],(err,result)=>{
        if(err)throw err
        console.log(result)
        if(!cresult[0]){
            res.json({
                code:200,
                msg:'登陆成功',
                data:result
            })
        }else{
            res.json({
                code:300,
                msg:'登录失败'

            })
        }
    })
  
})

//检查用户名是否存在
router.post('/check_uname',(req,res)=>{
    let obj=req.body
    console.log(obj)
    if(!obj.uname){
        res.json({code:300,msg:"用户名不能为空"})
      
    }
    let uname=obj.uname
    let sql="SELECT count(*) as num FROM user WHERE UNAME=?"
    pool.query(sql,[obj.uname],(err,result)=>{
        if(err) throw err
        if(result[0].num==0){
            res.json(
                {
                    "code": 200,
                    "msg": "not exist"
                }
            )
        }else{
            res.json(
                {
                    "code": 300,
                    "msg": "exist"
                }
            )
        }

    })
})

// 检测手机号是否存在
router.post('/check_phone',(req,res)=>{
    let obj=req.body
    console.log(obj)
    if(!obj.phone){
        res.json({code:300,msg:'手机号不能为空'})
        return
    }
    let sql='SELECT COUNT(*) as num FROM user WHERE phone=?'
    pool.query(sql,[obj.phone],(err,result)=>{
        if(err) throw err
        if(result[0].num>0){
            res.json({
                code:301,
                msg:"手机号已经存在"
            })
        }else{
            res.json({
                code:200,
                msg:"not exist"
            })
        }
    })

})
module.exports=router;