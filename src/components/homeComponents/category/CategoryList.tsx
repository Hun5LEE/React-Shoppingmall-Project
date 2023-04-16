import CategoryItem from "./CategoryItem";

export interface categoryData {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

interface CategoryListProps {
  data?: categoryData[];
}

// 그려주는 페이지
function CategoryList({ data: categories }: CategoryListProps): JSX.Element {
  return (
    <>
      {categories?.map((category) => (
        <CategoryItem data={category} key={category.id} />
      ))}
    </>
  );
}

export default CategoryList;
