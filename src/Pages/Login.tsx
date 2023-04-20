import { useNavigate } from "react-router-dom";
import LoginBox from "../components/login/LoginBox";
function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <LoginBox />
    </>
  );
}

export default LoginPage;
