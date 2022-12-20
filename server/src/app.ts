import * as express from "express";
import * as bodyParser from 'body-parser';
import * as fileUpload from 'express-fileupload'
import { AppDataSource } from "./config/data-source";
import UserRoute from "./route/user.route";
import PostRoute from "./route/post.route";
import FileRoute from "./route/file.route";
import FaqRoute from "./route/faq.route";
import ErrorHandlingMiddleware from "./middlewares/errorHandler.mw";

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
app.use(bodyParser.json());
app.use(fileUpload({
  parseNested: true,
  safeFileNames: true,
  createParentPath: true,
  preserveExtension: true,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
}));


//Routes
app.use("/posts", PostRoute);
app.use("/file", FileRoute);
app.use("/user", UserRoute);
app.use("/faq", FaqRoute);

// error handling
app.use(ErrorHandlingMiddleware);
// start express server
app.listen(3000);
