import { Table, Column, Model } from "sequelize-typescript";
@Table({
  modelName: "PolymerInfo",
  timestamps: false,
  freezeTableName: true,
  tableName: "polymer_info",
})
export class PolymerInfo extends Model {
  @Column({ primaryKey: true })
  declare id: number;
  @Column
  declare material: string;
  @Column
  declare formula_url: string;
  @Column
  declare initial_temp: GLfloat;
  @Column
  declare max_temp: GLfloat;
  @Column
  declare end_temp: GLfloat;
  @Column
  declare rate: GLfloat;
  @Column
  declare atmosphere: string;
  @Column
  declare reference: string;
  @Column
  declare residual_mass: GLfloat;
  @Column
  declare time: Date;
  @Column
  declare pdf_url: string;
}
