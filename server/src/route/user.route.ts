import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import AuthMiddleware from "../middlewares/auth.mw";
import { passwordHasher } from "../utlis/passwordTools";

const router = Router();
// register routes
router.get(
  "/",
  AuthMiddleware(),
  async function (req: Request, res: Response, next) {
    try {
      const users = await AppDataSource.getRepository(User).find({
        select: {
          password: false,
          id: true,
          firstName: true,
          created_at: true,
          username: true,
          lastName: true,
          role: true,
        },
        order: { created_at: "DESC" },
      });
      res.json(users);
    } catch (error) {
      next({ ...error, statusCode: 500 });
    }
  }
);

router.get(
  "/:id",
  AuthMiddleware(),
  async function (req: Request, res: Response, next) {
    try {
      const { password, ...results } = await AppDataSource.getRepository(
        User
      ).findOneByOrFail({
        id: Number(req.params.id),
      });
      return res.json(results);
    } catch (error) {
      next({ ...error, statusCode: 404 });
    }
  }
);

router.post(
  "/new",
  AuthMiddleware(),
  async function ({ body }: Request, res: Response, next) {
    try {
      if (!body.password) throw new Error("user password is not supplied!");
      if (body.password.length < 8)
        throw new Error("user password should not be less than 8 characters!");
      const hashedPassword = await passwordHasher(body.password);
      const user = AppDataSource.getRepository(User).create({
        ...body,
        password: hashedPassword,
      });
      const results = await AppDataSource.getRepository(User).save(user);
      delete results["password"];
      return res.send(results);
    } catch (error) {
      next({ ...error, statusCode: 400 });
    }
  }
);

router.put(
  "/update/:id",
  AuthMiddleware(),
  async function (req: Request, res: Response, next) {
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: Number(req.params.id),
      });
      AppDataSource.getRepository(User).merge(user, req.body);
      const { password, ...results } = await AppDataSource.getRepository(
        User
      ).save(user);
      return res.send(results);
    } catch (error) {
      next({ ...error, statusCode: 404 });
    }
  }
);

router.delete(
  "/remove/:id",
  AuthMiddleware(),
  async function (req: Request, res: Response, next) {
    try {
      const results = await AppDataSource.getRepository(User).delete(
        req.params.id
      );
      return res.send(results);
    } catch (error) {
      next({ ...error, statusCode: 404 });
    }
  }
);

export default router;
