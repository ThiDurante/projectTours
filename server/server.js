import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from '../app.js';

dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection OK');
});

const PORT = process.env.PORT || 3001;

// open server

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server online on port ${PORT}`);
});
// .then((con) => {
//   console.log(con.connections);
//   console.log('DB connection Successful');
// });

// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Tour must have a name'], // validator: first is if it is required or not, second is the error that is going to show us
//     unique: true,
//   },
//   description: String,
//   rating: {
//     type: Number,
//     default: 4.5, // sets a default if no value is provided
//   },
//   price: {
//     type: Number,
//     required: [true, 'Tour must have a price'],
//   },
// });

// const Tour = mongoose.model('Tour', tourSchema); // can pass a third argument to determine collection name on DB, if no values is passed, mongoose will rename to plural

// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 497,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error: ', err);
//   });

// console.log(app.get('env'));
// console.log(process.env);
// console.log(process.env.PORT);
// setting port
