/** 创建用户表 */
const User =
  "CREATE TABLE if not EXISTS User(" +
    "id int PRIMARY key auto_increment," +
    "username varchar(32)," +
    "password varchar(32)," +
    "phone varchar(32),"+
    "role varchar(32)," +
    "time DATE);"

export { User };
