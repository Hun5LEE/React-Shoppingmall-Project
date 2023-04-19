import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/products/ProductItem";
import "../pagesCss/products.css";

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
  const { categoryId } = useParams();
  const [productList, setProductList] = useState([]);
  const [count, setCount] = useState(3);

  // Handler
  // 가격순 정렬
  const handleSort = () => {
    const copyProductList = [...productList];
    copyProductList.sort((a: Product, b: Product) => {
      return a.price - b.price;
    });
    setProductList(copyProductList);
  };
  // 상품 더보기
  // 3개씩 보여주면서 배열의 길이보다 작으면 반환 X
  const handleMoreProducts = () => {
    if (count < productList.length) {
      setCount(count + 3);
    }
  };

  // useEffect
  // categories의 products 부분을 받아옴
  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        // 페이지 Num에 해당하는 카테고리의 배열요소가 넘어온다
        // ->
        const {
          data: { products },
        } = await axios.get(`http://localhost:4000/categories/${categoryId}`, {
          cancelToken: source.token,
        });
        setProductList(products);
      } catch (err) {
        alert("실패");
        console.log(err);
      }
    })();
    return () => {
      // 랜더링시 이전요청 삭제해줌. (불필요한 요청누적 방지)
      source.cancel("랜더링시 이전요청 삭제");
    };
  }, []);

  return (
    <>
      <div className="products_wrapper">
        <button onClick={() => handleSort()}>낮은 가격순</button>
        {/* 3개씩 보여줌, 더보기 클릭시 count 증가 -> 상품 목록 더 보여줌*/}
        {productList?.slice(0, count).map((productItem: Product) => {
          return <ProductItem data={productItem} key={productItem.id} />;
        })}
        <button
          className={`${count < productList.length ? "" : "hidden"}`}
          onClick={() => handleMoreProducts()}
        >
          상품 더보기
        </button>
      </div>
    </>
  );
}

export default ProductsPage;
