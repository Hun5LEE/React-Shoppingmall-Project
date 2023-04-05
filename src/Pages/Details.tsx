import React from "react";
import "../ComponentsCss/Details.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Data } from "../App";

interface DetailsProps {
  productsData: Data[];
  products: Data[];
}

function Details({ productsData, products }: DetailsProps): JSX.Element {
  // useParams는 현재 url에 입력한 숫자를 남겨줌. ( string 타입으로 받아옴 )
  const { id } = useParams<{ id: string | undefined }>();
  // useState
  const [visible, setVisible] = useState("");
  const [text, setText] = useState("");
  // useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible("visible");
    }, 100);
    return () => {
      // 서버데이터 요청상황에서 기존데이터요청 제거할때도 cleanup function 사용
      // 기존 타머 제거해주기.
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {Number(id) <= 3 ? (
        <div className={`container_wrapper ${visible}`}>
          <div className="container">
            <img
              src={
                process.env.PUBLIC_URL + `/Img/shoes/shoes${Number(id) + 1}.jpg`
              }
              alt=""
            />
          </div>
          <div className="product_detail">
            {/* <h3>{productsData[Number(id)].title}</h3>
            <p>{productsData[Number(id)].content}</p>
            <p>{productsData[Number(id)].price} ₩</p> */}
            <button>주문하기</button>
            <input
              value={text}
              placeholder="숫자를 입력하세요."
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  setText(e.target.value);
                } else {
                  alert("숫자를 입력하세요.");
                }
              }}
            />
          </div>
        </div>
      ) : (
        <div className={`container_wrapper ${visible}`}>
          <div className="container">
            <img
              src={
                process.env.PUBLIC_URL + `/Img/shoes/shoes${Number(id) + 1}.jpg`
              }
              alt=""
            />
          </div>
          <div className="product_detail">
            {/* <h3>{products[Number(id) - 3].title}</h3>
            <p>{products[Number(id) - 3].content}</p>
            <p>{products[Number(id) - 3].price} ₩</p> */}
            <button>주문하기</button>
            <input
              value={text}
              placeholder="숫자를 입력하세요."
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  setText(e.target.value);
                } else {
                  alert("숫자를 입력하세요.");
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default Details;
