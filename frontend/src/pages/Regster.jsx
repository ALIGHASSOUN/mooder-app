import RegisterForm from "../components/auth/RegisterForm.jsx";
import "../styles/register.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Login;
