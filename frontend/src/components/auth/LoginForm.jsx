import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import axiosInstance from "../../lib/axios.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", formData);
      navigate("/dashboard");
      toast.success("تم تسجيل الدخول بنجاح!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول"
      );

      console.log(error);
    }

    console.log(formData);
  };

  return (
    <div className="login-form-box">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

        <div className="input-group">
          <User className="icon" />
          <input
            name="username"
            placeholder="User name"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <Lock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <span className="toggle-icon" onClick={togglePassword}>
            {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button type="submit" className="submit-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
