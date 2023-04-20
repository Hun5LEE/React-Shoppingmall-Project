import "./DetailsBtn.css";
import { Product } from "../../pages/products";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

interface DetailsBtnProps {
  data: Product;
}

function DetailsBtn({ data: product }: DetailsBtnProps): JSX.Element {
  const { categoryId, productId }: any = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState("");
  const [text, setText] = useState("장바구니를 상품에 담았습니다");
  //
  const handleCart = async () => {
    try {
      // categoryId 와 productId를 조합하여 cart에 넣을 상품의 id를 새로 만듬
      await axios.post("http://localhost:4000/cart", {
        ...product,
        id: Number(categoryId + productId),
      });
      // 장바구니에 담았던 상품 저장.
      if (sessionStorage.getItem("watched") !== null) {
        let watched = JSON.parse(sessionStorage.getItem("watched") as string);
        watched.push(product);
        sessionStorage.setItem("watched", JSON.stringify(watched));
      }
    } catch (err) {
      setText("이미 상품을 담았습니다.");
      console.log(err);
    }
  };

  return (
    <>
      <div className="details_button">
        <button
          onClick={() => {
            handleCart();
            navigate("/cart");
          }}
        >
          구매하기
        </button>
        <button
          onClick={() => {
            handleCart();
            setShow("show");
          }}
        >
          장바구니 추가
        </button>
      </div>
      <div className={`details_afterClick_bg ${show}`}>
        <div className="details_afterClick_box">
          <h2 className="details_afterClick_text">{text}</h2>
          <div className="details_afterClick_button">
            <button
              onClick={() => setShow("")}
              style={{ background: "#A4A9B0" }}
            >
              계속 쇼핑
            </button>
            <button onClick={() => navigate("/cart")}>장바구니로</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsBtn;

// server 이용한 카트추가
