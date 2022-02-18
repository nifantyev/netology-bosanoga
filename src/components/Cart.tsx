import React from 'react';
import { Link } from 'react-router-dom';
import { OrderItem } from '../models';
import { formatCurrency } from '../utils';

interface CartProps {
  items: OrderItem[];
}

const OrderLine = (props: { item: OrderItem }) => {
  const { item } = props;
  return (
    <tr>
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
        <button className="btn btn-outline-danger btn-sm">Удалить</button>
      </td>
    </tr>
  );
};

export default function Cart(props: CartProps) {
  const { items } = props;
  const totalPrice = items.reduce((prev, o) => prev + o.price * o.count, 0);

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
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
            <OrderLine key={o.id} item={o} />
          ))}
          <tr>
            <td colSpan={5} className="text-right">
              Общая стоимость
            </td>
            <td>{formatCurrency(totalPrice, 'ru-RU', 'RUB', 0, true)} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
