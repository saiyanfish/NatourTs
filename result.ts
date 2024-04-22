import { Response } from 'express';
class result {
  status?: 'S' | 'SS' = 'S';
  message?: string;
  data: any;
}

const sendResponse = (
  message: string,
  statusCode: number,
  data: any,
  res: Response,
) => {
  let jsonObject: result = {
    message: message,
    data: data,
  };
  res.status(statusCode).json(jsonObject);
};
