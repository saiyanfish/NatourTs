"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class result {
    constructor() {
        this.status = 'S';
    }
}
const sendResponse = (message, statusCode, data, res) => {
    let jsonObject = {
        message: message,
        data: data,
    };
    res.status(statusCode).json(jsonObject);
};
