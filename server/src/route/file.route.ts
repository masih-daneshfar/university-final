import { Request, Response, Router } from "express";
import { join } from "path";
import { AppDataSource } from "../config/data-source";
import { File } from "../entity/File";
import { RequestWithFiles } from "../types";

const router = Router();
// register routes
router.get("/", async function (req: Request, res: Response, next) {
  try {
    const results = await AppDataSource.getRepository(File).find();
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req: Request, res: Response, next) {
  try {
    const results = await AppDataSource.getRepository(File).findOneBy({
      id: Number(req.params.id),
    });
    return res.send(results);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/new",
  async function ({ files }: RequestWithFiles, res: Response, next) {
    try {
      const flattedFiles = Object.values(files);
      if (flattedFiles.length === 0)
        throw next({
          message: "فایلی به سرور ارسال نشده است!",
          statusCode: 400,
        });

      for (let idx = 0; idx < flattedFiles.length; idx++) {
        const file = AppDataSource.getRepository(File).create({
          name: flattedFiles[idx].name,
        });
        await AppDataSource.getRepository(File).save(file);
        await flattedFiles[idx].mv(
          join(process.cwd(), "public", "uploads", file.name),
          (err) => {
            if (err) throw next({ ...err, statusCode: 400 });
          }
        );
      }
      return res.json(flattedFiles.map((i) => i.name));
    } catch (error) {
      next({ ...error, statusCode: 400 });
    }
  }
);

router.delete("/remove/:id", async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(File).delete(req.params.id);
  return res.send(results);
});

export default router;
