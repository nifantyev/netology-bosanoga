import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import {
  clearProducts,
  fetchProducts,
  selectCategory,
  setSearch,
} from '../reducers/productsReducer';
import logo from '../img/header-logo.png';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((store) => store.cart.items);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const search = () => {
    dispatch(setSearch(searchText));
    setSearchText('');
    setSearchVisible(false);
    if (location.pathname !== '/catalog.html') {
      navigate('/catalog.html');
    } else {
      dispatch(selectCategory(undefined));
      dispatch(clearProducts());
      dispatch(fetchProducts());
    }
  };

  const handleSearchClick = () => {
    if (!searchText) {
      setSearchVisible((prev) => !prev);
    } else {
      search();
    }
  };

  const handleCartClick = () => {
    navigate('/cart.html');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search();
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/catalog.html"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/about.html"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contacts.html"
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={handleSearchClick}
                  ></div>
                  <div
                    className="header-controls-pic header-controls-cart"
                    onClick={handleCartClick}
                  >
                    {cartItems.length > 0 && (
                      <div className="header-controls-cart-full">
                        {cartItems.length}
                      </div>
                    )}
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${
                    !searchVisible ? 'invisible' : ''
                  }`}
                  onSubmit={handleSubmit}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
