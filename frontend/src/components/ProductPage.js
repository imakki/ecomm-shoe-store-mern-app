import React from 'react';
import { useParams } from 'react-router-dom';
const ProductPage = () => {
  let { id } = useParams();
  console.log(id);
  return <div>Product Page</div>;
};

export default ProductPage;
