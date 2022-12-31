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

// post routes

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  // Object.assign merges 2 objects and creates a new one
  const newTour = Object.assign({id: newId}, req.body);
  // pushes newTour to array of tours
  tours.push(newTour);
  // overwrites data file with new array of tours
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
// open server

app.listen(PORT, '127.0.0.1', () => {
  console.log('Server online');
});
