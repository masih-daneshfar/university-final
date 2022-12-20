import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Subscriber } from "../entity/Subscriber";
import AuthMiddleware from "../middlewares/auth.mw";

const router = Router();
// register routes
router.get("/",AuthMiddleware(), async function (req: Request, res: Response, next) {
  try {
    const subscribers = await AppDataSource.getRepository(Subscriber).find();
    res.json(subscribers);
  } catch (error) {
    next(error);
  }
});

router.get("/:id",AuthMiddleware(), async function (req: Request, res: Response, next) {
  try {
    const results = await AppDataSource.getRepository(Subscriber).findOneBy({
      id: Number(req.params.id),
    });
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.post("/new", async function (req: Request, res: Response, next) {
  try {
    const newSubscriber = AppDataSource.getRepository(Subscriber).create(req.body);
    const results = await AppDataSource.getRepository(Subscriber).save(
      newSubscriber
    );
    res.header({ "Set-Cookie": `subscribe-cookie=true; Path=/; Expires=never` });
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/remove/:id",AuthMiddleware(), async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(Subscriber).delete(req.params.id);
  return res.send(results);
});

export default router;
