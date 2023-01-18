import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'], // validator: first is if it is required or not, second is the error that is going to show us
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Tour must have a group size'],
  },
  difficulty: {
    type: String,
    trim: true,
    required: [true, 'Tour must have a difficulty'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5, // sets a default if no value is provided
  },
  ratingQuantity: {
    type: Number,
    default: 0, // sets a default if no value is provided
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'Tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Tour must have cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(), // date.now gives the timestamp in miliseconds, mongo converts it automatically to normal date
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema); // can pass a third argument to determine collection name on DB, if no values is passed, mongoose will rename to plural (if there is none created)

export default Tour;
