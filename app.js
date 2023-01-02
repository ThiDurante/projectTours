import express from 'express';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
// setting port
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//creating new router
// const tourRouter = express.Router();
// const userRouter = express.Router();
// router for tours
// app.use('/api/v1/tours', tourRouter);
// router for users
// app.use('/api/v1/users', userRouter);

// tourRouter.route('/').get(getAllTours).post(newTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
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
