// import fs from 'fs';
import Tour from '../models/tourModel.js';

export const aliasTop5Cheap = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fiels = 'name,price,ratingAverage,difficulty,summary';
  next();
};

export const getAllTours = async (req, res) => {
  try {
    // console.log(req.query);s

    // advanced filtering
    const queryStr = JSON.stringify(req.query);
    const replacedStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    // console.log(JSON.parse(replacedStr));
    // { duration: { $gte: 5 } } // manually writing the query in mongoDB

    // build the query first before awaiting for it
    let query = Tour.find(JSON.parse(replacedStr)); // find return array of documents in collection and convert documents into objects

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('name');
    }

    // limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields); //expects a string with field names
    } else {
      query = query.select('-__v');
    }

    // pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numberOfTours = await Tour.countDocuments();
      if (skip > numberOfTours) throw new Error(`Page doesn't exist`);
    }

    // after all methods are applied we fire the query to the DB
    const tours = await query;
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals(5)

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const createTour = async (req, res) => {
  try {
    // const newTour = new Tour({...})
    //newTour.save()

    const newTour = await Tour.create(req.body); //no need to use save method this way .create returns a promise

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); // shorthand for findOne
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //this options returns the updated one
      runValidators: true,
    }); // 3 arguments, what to find, what to change and options

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

// ! old tour

// reading json file for now, will use mongoDB later
// const tours = JSON.parse(fs.readFileSync('./data/tours.json'));

// export const checkID = (req, res, next, val) => {
//   if (+req.params.id > tours.length) {
//     // if (selectedTour.length < 1) {
//     // if (selectedTour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid tour ID',
//     });
//   }
//   next();
// };

// export const checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

// export const getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     timeOfRequest: req.requestTime,
//     data: {
//       tours,
//     },
//   });
// };

// export const getTour = (req, res) => {
//   // console.log(req.params);

//   const selectedTour = tours.filter((tour) => tour.id === +req.params.id);

//   res.status(200).json({
//     status: 'success',
//     results: 1,
//     data: {
//       selectedTour,
//     },
//   });
// };

// export const newTour = (req, res) => {
//   // console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   // Object.assign merges 2 objects and creates a new one
//   // eslint-disable-next-line prefer-object-spread
//   const Tour = Object.assign({ id: newId }, req.body);
//   // pushes newTour to array of tours
//   tours.push(Tour);
//   // overwrites data file with new array of tours - needs to be async because its in the event loop
//   fs.writeFile('./data/tours.json', JSON.stringify(tours), () => {
//     // after done, sends data to client
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   });

//   // res.send('Done');
// };

// export const updateTour = (req, res) => {
//   // this will be implemented when we use mongoDB, for now just a simple response
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: 'Updated tour goes here',
//     },
//   });
// };

// export const deleteTour = (req, res) => {
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };
