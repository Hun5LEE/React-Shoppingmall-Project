import React from "react";
import "../ComponentsCss/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
function Header() {
  return (
    <div className="header">
      <ListIcon className="header_left_menu" sx={{ fontSize: 40 }} />
      <div className="header_center">
        <div className="header_logo">
          <img src={process.env.PUBLIC_URL + "./Img/logo2.png"} alt="" />
        </div>
        <div className="header_search">
          <input type="text" />
          <SearchIcon />
        </div>
        <div className="header_rank_product">1 - 애플워치 7</div>
      </div>
      <div className="header_right_user">
        <AccountCircleIcon
          className="header_right_account"
          sx={{ fontSize: 32 }}
        />
        <ShoppingCartIcon sx={{ fontSize: 32 }} />
      </div>
    </div>
  );
}

export default Header;
