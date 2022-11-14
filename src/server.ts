import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
mongoose.connect("mongodb://localhost:27017/pocketcoin").then(() => {
  console.log("connected to database mongodb");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(7777, () => {
  console.log("server is listening on http://localhost:7777/");
});
