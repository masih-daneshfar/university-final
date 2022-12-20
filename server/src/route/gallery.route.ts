import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Gallery } from "../entity/Gallery";
import AuthMiddleware from "../middlewares/auth.mw";

const router = Router();
// register routes
router.get("/", async function (req: Request, res: Response, next) {
  try {
    const users = await AppDataSource.getRepository(Gallery).find({
      relations: ["banner", "images"],
      order: { created_at: "DESC" },
    });
    res.json(users);
  } catch (error) {
    const err = JSON.parse(
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    next({ ...err, statusCode: 500 });
  }
});

router.get("/:id", async function (req: Request, res: Response, next) {
  try {
    const result = await AppDataSource.getRepository(Gallery).findOneOrFail({
      where: { id: Number(req.params.id) },
      relations: ["banner", "images"],
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
      const newGallery = AppDataSource.getRepository(Gallery).create(body);
      await AppDataSource.getRepository(Gallery).save(newGallery);
      return res.json(newGallery);
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
      const { images, ...data } = body;
      if (Object.keys(data).length)
        await AppDataSource.getRepository(Gallery).update(params.id, {
          ...data,
        });

      if (images) {
        const gallery = await AppDataSource.getRepository(
          Gallery
        ).findOneOrFail({
          where: { id: Number(params.id) },
          relations: ["images"],
        });
        await AppDataSource.getRepository(Gallery)
          .createQueryBuilder()
          .relation(Gallery, "images")
          .of(gallery)
          .addAndRemove(images, gallery.images);
      }
      const results = await AppDataSource.getRepository(Gallery).findOneOrFail({
        where: { id: Number(params.id) },
        relations: ["images","banner"],
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
      const results = await AppDataSource.getRepository(Gallery).delete(
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
