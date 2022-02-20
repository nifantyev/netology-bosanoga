import React from 'react';
import { Link } from 'react-router-dom';
import { OrderItem } from '../models';
import { removeItem } from '../reducers/cartReducer';
import { useAppDispatch, useAppSelector } from '../store';
import { formatCurrency } from '../utils';

const OrderLine = (props: {
  item: OrderItem;
  onRemove: (id: number, size: string) => void;
}) => {
  const { item, onRemove } = props;
  return (
    <tr>
      {/* eslint-disable-next-line jsx-a11y/scope */}
      <td scope="row">1</td>
      <td>
        <Link to={`/catalog/${item.id}.html`}>{item.title}</Link>
      </td>
      <td>{item.size}</td>
      <td>{item.count}</td>
      <td>{formatCurrency(item.price, 'ru-RU', 'RUB', 0, true)} руб.</td>
      <td>
        {formatCurrency(item.price * item.count, 'ru-RU', 'RUB', 0, true)} руб.
      </td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onRemove(item.id, item.size)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((store) => store.cart.items);
  const totalPrice = items.reduce((prev, o) => prev + o.price * o.count, 0);

  if (items.length === 0) {
    return <div>Корзина пуста</div>;
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {items.map((o) => (
          <OrderLine
            key={o.id}
            item={o}
            onRemove={(id: number, size: string) =>
              dispatch(removeItem({ id, size }))
            }
          />
        ))}
        <tr>
          <td colSpan={5} className="text-right">
            Общая стоимость
          </td>
          <td>{formatCurrency(totalPrice, 'ru-RU', 'RUB', 0, true)} руб.</td>
        </tr>
      </tbody>
    </table>
  );
}
