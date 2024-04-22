"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const sendErrorDev = (error, res) => {
    res.status(error.statusCode).json({
        message: error.message,
        error: error,
    });
};
const sendErrorProd = (error, res) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
    else {
        res.status(500).json({
            status: 'fail',
            message: 'Wrong very bad !!',
        });
    }
};
const handleCastErrorDB = (error) => {
    return new appError_1.default(`Invalid ${error.path}: ${error.value}`, 400);
};
const handleDuplicateFieldsDB = (error) => {
    return new appError_1.default(`Duplicate name ${error.keyValue.name} `, 400);
};
const handleValidationErrorDB = (error) => {
    const errors = Object.values(error.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(' ')}`;
    return new appError_1.default(message, 400);
};
const errorController = (err, req, res, next) => {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'dev') {
        console.log(err);
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'prod') {
        let error = Object.assign({}, err);
        if (err.name === 'CastError') {
            error = handleCastErrorDB(error);
        }
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        sendErrorProd(error, res);
    }
};
exports.default = errorController;
