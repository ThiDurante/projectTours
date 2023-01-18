import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'], // validator: first is if it is required or not, second is the error that is going to show us
    unique: true,
  },
  description: String,
  rating: {
    type: Number,
    default: 4.5, // sets a default if no value is provided
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema); // can pass a third argument to determine collection name on DB, if no values is passed, mongoose will rename to plural (if there is none created)

export default Tour;
