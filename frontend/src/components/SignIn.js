import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, userInfo, error } = userSignIn;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [userInfo]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div className="form">
      <form onSubmit={handleFormSubmit}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button button-primary">
              SignIn
            </button>
          </li>
          <li>New to kicks?</li>
          <li>
            <Link to="/register" className="button secondary text-center">
              Create new Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SignIn;
