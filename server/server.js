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
// .then((con) => {
//   console.log(con.connections);
//   console.log('DB connection Successful');
// });

// console.log(app.get('env'));
// console.log(process.env);
// console.log(process.env.PORT);
// setting port
const PORT = process.env.PORT || 3001;

// open server

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server online on port ${PORT}`);
});
