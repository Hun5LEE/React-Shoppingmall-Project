import "./CategoryItem.css";
import { Link } from "react-router-dom";
import { categoryData } from "./CategoryList";

interface CategoryItemProps {
  data: categoryData;
}

function CategoryItem({ data: category }: CategoryItemProps): JSX.Element {
  const { id, title, description, imgUrl } = category;

  return (
    <Link to={`categories/products/${id}`}>
      <div className="category_wrapper">
        <div className="category_img">
          <img src={imgUrl} alt="" />
        </div>
        <div className="category_info">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default CategoryItem;
