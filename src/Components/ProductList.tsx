import React from "react";
import "../ComponentsCss/ProductList.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ProductList(): JSX.Element {
  // Scroll의 위치값에의해 변경되는 UI
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const handleScrollArr = [ref, secondRef, null];
  useEffect(() => {
    const handleScroll = () => {
      const { current } = ref;
      if (!current) return;
      // if (!current) return; 이코드는 scroll 이벤트가 발생하지 않았을때, handleScroll함수를 실행시키지 못하게하여 에러를 막는다.
      const height = window.scrollY;
      const y = (-1 / 490) * height + 115 / 49;
      const z = (-1 / 4900) * height + 556 / 490;

      current.style.opacity = y.toString();
      current.style.transform = `scale(${z})`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { current } = secondRef;
      if (!current) return;
      // if (!current) return; 이코드는 scroll 이벤트가 발생하지 않았을때, handleScroll함수를 실행시키지 못하게하여 에러를 막는다.
      const height = window.scrollY;
      const secondY = (-1 / 485) * height + 327 / 97;
      const secondZ = (-1 / 4850) * height + 120 / 97;
      current.style.opacity = secondY.toString();
      current.style.transform = `scale(${secondZ})`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //
  return (
    <div className="product_list_wrapper">
      {/* <div ref={ref} className="product_list">
        <img src={process.env.PUBLIC_URL + "./Img/card1.png"} alt="" />
      </div>
      <div ref={secondRef} className="product_list">
        <img src={process.env.PUBLIC_URL + "./Img/card2.png"} alt="" />
      </div>
      <div className="product_list">
        <img src={process.env.PUBLIC_URL + "./Img/card3.png"} alt="" />
      </div> */}
      {handleScrollArr.map((item, i) => {
        return (
          <div ref={item} className="product_list" key={i}>
            <img
              onClick={() => navigate(`/products${i + 1}`)}
              src={process.env.PUBLIC_URL + `./Img/card${i + 1}.png`}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
