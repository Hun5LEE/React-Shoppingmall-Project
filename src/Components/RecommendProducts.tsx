import "../ComponentsCss/RecommendProducts.css";
import { useMemo, useState, memo } from "react";
import { data } from "../Data/Data";
import { useNavigate } from "react-router-dom";
import { Data } from "../App";

// memo를 사용해서 상위 컴포넌트가 렌더링 될때 불필요한 렌더링을 막아서 추천상품을 보여주게함.
const RecommendProducts = memo(() => {
  const [productsList, setProductsList] = useState([...data]);
  const navigate = useNavigate();
  // useEffect 대신 useMemo를 사용하여 실행시점을 앞당겨 배열을 합침.
  useMemo(() => {
    fetch("/Products/ShoeProducts.json")
      .then((data) => data.json())
      .then((result) => {
        const copy = [...productsList, ...result];
        setProductsList(copy);
      })
      .catch(() => {
        alert("실패");
      });
  }, []);

  return (
    <div className="recommendproducts">
      <h3 style={{ marginBottom: "0.5rem" }}>추천 상품</h3>
      <div className="recommendproducts_wrapper">
        {/* 음수일경우 배열의 요소 순서를 바꾸지않고 양수면 순서바꿈 -> 랜덤하게 섞기 */}
        {productsList
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((item: Data, i: number) => {
            return (
              <div className="recommendproducts_info" key={i}>
                <div onClick={() => navigate(`/products1/details/${item.id}`)}>
                  <img
                    src={process.env.PUBLIC_URL + `${productsList[i].img}`}
                    alt=""
                  />
                </div>
                <p>{productsList[i].title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default RecommendProducts;
