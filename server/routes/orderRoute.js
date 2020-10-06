import express from 'express';
import Order from '../models/orderModel';
import { isAuth } from '../util';

const router = express.Router();

router.get('/:id', isAuth, async (req, res) => {
  //console.log(req.params.id);
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
});

router.post('/createOrder', isAuth, async (req, res) => {
  const orderItems = req.body.orderItems;
  const user = req.user._id;
  const shipping = req.body.shipping;
  const payment = req.body.payment;
  const itemsPrice = req.body.itemsPrice;
  const taxPrice = req.body.taxPrice;
  const shippingPrice = req.body.shippingPrice;
  const totalPrice = req.body.totalPrice;
  const newOrder = new Order({
    orderItems,
    user,
    shipping,
    payment,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const createNewOrder = await newOrder.save();
  if (createNewOrder) {
    res.status(201).send({ message: 'New Order Placed', data: createNewOrder });
  } else {
    res.send({ message: 'could not create order!' });
  }
});

router.put('/:id/pay', isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerId: req.body.payerId,
        orderId: req.body.orderId,
        paymentId: req.body.paymentId,
      },
    };
    const updateOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updateOrder });
  } else {
    res.status(404).send({ message: 'Order not found!' });
  }
});

export default router;
