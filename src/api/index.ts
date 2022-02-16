import { Order } from '../models';

export function fetchCategories() {
  return fetch(`${process.env.REACT_APP_API_URL}/categories`);
}

export function fetchTopSales() {
  return fetch(`${process.env.REACT_APP_API_URL}/top-sales`);
}

export function fetchProducts(params: {
  categoryId?: number;
  q?: string;
  offset?: number;
}) {
  const queryParams = [];
  if (params.categoryId) {
    queryParams.push(`categoryId=${params.categoryId}`);
  }
  if (params.q) {
    queryParams.push(`q=${params.q}`);
  }
  if (params.offset) {
    queryParams.push(`offset=${params.offset}`);
  }

  let queryString = '';
  if (queryParams.length > 0) {
    queryString = '?' + queryParams.join('&');
  }

  return fetch(`${process.env.REACT_APP_API_URL}/items${queryString}`);
}

export function fetchProduct(id: number) {
  return fetch(`${process.env.REACT_APP_API_URL}/items/${id}`);
}

export function postOrder(order: Order) {
  return fetch(`${process.env.REACT_APP_API_URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
}
