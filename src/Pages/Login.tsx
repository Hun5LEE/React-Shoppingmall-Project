import React from "react";
import "../ComponentsCss/Login.css";

function Login() {
  return (
    <div className="login_bg">
      <div className="login_wrapper">
        <h3 style={{ margin: "2rem 0" }}>로그인</h3>
        <div className="login_input email">
          <input type="text" placeholder="Email" />
        </div>
        <div className="login_input password">
          <input type="text" placeholder="PassWord" />
        </div>
        <div className="login_button">
          <button>LOGIN</button>
        </div>
        <div style={{ marginBottom: "1rem" }}>Sign Up</div>
      </div>
    </div>
  );
}

export default Login;
