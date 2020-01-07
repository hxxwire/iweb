const express=require("express")
const router=express.Router();//创建路由对象
const pool=require("../pool")
router.get('/course',(req,res)=>{
    res.send(' course 测试接口')
})
//获取课程列表中总记录数量
router.get("/list",(req,res)=>{
    let obj=req.query;
    // 判断有没有参数,没有参数默认第一页
    //如果没有pageSize的参数 就默认为一页3条
    //判断有没有typeId参数
    //   每页数量, 当前页码
   let pageSize=parseInt(obj.pageSize)||3
   let curPage=parseInt(obj.curPage) || 1
   let typeId=parseInt(obj.typeId) || 0
    //查询起始位置
    let offset=(curPage-1)*pageSize

    if(typeId==0){
        //查询所有分类的课程总数
        var sql_total="SELECT sum(1) as num FROM course"
    }else{
        //查询某个分类的课程总数
        var sql_total="SELECT count(*) as num FROM course where typeId="+typeId
    }
    
    
    //查询总记录数
    pool.query(sql_total,(err,result)=>{
        if(err) throw err
       let total=result[0].num;
       let pageTotal=Math.ceil(total/pageSize)

       if(typeId<=0){
            //查询所有分类的课程总数
            var sql_limit=`SELECT * FROM course,teacher WHERE course.teacherId=teacher.tid LIMIT ${offset},${pageSize}`
        }else{
            var sql_limit=`SELECT * FROM course ,teacher  WHERE course.teacherId=teacher.tid AND typeId=${typeId} LIMIT ${offset},${pageSize}`
        }
        //查询某个分类的课程总数
        //执行分页查询
            pool.query(sql_limit,(err,result)=>{
                if(err) throw err
                res.json({
                    code:200,
                    msg:'success',
                    data:{
                        "list":result,
                        "total":total,
                        "pageSize":obj.pageSize,
                        "pageTotal":pageTotal
                    }
                })
                
            })
        })
    })
    //课程详情 /course/detail?cid=1
    router.get('/detail',(req,res)=>{
        var obj= req.query
        if(!obj.cid){
            res.json({
                code:300,
                msg:'cid id required'
            })
            return
        }
        let sql="SELECT * FROM course,teacher WHERE course.teacherId=teacher.tid AND course.cid="+obj.cid;
        pool.query(sql,(err,result)=>{
            if(err) throw err
            res.json({
                code:'200',
                msg:'success',
                data:result[0]
            })
        })
    })
    //获取最新课程接口
    router.get('/newest',(req,res)=>{
        var obj=req.query 
        if(!obj.countNum){obj.countNum=4}
        //查询最新课程就是按照课程id倒叙排列
        let sql="SELECT cid,pic,price,title,tname FROM course,teacher WHERE course.teacherId=teacher.tid ORDER BY cid DESC  LIMIT ?"
        pool.query(sql,[parseInt(obj.countNum)],(err,result)=>{
            if(err)throw err
            res.json({
                code:200,
                msg:"success",
                data:result
            })
        })


    })

    
//模块导出
module.exports=router;