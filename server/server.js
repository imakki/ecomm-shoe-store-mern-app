import express from 'express';
import data from './data';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
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
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

app.listen(8000, () => {
  console.log('Server started 🚀 at http://localhost:8000');
});
