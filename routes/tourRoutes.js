import express from 'express';
import {
  deleteTour,
  getAllTours,
  getTour,
  createTour,
  updateTour,
} from '../controllers/tourController.js';

const router = express.Router();

// creating a middleware to run only when a parameter exists
// router.param('id', (res, req, next, value) => {
//   console.log('Your id is ', value);
//   next();
// });

// router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
