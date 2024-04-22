"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tourRouter_1 = __importDefault(require("./router/tourRouter"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '19kb' }));
app.use('/tour', tourRouter_1.default);
app.use('/auth', userRouter_1.default);
app.use(errorController_1.default);
exports.default = app;
