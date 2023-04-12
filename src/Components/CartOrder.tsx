import React from "react";
import "../ComponentsCss/CartOrder.css";

function CartOrder({ price }: { price: number }): JSX.Element {
  return (
    <div className="cart_order_wrapper">
      <div className="cart_order_info">
        <div>
          <h4>상품금액</h4>
          <h4>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</h4>
        </div>
        <div>
          <h4>배송비</h4>
          <h4>무료</h4>
        </div>
        <div>
          <h3>결제 예정금액</h3>
          <h3>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</h3>
        </div>
      </div>
      <div className="cart_order_total">
        <div>
          <h3>총 결제 예정 금액</h3>
          <h3>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</h3>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button>구매하기</button>
        </div>
      </div>
    </div>
  );
}

export default CartOrder;
