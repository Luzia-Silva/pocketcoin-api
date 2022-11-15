import { Router } from "express";
import AmountController from "../controller/AmountController";

import NewsController from "../controller/NewsController";

import UserController from "../controller/UserController";

const routes = Router();

// Routes Users
routes.post("/v1/user", UserController.create);
routes.post("/v1/auth", UserController.auth);
routes.delete("/v1/delete", UserController.delete);
routes.get("/v1/users", UserController.find);

// Routes news
routes.get("/v1/news", NewsController.find);

// Routes Amounts
routes.get("/v1/amount", AmountController.find);

export default routes;
