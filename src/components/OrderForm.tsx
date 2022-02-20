import React, { FormEvent } from 'react';
import {
  postOrder,
  setAddress,
  setAgreement,
  setPhone,
} from '../reducers/cartReducer';
import { useAppDispatch, useAppSelector } from '../store';
import ErrorMessage from './ErrorMessage';
import LoadingIndicator from './LoadingIndicator';

export default function OrderForm() {
  const dispatch = useAppDispatch();

  const items = useAppSelector((store) => store.cart.items);
  const address = useAppSelector((store) => store.cart.address);
  const phone = useAppSelector((store) => store.cart.phone);
  const agreement = useAppSelector((store) => store.cart.agreement);
  const postingStatus = useAppSelector((store) => store.cart.postingStatus);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(postOrder());
  };

  if (postingStatus === 'success') {
    return (
      <div className="alert alert-success">Заказ был успешно отправлен!</div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
      {postingStatus === 'error' && (
        <ErrorMessage
          message="Ошибка при отправке заказа!"
          onRetry={() => dispatch(postOrder())}
        />
      )}
      {postingStatus === 'pending' && <LoadingIndicator />}
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            className="form-control"
            id="phone"
            placeholder="Ваш телефон"
            value={phone}
            onChange={(event) => dispatch(setPhone(event.target.value))}
            disabled={postingStatus === 'pending'}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Адрес доставки</label>
          <input
            className="form-control"
            id="address"
            placeholder="Адрес доставки"
            value={address}
            onChange={(event) => dispatch(setAddress(event.target.value))}
            disabled={postingStatus === 'pending'}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreement"
            checked={agreement}
            onChange={(event) => dispatch(setAgreement(event.target.checked))}
            disabled={postingStatus === 'pending'}
          />
          <label className="form-check-label" htmlFor="agreement">
            Согласен с правилами доставки
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-outline-secondary"
          disabled={
            !agreement || items.length === 0 || postingStatus === 'pending'
          }
        >
          Оформить
        </button>
      </form>
    </div>
  );
}
