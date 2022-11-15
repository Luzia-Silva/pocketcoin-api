import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
console.log();
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@databasepocketcoin.y5yj6yq.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to database mongodb");
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.listen(7777, () => {
      console.log("server is listening on http://localhost:7777/");
    });
  })
  .catch((error) => console.log("database connection error mongodb" + error));
