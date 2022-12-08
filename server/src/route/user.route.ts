import { Request, Response ,Express} from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

const UserRoute = (app: Express) => {
  // register routes
  app.get("/users", async function (req: Request, res: Response) {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  });

  app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(User).findOneBy({
      id: Number(req.params.id),
    });
    return res.send(results);
  });

  app.post("/users", async function (req: Request, res: Response) {
    const user = await AppDataSource.getRepository(User).create(req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results);
  });

  app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: Number(req.params.id),
    });
    AppDataSource.getRepository(User).merge(user, req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results);
  });

  app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(User).delete(req.params.id);
    return res.send(results);
  });
};
export default UserRoute;