import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../wizard/CheckoutSteps';

const Payment = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    if (paymentMethod) {
      history.push('/placeorder');
    } else {
      alert('please select a payment method');
    }
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className="form">
        <form onSubmit={handleFormSubmit}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
            </li>

            <li>
              <button type="submit" className="button button-primary">
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Payment;
