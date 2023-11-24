import * as jwt from "jsonwebtoken";
import secret from "../../src/config";
import { Request, Response } from "express";

export const authorize = async (req: Request, res: Response) => {
    let payload = null;
    try {
      const authorizationHeader = req.get("Authorization") as string;
      console.log(1)
      const accessToken = authorizationHeader.substr("Bearer ".length);
      console.log(2)
      payload = jwt.verify(accessToken, secret.jwtSecret);
      console.log(3)
    } catch (error) {
      console.log("authorize error\n")
      return res.status(401).end();
    }
}
