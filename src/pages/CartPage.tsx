import React from 'react';
import Cart from '../components/Cart';
import OrderForm from '../components/OrderForm';

export default function CartPage() {
  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <Cart />
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <OrderForm />
      </section>
    </>
  );
}
