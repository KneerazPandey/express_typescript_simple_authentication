import { Request, Response, NextFunction } from "express";
import { merge } from "lodash";
import { getUserBySessionToken } from "../db/models/user";
import EnvData from "../config/data/env-data";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies[EnvData.COOKIE_KEY];
    if (!sessionToken) {
      return res.status(403).json({ error: "Session Expired" });
    }
    const existing_user = await getUserBySessionToken(sessionToken);
    if (!existing_user) {
      return res.status(403).json({'error': 'Session Expired'});
    }
    merge(req, {identity: existing_user});
    return next();
  } catch (error) {
    return res.status(400).json({ error: "Session expired" });
  }
};
