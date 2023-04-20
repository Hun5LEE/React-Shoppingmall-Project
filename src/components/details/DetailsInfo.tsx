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
