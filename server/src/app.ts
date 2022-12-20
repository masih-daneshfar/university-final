import * as express from "express";
import * as bodyParser from "body-parser";
import * as fileUpload from "express-fileupload";
import * as cors from "cors";
import { AppDataSource } from "./config/data-source";
import AuthRoute from "./route/auth.route";
import UserRoute from "./route/user.route";
import PostRoute from "./route/post.route";
import FileRoute from "./route/file.route";
import FaqRoute from "./route/faq.route";
import ErrorHandlingMiddleware from "./middlewares/errorHandler.mw";
import SessionMiddleware from "./middlewares/session.mw";
import AuthMiddleware from "./middlewares/auth.mw";
import { join } from "path";

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
app.use(
  cors({
    credentials: true,
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "Origin",
      "Accept",
      "X-Requested-With",
      "Authorization",
      "Content-Type, Access-Control-Request-Method",
      "Access-Control-Request-Headers",
    ],
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(
  fileUpload({
    parseNested: true,
    safeFileNames: true,
    createParentPath: true,
    preserveExtension: true,
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  })
);

app.use("/uploads", express.static(join(process.cwd(), "public", "uploads")));
app.use(SessionMiddleware);

//Routes
app.use("/auth", AuthRoute);
app.use("/user", AuthMiddleware(), UserRoute);
app.use("/post", PostRoute);
app.use("/file",AuthMiddleware(), FileRoute);
app.use("/faq", FaqRoute);

// error handling
app.use(ErrorHandlingMiddleware);
// start express server
app.listen(3001);
