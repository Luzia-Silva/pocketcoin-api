"use strict";
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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    category: {
        type: Array,
        required: true,
        default: ["all"]
    },
    amount: {
        type: Array,
        required: true,
        default: ["all"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
User.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    });
});
exports.default = mongoose_1.default.model("User", User);
