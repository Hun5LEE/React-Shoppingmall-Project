import "./DetailsBtn.css";
import { Product } from "../../pages/products";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface DetailsBtnProps {
  data: Product;
}

function DetailsBtn({ data: product }: DetailsBtnProps): JSX.Element {
  const navigate = useNavigate();
  //
  const handleCart = async () => {
    try {
      await axios.post("http://localhost:4000/cart", { ...product });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="details_button">
      <button
        onClick={() => {
          handleCart();
          navigate("/cart");
        }}
      >
        결제하기
      </button>
      <button
        onClick={() => {
          handleCart();
        }}
      >
        장바구니 추가
      </button>
    </div>
  );
}

export default DetailsBtn;

// server 이용한 카트추가
