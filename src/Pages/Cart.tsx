import React from "react";
import "../ComponentsCss/Cart.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { addCount, minusCount, checkedSwitch } from "../Store/store";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Data } from "../App";

function Cart() {
  const [clickColor, setClickColor] = useState("");
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
                <span>전체선택</span>
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
                    <div
                      onClick={() => {
                        dispatch(checkedSwitch(state[i].id));
                        // setClickColor("showClickColor");
                        setTimeout(() => {
                          console.log(checkedState);
                        }, 500);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={`cart_table_checked `}
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
