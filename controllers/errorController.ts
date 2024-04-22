import AppError from '../utils/appError';
import { Request, Response, NextFunction } from 'express';

const sendErrorDev = (error: any, res: Response) => {
  res.status(error.statusCode).json({
    message: error.message,
    error: error,
  });
};

const sendErrorProd = (error: any, res: Response) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Wrong very bad !!',
    });
  }
};

const handleCastErrorDB = (error: any) => {
  return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
};

const handleDuplicateFieldsDB = (error: any) => {
  return new AppError(`Duplicate name ${error.keyValue.name} `, 400);
};

const handleValidationErrorDB = (error: any) => {
  const errors = Object.values(error.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(' ')}`;
  return new AppError(message, 400);
};

const errorController = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'dev') {
    console.log(err);
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'prod') {
    let error = { ...err };
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};

export default errorController;
