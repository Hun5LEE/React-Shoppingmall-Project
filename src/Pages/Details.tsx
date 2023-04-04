import React from "react";
import "../ComponentsCss/Details.css";
import { useParams } from "react-router-dom";
import { Data } from "../App";

interface DetailsProps {
  productsData: Data[];
}

function Details({ productsData }: DetailsProps): JSX.Element {
  // useParams는 현재 url에 입력한 숫자를 남겨줌. ( string 타입으로 받아옴 )
  const { id } = useParams<{ id: string | undefined }>();

  return (
    <div className="container_wrapper">
      <div className="container">
        <img
          src={process.env.PUBLIC_URL + `/Img/shoes/shoes${Number(id) + 1}.jpg`}
          alt=""
        />
      </div>
      <div className="product_detail">
        <h3>{productsData[Number(id)].title}</h3>
        <p>{productsData[Number(id)].content}</p>
        <p>{productsData[Number(id)].price} ₩</p>
        <button>주문하기</button>
      </div>
    </div>
  );
}
export default Details;
