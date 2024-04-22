import express from 'express';
import tourController from '../controllers/tourController';

const router = express.Router();

router.get('/', tourController.getTour);

export default router;
