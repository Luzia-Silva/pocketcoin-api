"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const User_1 = __importDefault(require("../database/schemas/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, surname, category, amount, email, password } = request.body;
            try {
                const userExists = yield User_1.default.findOne({ email });
                if (userExists) {
                    return response.status(400).json({
                        error: true,
                        message: "User already exists"
                    });
                }
                const user = yield User_1.default.create({
                    name,
                    surname,
                    category,
                    amount,
                    email,
                    password
                });
                return response.json(user);
            }
            catch (error) {
                return response.status(500).send({
                    error: true,
                    message: "Registration failed"
                });
            }
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            try {
                const user = yield User_1.default.findOne({ email: email });
                if (user) {
                    const comparePassword = bcrypt.compareSync(password, user.password);
                    if (comparePassword) {
                        const token = jsonwebtoken_1.default.sign({
                            _id: user._id
                        }, String(process.env.SECRET), {
                            expiresIn: "24h"
                        });
                        return response.status(200).json({
                            user,
                            message: "authentication performed successfully",
                            token
                        });
                    }
                    else {
                        response
                            .status(400)
                            .json({ error: true, message: "Invalid Password" });
                    }
                }
                else {
                    response
                        .status(401)
                        .json({ error: true, message: "User does not exist" });
                }
            }
            catch (error) {
                return response.status(500).send({
                    error: error,
                    message: "error in backend"
                });
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = request.params;
            try {
                const userExists = yield User_1.default.findOne({ _id });
                if (!_id) {
                    return response.status(400).json({
                        error: true,
                        message: "This record does not exist"
                    });
                }
                const user = yield User_1.default.deleteOne({
                    _id
                });
                return response.json(user);
            }
            catch (error) {
                return response.status(500).send({
                    error: true,
                    message: "This error in application"
                });
            }
        });
    }
    findOne(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const user = yield User_1.default.findById(id);
                return response.json(user);
            }
            catch (error) {
                return response.status(500).send({
                    error: true,
                    message: "This record does not exist"
                });
            }
        });
    }
    find(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, surname, category, email } = request.body;
            try {
                const users = yield User_1.default.find();
                return response.json(users);
            }
            catch (error) {
                return response.status(500).send({
                    error: true,
                    message: "This record does not exist"
                });
            }
        });
    }
}
exports.default = new UserController();
