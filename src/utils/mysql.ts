import * as mysql from "mysql2";
import mysqlConfig from "../config";
import Logger from "../loaders/logger";

/** mtrl_xjtu数据库 */
export const connection = mysql.createConnection(
  Object.assign({ database: "polymer_xjtu" }, mysqlConfig.mysql)
);

export function queryTable(s: string): void {
  connection.query(s, (err) => {
    err ? Logger.error(err) : Logger.info(`${s}表创建成功`);
  });
}
