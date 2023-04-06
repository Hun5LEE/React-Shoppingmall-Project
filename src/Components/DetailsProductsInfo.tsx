import React from "react";
import { useState, useEffect } from "react";
import { Data } from "../App";

// 더보기 상품들 디테일 페이지로 들어갔을때 새로고침하면 상품정보 부분을
// 비동기적으로 처리했기 때문에 값을 읽어올수 없음 -> 따로 컴포넌트로 빼서 HTML이 읽힐때 읽어오게함.
// productsList가 3보다 커야 읽힘.

interface DetailsProductsInfo {
  productsData: Data[];
  id: string | undefined;
}

function DetailsProductsInfo({
  productsData,
  id,
}: DetailsProductsInfo): JSX.Element {
  const [productsList, setProductsList] = useState(productsData);

  useEffect(() => {
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
  if (productsList.length > 3) {
    return (
      <>
        <h3>{productsList[Number(id)].title}</h3>
        <p>{productsList[Number(id)].content}</p>
        <p>{productsList[Number(id)].price} ₩</p>
      </>
    );
  } else {
    return (
      <>
        <h1>ERROR</h1>
      </>
    );
  }
}

export default DetailsProductsInfo;