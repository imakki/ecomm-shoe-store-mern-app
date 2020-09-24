import React from 'react';
import './App.css';
import data from './data';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import { Route, Switch } from 'react-router-dom';

function App() {
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
          <a href="index.html">Kicks</a>
        </div>
        <div className="header-links">
          <a href="cart">Cart</a>
          <a href="signin">SignIn</a>
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
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </div>
      </main>
      <footer className="footer">All rights reserved.</footer>
    </div>
  );
}

export default App;
