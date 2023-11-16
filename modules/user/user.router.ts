import { defaultUserService } from "./user.service";
import * as express from "express";
export const userRouter = express.Router();

//用户列表业务接口
//*查询接口/
userRouter.get("/query", function (req, res) {
  defaultUserService.getUserData(req, res);
});
//*添加接口/
userRouter.post("/add", (req, res) => {
  defaultUserService.addUserData(req, res);
});
//*修改接口/
userRouter.put("/put/:id", (req, res) => {
  defaultUserService.putUserData(req, res);
});
//*删除接口/
userRouter.delete("/delete/:id", (req, res) => {
  defaultUserService.deleteUserData(req, res);
});
