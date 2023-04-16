import React from "react";
import "./Header.css";
import {
  faArrowRightToBracket,
  faMagnifyingGlass,
  faBagShopping,
  faUser,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigateFunction } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface HeaderProps {
  navigate: NavigateFunction;
}

function Header({ navigate }: HeaderProps): JSX.Element {
  const state = useSelector((state: RootState) => state.cart);

  return (
    <div className="header">
      <div className="header_firstRow">
        <div className="header_logo">
          <img
            onClick={() => navigate("/")}
            src={process.env.PUBLIC_URL + "/Img/logo.jpg"}
            alt=""
          />
        </div>
        <div className="header_account_wrapper">
          <div>
            <FontAwesomeIcon icon={faUser} size="xl" />
            <span> My Page </span>
          </div>
          <div onClick={() => navigate("/cart")}>
            <FontAwesomeIcon icon={faBagShopping} size="xl" />
            <span> Shopping Bag({state.length}) </span>
          </div>
          <div onClick={() => navigate("/Login")}>
            <FontAwesomeIcon icon={faArrowRightToBracket} size="xl" />
            <span> Login </span>
          </div>
        </div>
      </div>
      <div className="header_secondRow">
        신용카드 결제 시 최대 12개월 할부 적용 가능
      </div>
      <div className="header_thirdRow">
        <div style={{ marginLeft: "1rem" }}>
          <span>Watched</span>
          <FontAwesomeIcon icon={faEye} style={{ marginLeft: "0.3rem" }} />
        </div>
        <div style={{ marginRight: "1rem" }}>
          <input type="text" />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
    </div>
  );
}

export default Header;
