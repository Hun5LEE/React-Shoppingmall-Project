import "./CartTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store/store";
import { Product } from "../../pages/products";
import {
  onCheck,
  offCheck,
  allOnCheck,
  allOffCheck,
  addCount,
  minusCount,
  deleteProduct,
  deleteCheckList,
} from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartOrder from "./CartOrder";
import axios from "axios";

function CartTable(): JSX.Element {
  const [clickColor, setClickColor] = useState("");
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.cart);
  const checkedState = useSelector((state: RootState) => state.cartCheckedList);
  //
  const handleCheck = (i: number) => {
    if (checkedState[i].switch === false) {
      dispatch(onCheck(i));
      setClickColor("showClickColor");
      setPrice(price + cartState[i].price * cartState[i].count);
    } else if (checkedState[i].switch === true) {
      dispatch(offCheck(i));
      if (price > 0) {
        setPrice(price - cartState[i].price * cartState[i].count);
      }
    }
  };
  const handleAllCheck = () => {
    // reduce 메소드 이용하여 총합계산
    const totalPrice = cartState.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    // 버튼 누른횟수에따라 체크 선택, 해제
    setCount(count + 1);
    if (count % 2 === 0) {
      setPrice(totalPrice);
      dispatch(allOnCheck());
      setClickColor("showClickColor");
    } else if (count % 2 === 1) {
      setPrice(0);
      dispatch(allOffCheck());
    }
  };
  const handleAddCount = (product: Product, i: number) => {
    dispatch(addCount(product.id));
    //   // check On 일때
    if (checkedState[i].switch === true) {
      if (cartState[i].count < cartState[i].stocks) {
        setPrice(price + cartState[i].price);
      }
    }
  };

  const handleMinusCount = (product: Product, i: number) => {
    dispatch(minusCount(product.id));
    //   // check On 일때
    if (checkedState[i].switch === true) {
      if (cartState[i].count > 1) {
        setPrice(price - cartState[i].price);
      }
    }
  };

  const handleDelete = async (id: number, i: number) => {
    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await axios.delete(`http://localhost:4000/cart/${id}`);
        dispatch(deleteProduct(id));
        dispatch(deleteCheckList(id));
        if (checkedState[i].switch === true) {
          setPrice(price - cartState[i].price * cartState[i].count);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cart_table_wrapper">
      <div>
        <table className="cart_table">
          <thead>
            <tr style={{ fontSize: "0.9rem" }}>
              <th style={{ width: "150px" }}>
                <button
                  className="allCheck_btn"
                  onClick={() => handleAllCheck()}
                >
                  전체선택
                </button>
              </th>
              <th style={{ width: "750pognx" }}>
                <span>상품정보</span>
              </th>
              <th style={{ width: "200px" }}>
                <span>가격</span>
              </th>
              <th style={{ width: "100px" }}>
                <span>배송비</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 클릭 -> 스테이트 변경 -> 해당아이템이 맞는지 검사 -> 맞으면 clickColor붙이지 */}
            {cartState.length === 0 ? (
              <tr>
                <th></th>
                <th className="cart_text">상품이 없습니다.</th>
              </tr>
            ) : (
              cartState.map((product: Product, i: number) => {
                return (
                  <tr key={i}>
                    <td style={{ textAlign: "center" }}>
                      <div>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={`cart_table_checked ${
                            checkedState[i].switch === true ? clickColor : ""
                          }`}
                          onClick={() => handleCheck(i)}
                        />
                      </div>
                    </td>
                    <td className="cart_table_productsInfo_wrapper">
                      <div className="cart_table_productsInfo_img">
                        <img src={cartState[i].imgUrl} alt="" />
                      </div>
                      <div className="cart_table_productsInfo">
                        <div className="cart_table_productsInfo_name">
                          {cartState[i].title}
                        </div>
                        <div className="cart_table_productsInfo_remain">
                          <p>
                            매진임박 ({cartState[i].stocks}
                            )개
                          </p>
                          <p>4/11(화) 도착예정</p>
                        </div>
                        <div className="cart_table_productsInfo_count">
                          <button onClick={() => handleMinusCount(product, i)}>
                            -
                          </button>
                          <span
                            style={{ margin: "0 0.7rem", fontSize: "0.9rem" }}
                          >
                            {" "}
                            {cartState[i].count}{" "}
                          </span>
                          <button onClick={() => handleAddCount(product, i)}>
                            +
                          </button>
                        </div>
                      </div>
                      {/* 장바구니 삭제기능 */}
                      <div
                        style={{ cursor: "pointer" }}
                        className="delete_button"
                        onClick={() => handleDelete(cartState[i].id, i)}
                      >
                        X
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {" "}
                      {/* 천단위 콤마넣기 */}
                      {cartState[i].price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      ₩
                    </td>
                    <td style={{ borderRight: "none", textAlign: "center" }}>
                      무료
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <CartOrder price={price} />
    </div>
  );
}

export default CartTable;
