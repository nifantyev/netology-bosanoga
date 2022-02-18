import { Category } from '../models';

interface CategoriesProps {
  categories: Category[];
  selectedCategoryId?: number;
  onSelect: (id?: number) => void;
}

export default function Categories(props: CategoriesProps) {
  const { categories, selectedCategoryId, onSelect } = props;
  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a
          className={`nav-link ${!selectedCategoryId && 'active'}`}
          href="#/"
          onClick={(event) => {
            event.preventDefault();
            onSelect(undefined);
          }}
        >
          Все
        </a>
      </li>
      {categories.map((o) => (
        <li className="nav-item" key={o.id}>
          <a
            className={`nav-link ${selectedCategoryId === o.id && 'active'}`}
            href="#/"
            onClick={(event) => {
              event.preventDefault();
              onSelect(o.id);
            }}
          >
            {o.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
