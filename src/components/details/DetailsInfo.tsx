import React, { useEffect, useState } from "react";
import "./DetailsInfo.css";
import { Product } from "../../pages/products";
import DetailsBtn from "./DetailsBtn";
import DetailsTab from "./DetailsTab";

interface DetailsInfoProps {
  data: Product;
}

function DetailsInfo({ data: product }: DetailsInfoProps): JSX.Element {
  const { title, content, price, imgUrl } = product;
  const [visible, setVisible] = useState("");
  //
  useEffect(() => {
    setVisible("visible");
  }, []);

  return (
    <>
      <DetailsTab />
      <div className={`details_info_wrapper ${visible}`}>
        <div className="details_info">
          <img src={imgUrl} alt="" />
        </div>
        <div className="details_info">
          <h3>{title}</h3>
          <p>{content}</p>
          <p>
            {price && price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₩
          </p>
          <DetailsBtn data={product} />
        </div>
      </div>
    </>
  );
}

export default DetailsInfo;

// function Details({ productsData }: DetailsProps): JSX.Element {
//   // useParams는 현재 url에 입력한 숫자를 남겨줌. ( string 타입으로 받아옴 )
//   const { id } = useParams<{ id: string | undefined }>();
//   // useState
//   const [visible, setVisible] = useState("");
//   const [text, setText] = useState("");

//   // useEffect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisible("visible");
//     }, 100);
//     return () => {
//       // 서버데이터 요청상황에서 기존데이터요청 제거할때도 cleanup function 사용
//       // 기존 타머 제거해주기.
//       clearTimeout(timer);
//     };
//   }, []);

//   return (
//     <>
//       <DetailsTab />
//
//     </>
//   );
// }

// export default Details;
