import cors from "cors";
import { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { UserController } from "./controllers/user/main.user";
import config from "./config/config";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfigure();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfigure() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    dotenv.config();
  }
  private setMongoConfig() {
    const options: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose.connect(config.DB.URI, options);
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("mongodb connection stablished");
    });
    connection.on("error", (err) => {
      console.error(err);
      process.exit(0);
    });
  }

  private setControllers() {
    const user = new UserController();
    this.app.use("/api", user.router);
  }
}

export default Server;
