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
const backupNews_1 = require("./backupNews");
const jssoup_1 = __importDefault(require("@aghajari/jssoup"));
const axios_1 = __importDefault(require("axios"));
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default();
class News {
    getNews(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = cache.get("crawler");
            if (response) {
                // return response;
            }
            return this.refine(yield this.html(url));
        });
    }
    html(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.get(url);
            return res.data;
        });
    }
    refine(html) {
        const response = [];
        const news = jssoup_1.default.load(html).find(".sc-d1d6e607-0 .gYerqE");
        for (let i = 0; i < news.length; i++) {
            const category = news[i].findFirst(".sc-e218a163-17 .cYJOs");
            const content = news[i].findFirst(".touch-area");
            response.push({
                title: content.plainText(),
                link: "https://exame.com" + content.getValue("href"),
                category: category.plainText()
            });
        }
        return response.length > 0 ? response : backupNews_1.BackupNews;
    }
}
exports.default = new News();
