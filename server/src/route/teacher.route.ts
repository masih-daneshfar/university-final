import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Teacher } from "../entity/Teacher";
import AuthMiddleware from "../middlewares/auth.mw";

const router = Router();
// register routes
router.get("/", async function (req: Request, res: Response, next) {
  try {
    const teachers = await AppDataSource.getRepository(Teacher).find({
      relations: ["avatar","classes"],
      order: { created_at: "DESC" },
    });
    res.json(teachers);
  } catch (error) {
    const err = JSON.parse(
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    next({ ...err, statusCode: 500 });
  }
});

router.get("/:id", async function (req: Request, res: Response, next) {
  try {
    const result = await AppDataSource.getRepository(Teacher).findOneOrFail({
      where: { id: Number(req.params.id) },
      relations: ["avatar", "classes"],
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
      const newTeacher = AppDataSource.getRepository(Teacher).create(body);
      await AppDataSource.getRepository(Teacher).save(newTeacher);
      return res.json(newTeacher);
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
        await AppDataSource.getRepository(Teacher).update(params.id, {
          ...body,
        });

      const results = await AppDataSource.getRepository(Teacher).findOneOrFail({
        where: { id: Number(params.id) },
        relations: ["avatar", "classes"],
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
      const results = await AppDataSource.getRepository(Teacher).delete(
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
