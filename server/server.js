import express from 'express';
import data from './data';

const app = express();

app.get('/api/products', (req, res, next) => {
  res.send(data.products);
});

app.listen(8000, () => {
  console.log('Server started 🚀 at http://localhost:8000');
});
