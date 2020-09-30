import express from 'express';
import data from './data';
import userRoute from './routes/userRoute';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
var cors = require('cors');

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected Database🚀'))
  .catch((error) => handleError(error));

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoute);

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
