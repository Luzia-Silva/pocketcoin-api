"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AmountController_1 = __importDefault(require("../controller/AmountController"));
const NewsController_1 = __importDefault(require("../controller/NewsController"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const routes = (0, express_1.Router)();
// Routes Users
routes.post("/v1/user", UserController_1.default.create);
routes.post("/v1/login", UserController_1.default.login);
routes.delete("/v1/delete/:id", UserController_1.default.delete);
routes.get("/v1/users", UserController_1.default.find);
routes.get("/v1/users/:id", UserController_1.default.findOne);
// Routes news
routes.get("/v1/news", NewsController_1.default.find);
// Routes Amounts
routes.get("/v1/amount/:coins", AmountController_1.default.findOne);
routes.get("/v1/amount", AmountController_1.default.find);
routes.get("/v1/list", AmountController_1.default.findlist);
exports.default = routes;
