import { Request, Response } from "express";
import secret from "../../src/config";
import * as jwt from "jsonwebtoken";
import { access } from "fs";
/**
 * @route POST /refreshToken
 * @param {RefreshToken.model} point.body.required - the new point
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @summary 刷新token
 * @group 用户令牌、无感刷新
 * @returns {Response.model} 200
 * @returns {Array.<RefreshToken>} RefreshToken
 * @headers {integer} 200.X-Rate-Limit
 * @headers {string} 200.X-Expires-After
 * @security JWT
 */

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    const expiresIn = "7d";
    const verify_res = jwt.verify(refreshToken, secret.jwtSecret);
    const accessToken = jwt.sign(
      {
        accountId: verify_res["accountId"],
      },
      secret.jwtSecret,
      { expiresIn }
    );
    return res.json({
      success: true,
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        // `expires`选择这种日期格式是为了方便调试，后端直接设置时间戳或许更方便（每次都应该递增）。如果后端返回的是时间戳格式，前端开发请来到这个目录`src/utils/auth.ts`，把第`38`行的代码换成expires = data.expires即可。
        expires: new Date(new Date()).getTime() + expiresIn,
      },
    });
  } else {
    return res.json({
      success: false,
      data: {},
    });
  }
};

export { refreshToken };
