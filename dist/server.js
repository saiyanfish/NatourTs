"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/config.env' });
const url = process.env.DATABASE_URL;
mongoose_1.default.connect(`${url}tour`).then(() => {
    console.log('db start');
});
const port = Number(process.env.PORT) || 3000;
const server = app_1.default.listen(port, () => {
    console.log('server start');
});
