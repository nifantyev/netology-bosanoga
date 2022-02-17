import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  addClassNames?: string;
}

function getCurrencySymbol(locale: string, currency: string) {
  return (0)
    .toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, '')
    .trim();
}

function formatCurrency(
  amount: number,
  locale: string,
  currency: string,
  fractionDigits: number,
  removeSymbol: boolean
) {
  let result = amount
    .toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })
    .trim();
  if (removeSymbol) {
    result = result.replace(getCurrencySymbol(locale, currency), '');
  }
  return result.trim();
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className={`card ${props.addClassNames || ''}`}>
      <img
        src={props.image}
        className="card-img-top img-fluid"
        alt={props.title}
      />
      <div className="card-body">
        <p className="card-text">{props.title}</p>
        <p className="card-text">
          {formatCurrency(props.price, 'ru-RU', 'RUB', 0, true)} руб.
        </p>
        <Link
          to={`/catalog/${props.id}.html`}
          className="btn btn-outline-primary"
        >
          Заказать
        </Link>
      </div>
    </div>
  );
}
