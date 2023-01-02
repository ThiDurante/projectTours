import express from 'express';
import {
  deleteTour,
  getAllTours,
  getTour,
  newTour,
  updateTour,
} from '../controllers/tourController.js';

const router = express.Router();

router.route('/').get(getAllTours).post(newTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
