import "./DetailsBtn.css";
import { Product } from "../../pages/products";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface DetailsBtnProps {
  data: Product;
}

function DetailsBtn({ data: product }: DetailsBtnProps): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(product);

  return (
    <div className="details_button">
      <button
        onClick={() => {
          dispatch(addProduct(product));
          navigate("/cart");
        }}
      >
        결제하기
      </button>
      <button
        onClick={() => {
          dispatch(addProduct(product));
        }}
      >
        장바구니 추가
      </button>
    </div>
  );
}

export default DetailsBtn;

// server 이용한 카트추가
// const handleCart = () => {
// axios
//   .post("http://localhost:4000/cart", {
//     ...product,
//   })
//   .then((res) => {
//     console.log(res);
//   });
// };
