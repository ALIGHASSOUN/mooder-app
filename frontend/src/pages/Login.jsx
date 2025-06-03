import LoginForm from "../components/auth/LoginForm";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
