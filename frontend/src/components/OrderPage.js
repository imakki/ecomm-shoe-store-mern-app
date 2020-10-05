import React, { useEffect } from 'react';
import { useHistory, useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder } from '../actions/orderActions';

const OrderPage = () => {
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(id));
  }, []);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  console.log(orderDetails);

  const payHandler = () => {};

  return loading ? (
    <div>Loading....</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    //<div>{orderDetails?.order?.itemsPrice}</div>
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {order?.shipping?.address}, {order?.shipping?.city},
              {order?.shipping?.postalCode}
              {order?.shipping?.country}
            </div>
            <h3>Delivery Status</h3>
            <div>
              {order?.isDelivered
                ? 'Delivered at ' + order.deliveredAt
                : 'Not Delivered!'}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {order?.payment.paymentMethod}</div>
            <h3>Payment Status</h3>
            <div>{order?.isPaid ? 'Paid at ' + order.paidAt : 'Not Paid.'}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping cart</h3>
                <div>Price</div>
              </li>
              {order?.orderItems?.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                order?.orderItems?.map((item) => (
                  <li key={item.product}>
                    <div className="cart-image">
                      <img src={item.image} />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div>Qty: {item.quantity}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button button-primary full-width"
                onClick={payHandler}
              >
                Pay Now
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${order?.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order?.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order?.taxPrice}</div>
            </li>
            <li>
              <div>Total</div>
              <div>${order?.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
