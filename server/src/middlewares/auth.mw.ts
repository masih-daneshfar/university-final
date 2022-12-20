import { NextFunction, Request, Response } from "express";
import session = require("express-session");
import { AppDataSource } from "../config/data-source";
import { Session } from "../entity/Session";
import { UserRoles } from "../entity/User";

interface AuthMiddlewareType {
  allowUser?: boolean;
  shouldLogIn?: boolean;
}
const AuthMiddleware =
  ({ allowUser = false, shouldLogIn = true }: AuthMiddlewareType = {}) =>
  async ({ session }: Request, res: Response, next: NextFunction) => {
    try {
      if (!shouldLogIn) return next();
      const userSession = await AppDataSource.getRepository(
        Session
      ).findOneOrFail({
        where: {
          session: session.id,
        },
        relations: ["user"],
        select: { user: { role: true, id: true, password: false } },
      });
      console.log({ s: userSession.user });
      if (userSession.user.role === UserRoles.ADMIN) {
        return next();
      }
      if (allowUser) return next();
      else return res.status(403).send({ message: "forbidden content !" });
    } catch (error) {
      next({ ...error, message: "you are not logged in!", statusCode: 401 });
    }
  };

export default AuthMiddleware;
