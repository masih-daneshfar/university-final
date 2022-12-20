import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

const router = Router();
// register routes
router.get("/", async function (req: Request, res: Response, next) {
  try {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  } catch (error) {
    next({ ...error, statusCode: 500 });
  }
});

router.get("/:id", async function (req: Request, res: Response, next) {
  try {
    const results = await AppDataSource.getRepository(User).findOneByOrFail({
      id: Number(req.params.id),
    });
    return res.json(results);
  } catch (error) {
    next({ ...error, statusCode: 404 });
  }
});

router.post("/new", async function (req: Request, res: Response, next) {
  try {
    const user = AppDataSource.getRepository(User).create(req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results);
  } catch (error) {
    next({ ...error, statusCode: 400 });
  }
});

router.put("/:id", async function (req: Request, res: Response, next) {
  try {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: Number(req.params.id),
    });
    AppDataSource.getRepository(User).merge(user, req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results);
  } catch (error) {
    next({ ...error, statusCode: 404 });
  }
});

router.delete("/:id", async function (req: Request, res: Response, next) {
  try {
    const results = await AppDataSource.getRepository(User).delete(
      req.params.id
    );
    return res.send(results);
  } catch (error) {
    next({ ...error, statusCode: 404 });
  }
});

export default router;
