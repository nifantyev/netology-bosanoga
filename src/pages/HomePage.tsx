import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchTopSales } from '../reducers/topSalesReducer';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import TopSales from '../components/TopSales';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const topSalesLoadingStatus = useAppSelector(
    (store) => store.topSales.loadingStatus
  );
  const topSalesProducts = useAppSelector((store) => store.topSales.products);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <TopSales
            products={topSalesProducts}
            isLoading={topSalesLoadingStatus === 'pending'}
            isError={topSalesLoadingStatus === 'error'}
          />
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <ul className="catalog-categories nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link active" href="#/">
                  Все
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Женская обувь
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Мужская обувь
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Обувь унисекс
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Детская обувь
                </a>
              </li>
            </ul>
            <div className="row">
              <div className="col-4">
                <ProductCard
                  id={1}
                  title="Босоножки 'MYER'"
                  image="./img/products/sandals_myer.jpg"
                  price={34000}
                  addClassNames="catalog-item-card"
                />
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img
                    src="./img/products/sandals_keira.jpg"
                    className="card-img-top img-fluid"
                    alt="Босоножки 'Keira'"
                  />
                  <div className="card-body">
                    <p className="card-text">Босоножки 'Keira'</p>
                    <p className="card-text">7 600 руб.</p>
                    <a
                      href="/products/1.html"
                      className="btn btn-outline-primary"
                    >
                      Заказать
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img
                    src="./img/products/superhero_sneakers.jpg"
                    className="card-img-top img-fluid"
                    alt="Супергеройские кеды"
                  />
                  <div className="card-body">
                    <p className="card-text">Супергеройские кеды</p>
                    <p className="card-text">1 400 руб.</p>
                    <a
                      href="/products/1.html"
                      className="btn btn-outline-primary"
                    >
                      Заказать
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img
                    src="./img/products/sandals_myer.jpg"
                    className="card-img-top img-fluid"
                    alt="Босоножки 'MYER'"
                  />
                  <div className="card-body">
                    <p className="card-text">Босоножки 'MYER'</p>
                    <p className="card-text">34 000 руб.</p>
                    <a
                      href="/products/1.html"
                      className="btn btn-outline-primary"
                    >
                      Заказать
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img
                    src="./img/products/sandals_keira.jpg"
                    className="card-img-top img-fluid"
                    alt="Босоножки 'Keira'"
                  />
                  <div className="card-body">
                    <p className="card-text">Босоножки 'Keira'</p>
                    <p className="card-text">7 600 руб.</p>
                    <a
                      href="/products/1.html"
                      className="btn btn-outline-primary"
                    >
                      Заказать
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="card catalog-item-card">
                  <img
                    src="./img/products/superhero_sneakers.jpg"
                    className="card-img-top img-fluid"
                    alt="Супергеройские кеды"
                  />
                  <div className="card-body">
                    <p className="card-text">Супергеройские кеды</p>
                    <p className="card-text">1 400 руб.</p>
                    <a
                      href="/products/1.html"
                      className="btn btn-outline-primary"
                    >
                      Заказать
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-outline-primary">Загрузить ещё</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
