import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchProducts,
  clearProducts,
  selectCategory,
  setSearch,
} from '../reducers/productsReducer';
import Catalog from '../components/Catalog';

export default function CatalogPage() {
  const dispatch = useAppDispatch();

  const productsSearch = useAppSelector((store) => store.products.search);

  useEffect(() => {
    return () => {
      dispatch(selectCategory(undefined));
      dispatch(clearProducts());
      dispatch(setSearch(''));
    };
  }, [dispatch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(clearProducts());
    dispatch(fetchProducts());
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="Поиск"
          value={productsSearch}
          onChange={handleSearchChange}
        />
      </form>
      <Catalog />
    </section>
  );
}
