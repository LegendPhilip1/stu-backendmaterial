const exeSQL = require('./dbconfig')

async function findAll(){
    let sql = 'select * from student'
    let result = await exeSQL(sql)
    return result
}

async function deletePerformance(performance){
    let sql = 'select ${performance} from polymer_info'
    let result = await exeSQL(sql)
    return result
}

async function addColumn(column){
    //以下注释掉的是真正用于添加数据库列的sql语句
    /*let sql = `alter table polymer_info add (${column} varchar(100))`*/
    let sql = 'select * from user'
    let result = await exeSQL(sql)
    return result
}

module.exports = {
    //addPerformance,
    deletePerformance,

    findAll,
    addColumn
}