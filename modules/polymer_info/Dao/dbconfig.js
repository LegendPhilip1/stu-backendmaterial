const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:"Legend",
    password:"$#wjx842004$",
    database:'polymer_xjtu'
})

//封装执行SQL语句的方法
module.exports=function(sql,params){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn)=>{
            if(err){
                reject(err)
            }else{
                conn.query(sql,params,(err,result)=>{
                    //释放资源
                    conn.release()
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            }
        })
    })
}