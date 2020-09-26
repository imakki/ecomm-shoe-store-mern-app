import express from 'express';
import data from './data';

const app = express();

app.get('/api/products/:id', (req, res, next) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.send(404).send({ message: 'product not found' });
  }
});

app.get('/api/products', (req, res, next) => {
  res.send(data.products);
});

app.listen(8000, () => {
  console.log('Server started 🚀 at http://localhost:8000');
});
