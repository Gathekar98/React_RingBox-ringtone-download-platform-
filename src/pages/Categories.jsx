import CategoryCard
  from "../components/CategoryCard";

import "../components/CategoryGrid.css";

import {
  categories,
} from "../data/categories";

function Categories() {
  return (
    <>
      <title>
        Sound Categories | RingBox
      </title>

      <meta
        name="description"
        content="Browse RingBox sounds by categories including nature, retro, notifications, ambient, bells and more."
      />
      <section className="section">

        <div className="container">

          <h1 className="section-title">
            Browse Categories
          </h1>

          <p className="section-description">
            Explore sounds by mood,
            style and use case.
          </p>

          <div
            className="categories-grid"
            style={{
              marginTop:
                "36px",
            }}
          >

            {categories.map(
              (category) => (
                <CategoryCard
                  key={
                    category.id
                  }
                  category={
                    category
                  }
                />
              )
            )}

          </div>

        </div>

      </section>
    </>
    
  );
}

export default Categories;