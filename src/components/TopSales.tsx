import { Product } from '../models';
import ProductCard from './ProductCard';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

interface TopSalesProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

export default function TopSales(props: TopSalesProps) {
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {props.isLoading && <LoadingIndicator />}
      {props.isError && (
        <ErrorMessage message="Ошибка при загрузке хитов продаж" />
      )}
      {props.products.length > 0 && (
        <div className="row">
          {props.products.map((o) => (
            <div className="col-4" key={o.id}>
              <ProductCard
                key={o.id}
                id={o.id}
                title={o.title}
                image={o.images[0]}
                price={o.price}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
