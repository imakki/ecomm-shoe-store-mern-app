import React from 'react';
import { useParams } from 'react-router-dom';

const OrderPage = () => {
  let { id } = useParams();
  return <div>Order placed id: {id}</div>;
};

export default OrderPage;
