import fs from 'fs';

// reading json file for now, will use mongoDB later
const tours = JSON.parse(fs.readFileSync('./data/tours.json'));

export const checkID = (req, res, next, val) => {
  if (+req.params.id > tours.length) {
    // if (selectedTour.length < 1) {
    // if (selectedTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid tour ID',
    });
  }
  next();
};

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

export const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    timeOfRequest: req.requestTime,
    data: {
      tours,
    },
  });
};

export const getTour = (req, res) => {
  // console.log(req.params);

  const selectedTour = tours.filter((tour) => tour.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      selectedTour,
    },
  });
};

export const newTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  // Object.assign merges 2 objects and creates a new one
  // eslint-disable-next-line prefer-object-spread
  const Tour = Object.assign({ id: newId }, req.body);
  // pushes newTour to array of tours
  tours.push(Tour);
  // overwrites data file with new array of tours - needs to be async because its in the event loop
  fs.writeFile('./data/tours.json', JSON.stringify(tours), () => {
    // after done, sends data to client
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });

  // res.send('Done');
};

export const updateTour = (req, res) => {
  // this will be implemented when we use mongoDB, for now just a simple response
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour goes here',
    },
  });
};

export const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
