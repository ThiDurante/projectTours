import express from 'express';
import fs from 'fs';

const app = express();
// setting port
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.json());

// reading json file for now, will use mongoDB later
const tours = JSON.parse(fs.readFileSync('./data/tours.json'));

// routes

// get routes

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// to put optional parameters on URL use ? on the end ex: /api/v1/tours/:id/:name?
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const selectedTour = tours.filter((tour) => tour.id === +req.params.id);
  // if (+req.params.id > tours.length) {
  // if (selectedTour.length < 1) {
  if (selectedTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid tour ID',
    });
  }

  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      selectedTour,
    },
  });
});

// post routes

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  // Object.assign merges 2 objects and creates a new one
  const newTour = Object.assign({id: newId}, req.body);
  // pushes newTour to array of tours
  tours.push(newTour);
  // overwrites data file with new array of tours - needs to be async because its in the event loop
  fs.writeFile('/data/tours.json', JSON.stringify(tours), (err) => {
    // after done, sends data to client
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });

  // res.send('Done');
});

// updating data with put/patch - put expects a whole new obj to update, patch expects only the information thats going to update
app.patch('/api/v1/tours/:id', (req, res) => {
  // this will be implemented when we use mongoDB, for now just a simple response
  if (+req.params.id > tours.length) {
    // if (selectedTour.length < 1) {
    // if (selectedTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid tour ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour goes here',
    },
  });
});

// deleting data with delete

app.delete('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    // if (selectedTour.length < 1) {
    // if (selectedTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid tour ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// open server

app.listen(PORT, '127.0.0.1', () => {
  console.log('Server online');
});
