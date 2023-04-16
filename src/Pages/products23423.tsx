import React from "react";
import { NavigateFunction } from "react-router-dom";
import { useState, useEffect } from "react";
import "../PagesCss/Products.css";
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
  const [hidden, setHidden] = useState("");
  // 더보기 상품의 클릭횟수를 저장해서 누른만큼 상품을 3개씩 보여주도록 하기.
  const [btnCount, setBtnCount] = useState(0);
  // btnCount가 1로 바뀌고 실행하기 위해 useEffect사용
  // useEffect(() => {
  //   // axios.get("/Products/ShoeProducts.json").then() ==
  //   fetch("/Products/ShoeProducts.json")
  //     .then((data) => data.json())
  //     .then((result) => {
  //       const copyProducts = [...shoes];
  //       if (btnCount === 1) {
  //         setShoes(copyProducts.concat(result.slice(0, 3)));
  //       } else if (btnCount === 2) {
  //         setShoes(copyProducts.concat(result.slice(3, result.length)));
  //         setHidden("hidden");
  //       }
  //     })
  //     .catch(() => {
  //       alert("실패");
  //     });
  // }, [btnCount]);
  return (
    <>
      <button
        className="product_btn"
        onClick={() => {
          const copyShoes = [...shoes];
          copyShoes.sort((a, b) => {
            return a.price - b.price;
          });
          setShoes(copyShoes);
        }}
      >
        가격순 정렬
      </button>
      <div className="product_wrapper">
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
      {/* button 클릭시 public 폴더에 있는 json데이터 받아오기. */}
      <button
        className={`product_btn ${hidden}`}
        onClick={() => {
          setBtnCount(btnCount + 1);
        }}
      >
        상품 더보기
      </button>
    </>
  );
}

export default FirstProducts;
