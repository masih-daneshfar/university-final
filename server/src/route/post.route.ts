import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Post, PostType } from "../entity/Post";
import AuthMiddleware from "../middlewares/auth.mw";

const router = Router();
// register routes
router.get("/", async function (req: Request, res: Response, next) {
  try {
    const posts = await AppDataSource.getRepository(Post).find({
      order: { created_at: "DESC" },
      where: { type: PostType.normal },
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/all", async function (req: Request, res: Response, next) {
  try {
    const posts = await AppDataSource.getRepository(Post).find({
      order: { created_at: "DESC" },
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/latest", async function (req: Request, res: Response, next) {
  try {
    const posts = await AppDataSource.getRepository(Post).find({
      where: { type: PostType.normal },
      order: { created_at: "DESC" },
      take: 5,
    });
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/type/:type", async function (req: Request, res: Response, next) {
  try {
    const post = await AppDataSource.getRepository(Post).findOneByOrFail({
      type: req.params.type as PostType,
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req: Request, res: Response, next) {
  try {
    const results = await AppDataSource.getRepository(Post).findOneBy({
      id: Number(req.params.id),
    });
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/new",
  AuthMiddleware(),
  async function ({ body }: Request, res: Response, next) {
    try {
      if (body.type !=="normal") {
        const postWithType = await AppDataSource.getRepository(Post).findOneBy({
          type: body.type,
        });
        if (postWithType){
          AppDataSource.getRepository(Post).merge(postWithType, {
            type: PostType.normal,
          });
          const savePostWithType = await AppDataSource.getRepository(Post).save(
            postWithType
          );
        }
      }
      const post = AppDataSource.getRepository(Post).create(body);
      const results = await AppDataSource.getRepository(Post).save(post);
      return res.send(results);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/update/:id",
  AuthMiddleware(),
  async function (req: Request, res: Response, next) {
    try {
      if (req.body.type !== "normal") {
        const postWithType = await AppDataSource.getRepository(Post).findOneBy({
          type: req.body.type,
        });
        if (postWithType) {
          AppDataSource.getRepository(Post).merge(postWithType, {
            type: PostType.normal,
          });
          const savePostWithType = await AppDataSource.getRepository(Post).save(
            postWithType
          );
        }
      }
      const post = await AppDataSource.getRepository(Post).findOneBy({
        id: Number(req.params.id),
      });
      AppDataSource.getRepository(Post).merge(post, req.body);
      const results = await AppDataSource.getRepository(Post).save(post);
      return res.send(results);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/remove/:id",
  AuthMiddleware(),
  async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(Post).delete(
      req.params.id
    );
    return res.send(results);
  }
);

export default router;
