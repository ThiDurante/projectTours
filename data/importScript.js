import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Tour from '../models/tourModel.js';

dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connection OK');
});

// read file to import to database

const tours = JSON.parse(fs.readFileSync(`./data/tours.json`, 'utf-8'));
console.log(tours);

// importing

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// wipe collection

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// console.log(process.argv);
//this shows the command arguments, [0] os node location, [1] is the script location, [2] onwards we can set a flag for it

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
