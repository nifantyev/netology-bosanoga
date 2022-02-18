import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchTopSales } from '../reducers/topSalesReducer';
import { clearProducts, selectCategory } from '../reducers/productsReducer';
import Banner from '../components/Banner';
import TopSales from '../components/TopSales';
import Catalog from '../components/Catalog';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const topSalesLoadingStatus = useAppSelector(
    (store) => store.topSales.loadingStatus
  );
  const topSalesProducts = useAppSelector((store) => store.topSales.products);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(selectCategory(undefined));
      dispatch(clearProducts());
    };
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
            <Catalog />
          </section>
        </div>
      </div>
    </main>
  );
}
