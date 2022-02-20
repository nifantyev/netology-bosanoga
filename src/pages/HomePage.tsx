import React, { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { fetchTopSales } from '../reducers/topSalesReducer';
import { clearProducts, selectCategory } from '../reducers/productsReducer';
import TopSales from '../components/TopSales';
import Catalog from '../components/Catalog';

export default function HomePage() {
  const dispatch = useAppDispatch();

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
    <>
      <TopSales />
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Catalog />
      </section>
    </>
  );
}
