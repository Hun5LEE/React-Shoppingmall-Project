import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/productItem/ProductItem";

export interface Product {
  id: number;
  title: string;
  content: string;
  price: number;
  imgUrl: string;
  count: number;
  stocks: number;
}

function ProductsPage() {
  // 페이지의 url파라미터를 id에 할당
  const { id } = useParams();
  const [productList, setProductList] = useState([]);

  // categories의 products 부분을 받아옴
  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        // 페이지 Num에 해당하는 카테고리의 배열요소가 넘어온다
        // ->
        const {
          data: { products },
        } = await axios.get(`http://localhost:4000/categories/${id}`, {
          cancelToken: source.token,
        });
        setProductList(products);
      } catch (error) {
        alert("실패");
      }
    })();
    return () => {
      // 랜더링시 이전요청 삭제해줌. (불필요한 요청누적 방지)
      source.cancel("랜더링시 이전요청 삭제");
    };
  }, []);

  return (
    <>
      {productList?.map((productItem: Product) => {
        return <ProductItem data={productItem} key={productItem.id} />;
      })}
    </>
  );
}

export default ProductsPage;
