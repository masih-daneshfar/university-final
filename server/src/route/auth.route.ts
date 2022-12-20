import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Session } from "../entity/Session";
import { User, UserRoles } from "../entity/User";
import AuthMiddleware from "../middlewares/auth.mw";
import { passwordCompere, passwordHasher } from "../utlis/passwordTools";

const router = Router();
router.post("/signin", async function ({ body, session }, res, next) {
  try {
    console.log({ body });
    if (!body.username || !body.password)
      throw new Error("کلمه عبور یا نام کاربری وارد نشده است!");

    const user = await AppDataSource.getRepository(User).findOneBy({
      username: body.username,
    });
    if(!user?.id)  throw new Error("نام کاربری یا کلمه عبور نادرست است!");
    const isPasswordValid = await passwordCompere(body.password, user.password);
    if (isPasswordValid) {
      const newSession = AppDataSource.getRepository(Session).create({
        session: session.id,
        user: user,
      });
      await AppDataSource.getRepository(Session).save(newSession);
    } else throw new Error("نام کاربری یا کلمه عبور نادرست است!");
    return res.send({
      success: isPasswordValid,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    const err = JSON.parse(
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    next({ ...err, statusCode: 400 });
  }
});

router.post("/signup", async function ({ body }, res, next) {
  try {
    if (!body.password) throw new Error("نام کاربری (ایمیل) وارد نشده است!");
    if (body.password.length < 8)
      throw new Error("طول کلمه عبور نباید کمتر از ۸ کاراکتر باشد!");
    const hashedPassword = await passwordHasher(body.password);
    const user = AppDataSource.getRepository(User).create({
      ...body,
      role: UserRoles.USER,
      password: hashedPassword,
    });
    const results = await AppDataSource.getRepository(User).save(user);
    delete results["password"];
    return res.send(results);
  } catch (error) {
    const err = JSON.parse(
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );
    next({ ...err, statusCode: 400 });
  }
});

router.post("/signout", async function ({ session }, res) {
  session.destroy(async () => {
    const results = await AppDataSource.getRepository(Session).delete(
      session.id
    );
  });
  res.send({ message: "با موفقیت خارج شدید" });
});

router.get(
  "/profile",
  AuthMiddleware({ shouldLogIn: true, allowUser: true }),
  async function ({ session }, res) {
    const { user } = await AppDataSource.getRepository(Session).findOneOrFail({
      where: {
        session: session.id,
      },
      relations: ["user"],
      select: {
        user: {
          role: true,
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          password: false,
        },
      },
    });
    res.send({ user });
  }
);

export default router;
