import { Request, Response, Router } from "express";
import { join } from "path";
import * as fs from "fs";
import { AppDataSource } from "../config/data-source";
import { File } from "../entity/File";
import { RequestWithFiles } from "../types";
import AuthMiddleware from "../middlewares/auth.mw";

function loadFile(...path: string[]) {
  return fs.readFileSync(join(...path));
}

const router = Router();
// register routes
router.get(
  "/",
  AuthMiddleware(),
  async function (req: Request, res: Response, next) {
    try {
      const results = await AppDataSource.getRepository(File).find();
      return res.send(results);
    } catch (error) {
      const err = JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );
      next({ ...err, statusCode: 400 });
    }
  }
);
router.get(
  "/static/:name",
  AuthMiddleware(),
  async function ({ body }: Request, res: Response, next) {
    try {
      const staticFileRecord = await AppDataSource.getRepository(
        File
      ).findOneByOrFail({ name: body.name });

      const file = await loadFile(
        process.cwd(),
        "public",
        "uploads",
        staticFileRecord.name
      );
      res.writeHead(200, { "Content-Type": staticFileRecord.extension });
      return res.end(file, "binary");
    } catch (error) {
      const err = JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );
      next({ ...err, statusCode: 400 });
    }
  }
);

router.get("/:id", async function (req: Request, res: Response, next) {
  try {
    const results = await AppDataSource.getRepository(File).findOneBy({
      id: Number(req.params.id),
    });
    return res.send(results);
  } catch (error) {
    const err = JSON.parse(
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    next({ ...err, statusCode: 400 });
  }
});

router.post(
  "/new",
  async function ({ files }: RequestWithFiles, res: Response, next) {
    try {
      const flattedFiles = Object.values(files);
      if (flattedFiles.length === 0)
        throw next({
          message: "?????????? ???? ???????? ?????????? ???????? ??????!",
          statusCode: 400,
        });
      const savedFiles = [];
      for (let idx = 0; idx < flattedFiles.length; idx++) {
        const file = AppDataSource.getRepository(File).create({
          name: `${Date.now()}-${flattedFiles[idx].name}`,
          extension: flattedFiles[idx].mimetype,
        });
        const savedFile = await AppDataSource.getRepository(File).save(file);
        savedFiles.push({
          success: 1,
          file: {
            url: `http://localhost:3001/uploads/${file.name}`,
            ...savedFile,
          },
        });
        await flattedFiles[idx].mv(
          join(process.cwd(), "public", "uploads", file.name),
          (err) => {
            if (err) throw next({ ...err, statusCode: 400 });
          }
        );
      }
      if (savedFiles.length === 1) return res.json(savedFiles[0]);
      return res.json(savedFiles.map((file) => file.file));
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
  async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(File).delete(
      req.params.id
    );
    return res.send(results);
  }
);

export default router;
