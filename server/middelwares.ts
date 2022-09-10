import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers.authorization?.split(" ")[1].slice(0, -1);
  console.log(accessToken);
  if (!accessToken) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    throw new Error("Un-Authorized");
  }

  return next();
}

export default isAuthenticated;
