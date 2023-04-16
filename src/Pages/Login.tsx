import React from "react";
import "../PagesCss/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login_wrapper">
      <div>
        <img
          onClick={() => navigate("/")}
          src={process.env.PUBLIC_URL + "/Img/logo.jpg"}
          alt=""
        />
      </div>
      <div className="login_info">
        <h3>로그인</h3>
        <div className="login_input email">
          <input type="text" placeholder="아이디" />
        </div>
        <div className="login_input password">
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className="login_button">
          <button>로그인</button>
        </div>
        <div className="login_findInfo_signUp">
          <div className="login_findInfo">
            <span>아이디찾기</span> | <span>비밀번호찾기</span>
          </div>
          <div className="login_sigUp">회원가입</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
