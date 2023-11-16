import {
  Table,
  Column,
  Model,
} from "sequelize-typescript";
import { createHash } from "crypto";


@Table({
  modelName: "User",
  timestamps: false,
  freezeTableName: true,
  tableName: "user",
})
export class User extends Model {
  @Column({primaryKey: true})
  declare id: number;
  @Column
  declare username: string;
  @Column
  set password(value: string) {
    this.setDataValue(
      "password",
      createHash("md5").update(value).digest("hex")
    );
  }
  @Column
  declare phone: string;
  @Column
  declare role: string;
  // get role(): string {
  //   return this.getDataValue("role");
  // }
  @Column
  declare time: Date;
}
//如果需要模型更加详细的约束，则在init方法中继续添加
// User.init(
//   {
//     id: {
//       type: DataType.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     username: {
//       type: DataType.STRING,
//       unique: true,
//     },
//   },

//   { sequelize }
// );
