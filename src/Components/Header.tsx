import React from "react";
import "../ComponentsCss/Header.css";
import {
  faArrowRightToBracket,
  faMagnifyingGlass,
  faBagShopping,
  faUser,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavigateFunction } from "react-router-dom";

interface HeaderProps {
  navigate: NavigateFunction;
}

function Header({ navigate }: HeaderProps): JSX.Element {
  return (
    <div className="header">
      <div className="header_firstRow">
        <div className="header_logo">
          <img
            onClick={() => navigate("/")}
            src={process.env.PUBLIC_URL + "./Img/stussy.jpg"}
            alt=""
          />
        </div>
        <div className="header_account_wrapper">
          <div>
            <FontAwesomeIcon icon={faUser} size="xl" />
            <span> My Page </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faBagShopping} size="xl" />
            <span> Shopping Bag </span>
          </div>
          <div>
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
