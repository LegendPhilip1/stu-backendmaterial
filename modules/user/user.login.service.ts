import secret from "../../src/config";
import * as jwt from "jsonwebtoken";
import { createHash } from "crypto";
import { Message } from "../../src/utils/enums";
import { Request, Response } from "express";
import { userRepository, UserData } from "./user.service";

/** 过期时间 单位：毫秒 默认 1分钟过期，方便演示 */
let expiresIn = "7d";

// /**
//  * @typedef Login
//  * @property {string} username.required - 用户名 - eg: admin
//  * @property {string} password.required - 密码 - eg: admin123
//  * @property {integer} verify.required - 验证码
//  */

/**
 * @typedef Login
 * @property {string} username.required - 用户名 - eg: admin
 * @property {string} password.required - 密码 - eg: admin123
 */

/**
 * @route POST /login
 * @param {Login.model} point.body.required - the new point
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @summary 登录
 * @group 用户登录、注册相关
 * @returns {Response.model} 200
 * @returns {Array.<Login>} Login
 * @headers {integer} 200.X-Rate-Limit
 * @headers {string} 200.X-Expires-After
 * @security JWT
 */

const login = async (req: Request, res: Response) => {
  // const { username, password, verify } = req.body;
  // if (generateVerify !== verify) return res.json({
  //   success: false,
  // data: {
  //   message: Message[0];
  // }
  // })
  const { username, password } = req.body;
  let userOne: UserData = await userRepository.findOne({
    where: { username: username },
  });
  if (userOne) {
    if (createHash("md5").update(password).digest("hex") == userOne.password) {
      const accessToken = jwt.sign(
        {
          accountId: userOne.id,
        },
        secret.jwtSecret,
        { expiresIn }
      );

      const refreshToken = jwt.sign(
        {
          accountId: userOne.id,
        },
        secret.jwtSecret,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        data: {
          message: Message[2],
          username,
          // 这里模拟角色，根据自己需求修改
          roles: [userOne.role],
          accessToken,
          // 这里模拟刷新token，根据自己需求修改
          refreshToken: refreshToken,
          expires: new Date(new Date()).getTime() + expiresIn,
          // 这个标识是真实后端返回的接口，只是为了演示
          pureAdminBackend:
            "这个标识是pure-admin-backend真实后端返回的接口，只是为了演示",
        },
      });
    } else {
      await res.json({
        success: false,
        data: { message: Message[3] },
      });
    }
  } else {
    res.json({
      success: false,
      data: { message: Message[1] },
    });
  }
};

export { login };
