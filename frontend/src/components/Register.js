import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setrePassword] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
    }
  }, [userInfo]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password === rePassword) {
      dispatch(register(username, email, password, rePassword));
    } else {
      alert('passwords do not match');
    }
  };
  return (
    <div className="form">
      <form onSubmit={handleFormSubmit}>
        <ul className="form-container">
          <li>
            <h2>Register</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{userInfo.msg}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setUserName(e.target.value)}
            />
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
            <label htmlFor="repassword">Re-enter Password</label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              onChange={(e) => setrePassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button button-primary">
              Register
            </button>
          </li>
          <li>Already have an account?</li>
          <li>
            <Link to="/signin" className="button secondary text-center">
              Signin
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Register;
