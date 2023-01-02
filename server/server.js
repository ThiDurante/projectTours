import app from '../app.js';

// setting port
const PORT = process.env.PORT || 3001;

// open server

app.listen(PORT, '127.0.0.1', () => {
  console.log('Server online');
});
