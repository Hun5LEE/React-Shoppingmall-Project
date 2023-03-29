import React from "react";
import "../ComponentsCss/Header.css";
function Header() {
  return (
    <div className="header">
      <div className="header_logo">
        <h2>Logo</h2>
      </div>
      <div className="header_search">
        <input type="text" />
      </div>
      <div className="header_menu">Nav</div>
    </div>
  );
}

export default Header;
