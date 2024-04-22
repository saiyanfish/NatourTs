import { Request, Response, NextFunction } from 'express';
import User from '../model/userModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import * as jwt from 'jsonwebtoken';

const createSendToken = (userID: string, res: Response) => {
  const expiresIn = parseInt(process.env.JWT_EXPIRESIN!, 10);
  const token = jwt.sign({ _id: userID }, process.env.JWT_SECRET!, {
    expiresIn: expiresIn,
  });

  res.cookie('jwt', token);
  res.status(200).json({
    status: 'success',
    data: {
      token,
    },
  });
};

const authController = {
  logIn: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Plz provide your password or email', 400));
    }

    const user = await User.findOne({ email: email }).select('+password');
    if (!user || !user.correctPassword(password, user.password)) {
      return next(new AppError('Incorrect email or password', 401));
    }
    createSendToken(user._id.toString(), res);
  }),

  signUp: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });
      createSendToken(newUser._id.toString(), res);
    },
  ),
};

export default authController;
