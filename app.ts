import express from 'express';
import tourRouter from './router/tourRouter';
import errorController from './controllers/errorController';
import authRouter from './router/userRouter';

const app = express();
app.use(express.json({ limit: '19kb' }));
app.use('/tour', tourRouter);
app.use('/auth', authRouter);
app.use(errorController);
export default app;
