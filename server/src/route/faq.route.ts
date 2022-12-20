import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Faq } from "../entity/Faq";
import AuthMiddleware from "../middlewares/auth.mw";

const router = Router();
// register routes
router.get("/", async function (req: Request, res: Response, next) {
  try {
    const faqs = await AppDataSource.getRepository(Faq).find();
    res.json(faqs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req: Request, res: Response, next) {
  try {
    const results = await AppDataSource.getRepository(Faq).findOneBy({
      id: Number(req.params.id),
    });
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.post("/new",AuthMiddleware(), async function (req: Request, res: Response, next) {
  try {
    const newFaq = AppDataSource.getRepository(Faq).create(req.body);
    const results = await AppDataSource.getRepository(Faq).save(newFaq);
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.put("/update/:id",AuthMiddleware(), async function (req: Request, res: Response, next) {
  try {
    const faq = await AppDataSource.getRepository(Faq).findOneBy({
      id: Number(req.params.id),
    });
    AppDataSource.getRepository(Faq).merge(faq, req.body);
    const results = await AppDataSource.getRepository(Faq).save(faq);
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/remove/:id",AuthMiddleware(), async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(Faq).delete(req.params.id);
  return res.send(results);
});

export default router;
