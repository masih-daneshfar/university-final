import * as express from "express";
import { Request, Response } from "express";
import { User } from "./entity/User";
import { AppDataSource } from "./config/data-source";
import UserRoute from "./route/user.route";

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
app.use(express.json());


//Routes
UserRoute(app);


// start express server
app.listen(3000);
