import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="login-form-box">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

        <div className="input-group">
          <Mail className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
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
