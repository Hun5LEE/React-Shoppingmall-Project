import { Product } from "../../pages/products";

// export interface productItems {}
// productItems[];
interface ProductListProps {
  data: Product;
}

const ProductItem = ({ data: productItem }: ProductListProps) => {
  return (
    <>
      <div>
        <span>{productItem.title}</span>
        <img src={productItem.imgUrl} alt="" width={200} height={200} />
      </div>
    </>
  );
};
export default ProductItem;
