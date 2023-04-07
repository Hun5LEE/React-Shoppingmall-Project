import React from "react";
import "../ComponentsCss/Cart.css";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";

function Cart() {
  const state = useSelector((state: RootState) => state.cart);
  console.log(state);

  return (
    <div className="cart_wrapper">
      <div>
        <table className="cart_table">
          <thead>
            <tr>
              <th style={{ width: "150px" }}>전체선택</th>
              <th style={{ width: "750px" }}>상품정보</th>
              <th style={{ width: "200px" }}>가격</th>
              <th style={{ width: "100px" }}>배송비</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item, i) => {
              return (
                <tr key={i}>
                  <td>전체선택</td>
                  <td className="cart_table_productsInfo_wrapper">
                    <div className="cart_table_productsInfo_img">이미지</div>
                    <div className="cart_table_productsInfo">
                      <div>{state[i].name}</div>
                      <div>
                        매진임박 (수량)개
                        <br />
                        4/11(화) 도착예정
                      </div>
                      <div>
                        <button>-</button>수량<button>+</button>
                      </div>
                    </div>
                  </td>
                  <td>{state[i].count} 가격</td>
                  <td style={{ borderRight: "none" }}>배송비</td>
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
