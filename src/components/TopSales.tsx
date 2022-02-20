import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchTopSales } from '../reducers/topSalesReducer';
import ProductCard from './ProductCard';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

export default function TopSales() {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector((store) => store.topSales.loadingStatus);
  const products = useAppSelector((store) => store.topSales.products);

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loadingStatus === 'pending' && <LoadingIndicator />}
      {loadingStatus === 'error' && (
        <ErrorMessage
          message="Ошибка при загрузке хитов продаж"
          onRetry={() => dispatch(fetchTopSales())}
        />
      )}
      {loadingStatus === 'success' && products.length > 0 && (
        <div className="row">
          {products.map((o) => (
            <div className="col-4" key={o.id}>
              <ProductCard
                key={o.id}
                id={o.id}
                title={o.title}
                image={o.images[0]}
                price={o.price}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
