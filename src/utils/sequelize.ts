import { Sequelize } from "sequelize-typescript";
import { User } from "../../modules/user/user.model";
import {PolymerInfo} from "../../modules/polymer_info/polymer_info.model";
//建立数据库基础连接，提供数据库基本信息
const sequelize = new Sequelize({
  repositoryMode: true,
  database: "polymer_xjtu",
  username: "Legend",
  password: "$#wjx842004$",
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  models: [User,PolymerInfo],
});

export { sequelize };
