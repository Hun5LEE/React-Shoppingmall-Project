import DetailsInfo from "../components/details/DetailsInfo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "./products";

function DetailsPage(): JSX.Element {
  const { categoryId, productId } = useParams();
  const [product, setProduct] = useState<any>([]);
  //
  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      try {
        const {
          data: { products },
        } = await axios.get(`http://localhost:4000/categories/${categoryId}`, {
          cancelToken: source.token,
        });
        setProduct(products[Number(productId)]);
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
      <DetailsInfo data={product} />
    </>
  );
}

export default DetailsPage;
