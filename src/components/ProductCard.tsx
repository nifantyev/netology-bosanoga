import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils';

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  addClassNames?: string;
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
