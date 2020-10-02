import express from 'express';
import Product from '../models/productModel';
import { getToken, isAdmin, isAuth } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

router.post('/createProduct', isAuth, isAdmin, async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const brand = req.body.brand;
  const category = req.body.category;
  const countInStock = req.body.countInStock;
  const description = req.body.description;
  const rating = req.body.rating;
  const numReviews = req.body.numReviews;

  const product = new Product({
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    rating,
    numReviews,
  });

  const newProduct = await product.save();
  if (newProduct) {
    return res.status(201).send({ msg: 'new product added', data: newProduct });
  }
  return res.status(500).send({ msg: 'error in creating product' });
});

router.put('/editProduct/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const brand = req.body.brand;
  const category = req.body.category;
  const countInStock = req.body.countInStock;
  const description = req.body.description;

  const product = await Product.findById(productId);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ msg: 'product updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ msg: 'error in updating product' });
});

router.delete('/deleteProduct/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

export default router;
