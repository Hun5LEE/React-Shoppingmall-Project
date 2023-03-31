import React from "react";
import "../ComponentsCss/ProductList.css";
import { useState, useEffect, useRef } from "react";

function ProductList(): JSX.Element {
  // useScroll Hook
  // const [scrollY, setScrollY] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };
  //   window.addEventListener("scroll", handleScroll).
  //   return () => {
  //     // mount하기 전에 삭제 (렌더링 할때마다 새로운 이벤트핸들러가 등록되므로)
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrollY]);
  //
  // 불필요한 렌더링을 피하기위해 useRef이용

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const { current } = ref;
      if (!current) return;

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

  return (
    <div className="product_list_wrapper">
      <div ref={ref} className="product_list">
        <img src={process.env.PUBLIC_URL + "./Img/card1.png"} alt="" />
      </div>
      <div className="product_list">
        <img src={process.env.PUBLIC_URL + "./Img/card2.png"} alt="" />
      </div>
      <div className="product_list">
        <img src={process.env.PUBLIC_URL + "./Img/card3.png"} alt="" />
      </div>
    </div>
  );
}

export default ProductList;
