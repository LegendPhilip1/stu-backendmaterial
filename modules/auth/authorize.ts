import * as jwt from "jsonwebtoken";
import secret from "../../src/config";
import { Request, Response } from "express";

export const authorize = async (req: Request, res: Response) => {
    let payload = null;
    try {
      const authorizationHeader = req.get("Authorization") as string;
      const accessToken = authorizationHeader.substr("Bearer ".length);
      payload = jwt.verify(accessToken, secret.jwtSecret);
    } catch (error) {
      return res.status(401).end();
    }
}