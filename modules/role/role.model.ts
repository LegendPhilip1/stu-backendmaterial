import { Table, Column, Model } from "sequelize-typescript";
@Table({
  modelName: "User",
  timestamps: false,
  freezeTableName: true,
  tableName: "user",
})
export class Role extends Model {
  @Column({ primaryKey: true })
  declare id: number;
  @Column
  declare username: string;
}
