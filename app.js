import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3001;

const tours = JSON.parse(fs.readFileSync('./data/tours.json'));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log('Server online');
});
