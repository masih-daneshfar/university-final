import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Class } from "../entity/Class";
import AuthMiddleware from "../middlewares/auth.mw";

const router = Router();
// register routes
router.get("/", async function (req: Request, res: Response, next) {
  try {
    const classes = await AppDataSource.getRepository(Class).find({
      relations: ["teachers"],
      order: { created_at: "DESC" },
      select: { teachers: { body: false,id:true,fullName:true,description:true } },
    });
    res.json(classes);
  } catch (error) {
    const err = JSON.parse(
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    next({ ...err, statusCode: 500 });
  }
});

router.get("/:id", async function (req: Request, res: Response, next) {
  try {
    const result = await AppDataSource.getRepository(Class).findOneOrFail({
      where: { id: Number(req.params.id) },
      relations: ["teachers"],
      select: {
        teachers: { body: false, id: true, fullName: true, description: true },
      },
    });
    return res.json(result);
  } catch (error) {
    const err = JSON.parse(
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    next({ ...err, statusCode: 404 });
  }
});
router.post(
  "/new",
  AuthMiddleware(),
  async function ({ body }: Request, res: Response, next) {
    try {
      const newClass = AppDataSource.getRepository(Class).create(body);
      await AppDataSource.getRepository(Class).save(newClass);
      return res.json(newClass);
    } catch (error) {
      const err = JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );
      next({ ...err, statusCode: 400 });
    }
  }
);
router.put(
  "/update/:id",
  AuthMiddleware(),
  async function ({ body, params }: Request, res: Response, next) {
    try {
      await AppDataSource.getRepository(Class).update(params.id, {
        ...body,
      });

      const results = await AppDataSource.getRepository(Class).findOneOrFail({
        where: { id: Number(params.id) },
        relations: ["teachers"],
        select: {
          teachers: {
            body: false,
            id: true,
            fullName: true,
            description: true,
          },
        },
      });

      return res.send(results);
    } catch (error) {
      const err = JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );
      next({ ...err, statusCode: 400 });
    }
  }
);

router.delete(
  "/remove/:id",
  AuthMiddleware(),
  async function (req: Request, res: Response, next) {
    try {
      const results = await AppDataSource.getRepository(Class).delete(
        req.params.id
      );
      return res.send(results);
    } catch (error) {
      const err = JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );
      next({ ...err, statusCode: 400 });
    }
  }
);

export default router;
