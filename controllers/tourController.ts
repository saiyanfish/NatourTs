import { Request, Response, NextFunction } from 'express';
import Tour from '../model/tourModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import APIFeatures from '../utils/apiFeatures';
const tourController = {
  getTour: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      let query = Tour.find().readConcern('majority');
      let queryObj = { ...req.query };
      const queryRs = new APIFeatures(query, queryObj)
        .filter()
        .limitFields()
        .sort()
        .page();

      const tours = await queryRs.query;

      console.log(tours);
      if (!tours || tours.length === 0) {
        return next(new AppError('no tours can find', 404));
      }

      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours,
        },
      });
    },
  ),
  getSingleTour: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const tour = await Tour.findById(req.params.id);
      if (!tour) return next(new AppError('GG', 404));
      res.status(200).json({
        status: 'success',
        data: tour,
      });
    },
  ),
};
export default tourController;
