import React, { useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { fetchCategories } from '../reducers/categoriesReducer';
import {
  clearProducts,
  fetchProducts,
  selectCategory,
} from '../reducers/productsReducer';
import LoadingIndicator from './LoadingIndicator';
import Categories from './Categories';
import ProductCard from './ProductCard';
import ErrorMessage from './ErrorMessage';

export default function Catalog() {
  const dispatch = useAppDispatch();

  const categoriesLoadingStatus = useAppSelector(
    (store) => store.categories.loadingStatus
  );
  const categories = useAppSelector((store) => store.categories.categories);

  const productsLoadingStatus = useAppSelector(
    (store) => store.products.loadingStatus
  );
  const selectedCategoryId = useAppSelector(
    (store) => store.products.selectedCategoryId
  );
  const products = useAppSelector((store) => store.products.products);
  const hasMoreProducts = useAppSelector((store) => store.products.hasMore);
  const productsOffset = useAppSelector((store) => store.products.offset);
  const search = useAppSelector((store) => store.products.search);

  const initialFetch = useCallback(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  const handleSelectCategory = (id?: number) => {
    dispatch(selectCategory(id));
    dispatch(clearProducts());
    dispatch(fetchProducts());
  };

  const handleLoadMore = () => {
    dispatch(fetchProducts());
  };

  return (
    <>
      {(categoriesLoadingStatus === 'error' ||
        productsLoadingStatus === 'error') &&
        productsOffset === 0 && (
          <ErrorMessage message="Ошибка при загрузке" onRetry={initialFetch} />
        )}
      {categoriesLoadingStatus === 'success' && categories.length > 0 && (
        <Categories
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={handleSelectCategory}
        />
      )}
      {(categoriesLoadingStatus === 'pending' ||
        productsLoadingStatus === 'pending') &&
        productsOffset === 0 && <LoadingIndicator />}
      {products.length > 0 && (
        <div className="row">
          {products.map((o) => (
            <div className="col-4" key={o.id}>
              <ProductCard
                id={o.id}
                title={o.title}
                image={o.images[0]}
                price={o.price}
                addClassNames="catalog-item-card"
              />
            </div>
          ))}
        </div>
      )}
      {productsLoadingStatus === 'success' &&
        products.length === 0 &&
        search && <div>Поиск не дал результатов</div>}
      {productsLoadingStatus === 'pending' && productsOffset > 0 && (
        <LoadingIndicator />
      )}
      {(categoriesLoadingStatus === 'error' ||
        productsLoadingStatus === 'error') &&
        productsOffset > 0 && (
          <ErrorMessage message="Ошибка при загрузке" onRetry={initialFetch} />
        )}
      {hasMoreProducts && (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            onClick={handleLoadMore}
            disabled={productsLoadingStatus === 'pending'}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </>
  );
}
