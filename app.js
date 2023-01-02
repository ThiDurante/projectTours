import express from 'express';
import {
  deleteTour,
  getAllTours,
  getTour,
  newTour,
  updateTour,
} from './routes/routes.js';

const app = express();
// setting port
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.json());

// routes

app.route('/api/v1/tours').get(getAllTours).post(newTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// get routes

// app.get('/api/v1/tours', getAllTours);

// to put optional parameters on URL use ? on the end ex: /api/v1/tours/:id/:name?
// app.get('/api/v1/tours/:id', getTour);

// post routes
// app.post('/api/v1/tours', newTour);

// updating data with put/patch - put expects a whole new obj to update, patch expects only the information thats going to update
// app.patch('/api/v1/tours/:id', updateTour);

// deleting data with delete

// app.delete('/api/v1/tours/:id', deleteTour);

// open server

app.listen(PORT, '127.0.0.1', () => {
  console.log('Server online');
});
