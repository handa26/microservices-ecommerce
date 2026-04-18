import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string | null;
    }
  }
}

export const shouldBeUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = getAuth(req);
  const userId = auth.userId;

	if (!userId) {
		res.status(401).json({ message: "You are not logged in!" });
	}

  req.userId = auth.userId;

  return next();
};
