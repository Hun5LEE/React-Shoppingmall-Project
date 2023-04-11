import "../ComponentsCss/Cart.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkedList, RootState } from "../Store/store";
import {
  addCount,
  minusCount,
  onCheck,
  offCheck,
  allOnCheck,
  allOffCheck,
  deleteProduct,
  deleteCheckList,
} from "../Store/store";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Data } from "../App";

function Cart() {
  const [clickColor, setClickColor] = useState("");
  const [count, setCount] = useState(0);
  //
  const state = useSelector((state: RootState) => state.cart);
  const checkedState = useSelector((state: RootState) => state.cartCheckedList);
  const dispatch = useDispatch();
  //

  return (
    <div className="cart_wrapper">
      <div>
        <table className="cart_table">
          <thead>
            <tr style={{ fontSize: "0.9rem" }}>
              <th style={{ width: "150px" }}>
                <button
                  className="allCheck_btn"
                  onClick={() => {
                    // 버튼 누른횟수에따라 체크 선택, 해제
                    setCount(count + 1);
                    if (count % 2 === 0) {
                      dispatch(allOnCheck());
                      setClickColor("showClickColor");
                    } else if (count % 2 === 1) {
                      dispatch(allOffCheck());
                    }
                  }}
                >
                  전체선택
                </button>
              </th>
              <th style={{ width: "750px" }}>
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
            {state.map((item: Data, i: number) => {
              return (
                <tr key={i}>
                  <td style={{ textAlign: "center" }}>
                    <div>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={`cart_table_checked ${
                          checkedState[i].switch === true ? clickColor : ""
                        }`}
                        onClick={() => {
                          if (checkedState[i].switch === false) {
                            dispatch(onCheck(i));
                            setClickColor("showClickColor");
                          } else if (checkedState[i].switch === true) {
                            dispatch(offCheck(i));
                          }
                        }}
                      />
                    </div>
                  </td>
                  <td className="cart_table_productsInfo_wrapper">
                    <div className="cart_table_productsInfo_img">
                      <img src={state[i].img} alt="" />
                    </div>
                    <div className="cart_table_productsInfo">
                      <div className="cart_table_productsInfo_name">
                        {state[i].title}
                      </div>
                      <div className="cart_table_productsInfo_remain">
                        <p>
                          매진임박 ({state[i].stocks}
                          )개
                        </p>
                        <p>4/11(화) 도착예정</p>
                      </div>
                      <div className="cart_table_productsInfo_count">
                        <button
                          onClick={() => {
                            dispatch(minusCount(state[i].id));
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{ margin: "0 0.7rem", fontSize: "0.9rem" }}
                        >
                          {" "}
                          {state[i].count}{" "}
                        </span>
                        <button onClick={() => dispatch(addCount(state[i].id))}>
                          +
                        </button>
                      </div>
                    </div>
                    {/* 장바구니 삭제기능 */}
                    <div
                      className="delete_button"
                      onClick={() => {
                        if (window.confirm("삭제하시겠습니까?")) {
                          dispatch(deleteProduct(i));
                          dispatch(deleteCheckList(i));
                        }
                      }}
                    >
                      X
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}> {state[i].price} ₩</td>
                  <td style={{ borderRight: "none", textAlign: "center" }}>
                    무료
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="cart_order">주문하기</div>
    </div>
  );
}

export default Cart;

// useDispatch -> store로 요청보내주는 함수 dispatch(state변경함수())이런식으로 사용
