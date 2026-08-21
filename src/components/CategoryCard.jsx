import {
  useNavigate,
} from "react-router-dom";

import "./CategoryCard.css";

function CategoryCard({
  category,
}) {
  const navigate =
    useNavigate();

  const handleClick =
    () => {
      navigate(
        `/search?q=${encodeURIComponent(
          category.searchQuery
        )}&page=1`
      );
    };

  return (
    <button
      type="button"
      className="category-card"
      onClick={
        handleClick
      }
    >

      <span className="category-card__icon">
        {category.icon}
      </span>

      <div>
        <h3>
          {category.name}
        </h3>

        <p>
          {category.description}
        </p>
      </div>

      <span className="category-card__arrow">
        →
      </span>

    </button>
  );
}

export default CategoryCard;