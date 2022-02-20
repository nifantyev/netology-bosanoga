import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import { useAppDispatch, useAppSelector } from '../store';
import {
  increaseCount,
  decreaseCount,
  selectSize,
  fetchProduct,
  setCount,
} from '../reducers/productReducer';
import { addItem } from '../reducers/cartReducer';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const product = useAppSelector((store) => store.product.product);
  const loadingStatus = useAppSelector((store) => store.product.loadingStatus);
  const selectedSize = useAppSelector((store) => store.product.selectedSize);
  const count = useAppSelector((store) => store.product.count);

  useEffect(() => {
    dispatch(fetchProduct(Number(id)));
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(selectSize(undefined));
      dispatch(setCount(1));
    };
  }, [dispatch]);

  const handleSizeClick = (size: string) => {
    dispatch(selectSize(size));
  };

  const handleIncreaseClick = () => {
    dispatch(increaseCount());
  };

  const handleDecreaseClick = () => {
    dispatch(decreaseCount());
  };

  const handleAddToCart = () => {
    if (product && selectedSize) {
      dispatch(
        addItem({
          id: product.id,
          title: product?.title,
          size: selectedSize,
          count: count,
          price: product.price,
        })
      );
      navigate('/cart.html');
    }
  };

  return (
    <section className="catalog-item">
      {loadingStatus === 'pending' && <LoadingIndicator />}
      {loadingStatus === 'error' && (
        <ErrorMessage message="Произошла ошибка при загрузке" />
      )}
      {loadingStatus === 'success' && product && (
        <>
          <h2 className="text-center">{product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={product.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  {product.sku && (
                    <tr>
                      <td>Артикул</td>
                      <td>{product.sku}</td>
                    </tr>
                  )}
                  {product.manufacturer && (
                    <tr>
                      <td>Производитель</td>
                      <td>{product.manufacturer}</td>
                    </tr>
                  )}
                  {product.color && (
                    <tr>
                      <td>Цвет</td>
                      <td>{product.color}</td>
                    </tr>
                  )}
                  {product.material && (
                    <tr>
                      <td>Материалы</td>
                      <td>{product.material}</td>
                    </tr>
                  )}
                  {product.season && (
                    <tr>
                      <td>Сезон</td>
                      <td>{product.season}</td>
                    </tr>
                  )}
                  {product.reason && (
                    <tr>
                      <td>Повод</td>
                      <td>{product.reason}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {product.sizes.some((o) => o.avalible) && (
                <>
                  <div className="text-center">
                    <p>
                      Размеры в наличии:{' '}
                      {product.sizes
                        .filter((o) => o.avalible)
                        .map((o) => (
                          <span
                            className={`catalog-item-size ${
                              o.size === selectedSize ? 'selected' : ''
                            }`}
                            key={o.size}
                            onClick={() => handleSizeClick(o.size)}
                          >
                            {o.size}
                          </span>
                        ))}
                    </p>
                    <p>
                      Количество:
                      <span className="btn-group btn-group-sm pl-2">
                        <button
                          className="btn btn-secondary"
                          onClick={handleDecreaseClick}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-primary">{count}</span>
                        <button
                          className="btn btn-secondary"
                          onClick={handleIncreaseClick}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  </div>
                  <button
                    className="btn btn-danger btn-block btn-lg"
                    disabled={!selectedSize}
                    onClick={handleAddToCart}
                  >
                    В корзину
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
