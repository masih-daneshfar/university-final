import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Post } from "../entity/Post";

const router = Router();
// register routes
router.get("/", async function (req: Request, res: Response, next) {
  try {
    const posts = await AppDataSource.getRepository(Post).find();
    res.json(posts);
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

router.post("/new", async function (req: Request, res: Response, next) {
  try {
    const post = AppDataSource.getRepository(Post).create(req.body);
    const results = await AppDataSource.getRepository(Post).save(post);
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.put("/update/:id", async function (req: Request, res: Response, next) {
  try {
    const post = await AppDataSource.getRepository(Post).findOneBy({
      id: Number(req.params.id),
    });
    AppDataSource.getRepository(Post).merge(post, req.body);
    const results = await AppDataSource.getRepository(Post).save(post);
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/remove/:id", async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(Post).delete(req.params.id);
  return res.send(results);
});

export default router;