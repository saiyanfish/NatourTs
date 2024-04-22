import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

const url = process.env.DATABASE_URL;

mongoose.connect(`${url}tour`).then(() => {
  console.log('db start');
});

const port: number = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log('server start');
});
