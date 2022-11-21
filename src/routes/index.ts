import { Router } from "express";
import AmountController from "../controller/AmountController";

import NewsController from "../controller/NewsController";

import UserController from "../controller/UserController";

const routes = Router();

// Routes Users
routes.post("/v1/user", UserController.create);
routes.post("/v1/login", UserController.login);
routes.delete("/v1/delete/:id", UserController.delete);
routes.get("/v1/users", UserController.find);
routes.get("/v1/users/:id", UserController.findOne);

// Routes news
routes.get("/v1/news", NewsController.find);

// Routes Amounts
routes.get("/v1/amount/:coins", AmountController.findOne);
routes.get("/v1/amount", AmountController.find);
routes.get("/v1/list", AmountController.findlist);

export default routes;
