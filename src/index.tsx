import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import HomePage from './pages/HomePage';
import reportWebVitals from './reportWebVitals';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="catalog.html" element={<CatalogPage />} />
            <Route path="catalog/:id.html" element={<ProductPage />} />
            <Route path="cart.html" element={<CartPage />} />
            <Route path="about.html" element={<AboutPage />} />
            <Route path="contacts.html" element={<ContactsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
