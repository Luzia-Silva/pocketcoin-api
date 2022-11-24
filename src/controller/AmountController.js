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
const axios_1 = __importDefault(require("axios"));
class AmountController {
    findOne(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { coins } = request.params;
            try {
                const { data } = yield (0, axios_1.default)(`https://economia.awesomeapi.com.br/last/${coins}`);
                const amount = Object.entries(data).map(([key, value]) => ({
                    coin: key,
                    elements: value
                }));
                return response.json(amount);
            }
            catch (error) {
                return response.status(500).send({
                    error: "Something wrong happened, try again",
                    message: error
                });
            }
        });
    }
    find(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const coins = "USD-BRL,EUR-BRL,BTC-BRL,JPY-EUR";
            try {
                const { data } = yield (0, axios_1.default)(`https://economia.awesomeapi.com.br/last/${coins}`);
                const amount = Object.entries(data).map(([key, value]) => ({
                    coin: key,
                    elements: value
                }));
                return response.json(amount);
            }
            catch (error) {
                return response.status(500).send({
                    error: "Something wrong happened, try again",
                    message: error
                });
            }
        });
    }
    findlist(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const coins = "GBP-BRL,ARS-BRL,AUD-BRL,CHF-BRL,CAD-BRL,CNY-BRL,CLP-BRL,PYG-BRL,UYU-BRL,COP-BRL,PEN-BRL,BOB-BRL";
            try {
                const { data } = yield (0, axios_1.default)(`https://economia.awesomeapi.com.br/last/${coins}`);
                const amount = Object.entries(data).map(([key, value]) => ({
                    coin: key,
                    elements: value
                }));
                return response.json(amount);
            }
            catch (error) {
                return response.status(500).send({
                    error: "Something wrong happened, try again",
                    message: error
                });
            }
        });
    }
}
exports.default = new AmountController();
