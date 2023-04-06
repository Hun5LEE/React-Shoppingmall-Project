import React from "react";
import "../ComponentsCss/Details.css";
import DetailsTab from "../Components/DetailsTab";
import DetailsProductsInfo from "../Components/DetailsProductsInfo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Data } from "../App";

interface DetailsProps {
  productsData: Data[];
}

function Details({ productsData }: DetailsProps): JSX.Element {
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
      <DetailsTab />
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
          <DetailsProductsInfo productsData={productsData} id={id} />
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
    </>
  );
}

export default Details;
