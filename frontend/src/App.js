import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import NotFound from './components/NotFound';
import { Route, Switch, Link } from 'react-router-dom';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import { useSelector } from 'react-redux';
import Register from './components/Register';
import CreateProduct from './components/CreateProduct';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
import PlaceOrder from './components/PlaceOrder';
import OrderPage from './components/OrderPage';
import Profile from './components/Profile';
import OrdersPage from './components/OrdersPage';

function App() {
  const userLoggedIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userLoggedIn;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <Link to="/">Kicks</Link>
        </div>
        <div className="header-links">
          <a href="cart">Cart</a>
          {userInfo ? (
            <Link to="/profile">{userInfo.name}</Link>
          ) : (
            <Link to="/signin">SignIn</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <a href="#">Admin</a>
              <ul className="dropdown-content">
                <li>
                  <Link to="/orders">Orders</Link>
                  <Link to="/products">Products</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className="sidebar">
        <h3>Shopping categories</h3>
        <button className="sidebar-close-btn" onClick={closeMenu}>
          x
        </button>
        <ul>
          <li>
            <a href="index.html">Sneakers</a>
          </li>
          <li>
            <a href="index.html">Sports</a>
          </li>
        </ul>
      </aside>
      <main className="main">
        <div className="content">
          <Switch>
            <Route path="/orders" component={OrdersPage} />
            <Route path="/profile" component={Profile} />
            <Route path="/order/:id" component={OrderPage} />
            <Route path="/createProduct" component={CreateProduct} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/" exact component={HomePage} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </main>
      <footer className="footer">All rights reserved.</footer>
    </div>
  );
}

export default App;
