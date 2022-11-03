import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
import cors from 'cors'

const app = express();
mongoose.connect("mongodb://localhost/pocketcoin");
app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(8080, () => {
  console.log("server is listening");
});
