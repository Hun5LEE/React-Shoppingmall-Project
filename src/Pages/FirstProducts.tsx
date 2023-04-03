import React from "react";
import "../ComponentsCss/FirstProducts.css";
import data from "../Data/Data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShoesProducts() {
  const [shoes, setShoes] = useState(data);
  const navigate = useNavigate();
  return (
    <div className="product_wrapper">
      {data.map((shoe, i) => {
        return (
          <div className="product" key={i}>
            <img
              src={process.env.PUBLIC_URL + `./Img/shoes/shoes${i + 1}.jpg`}
              alt=""
              onClick={() => navigate("/products1/details")}
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

export default ShoesProducts;
