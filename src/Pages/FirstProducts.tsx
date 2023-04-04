import React from "react";
import { NavigateFunction } from "react-router-dom";
import { useState } from "react";
import "../ComponentsCss/FirstProducts.css";
import { Data } from "../App";

interface FirstProductsProps {
  navigate: NavigateFunction;
  productsData: Data[];
}

function FirstProducts({
  navigate,
  productsData,
}: FirstProductsProps): JSX.Element {
  const [shoes, setShoes] = useState(productsData);

  return (
    <div className="product_wrapper">
      <button
        onClick={() => {
          let copyShoes = [...shoes];
          copyShoes.sort((a, b) => {
            return a.price - b.price;
          });
          setShoes(copyShoes);
        }}
      >
        가격순 정렬
      </button>
      {/* shoes로 받아와야 가격순 정렬 했을때 변경됨. */}
      {shoes.map((shoe, i) => {
        return (
          <div className="product" key={i}>
            <img
              src={process.env.PUBLIC_URL + `${shoe.img}`}
              alt=""
              onClick={() => navigate(`/products1/details/${shoe.id}`)}
              // url파라미터와 useNavigate 활용
              // 변경된 shoes배열의 순서의 id로 페이지 넘버를 정함 -> details 페이지에서 변경된 product클릭시 그 product를 보여줌
            />
            <h4>{shoes[i].title}</h4>
            <br />
            <p>{shoes[i].price} ₩</p>
          </div>
        );
      })}
    </div>
  );
}

export default FirstProducts;
