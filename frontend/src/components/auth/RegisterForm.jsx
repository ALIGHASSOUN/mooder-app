import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import axiosInstance from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "admin", // default role
    branchName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword, role, branchName } = formData;

    if (password !== confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }

    if (role === "branch" && branchName.trim() === "") {
      toast.error("يرجى إدخال اسم الفرع");
      return;
    }

    try {
      await axiosInstance.post("/auth/register", {
        username,
        password,
        role,
        branchName: role === "branch" ? branchName : undefined,
      });

      toast.success("تم إنشاء الحساب بنجاح!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل إنشاء الحساب");
      console.log(error);
    }
  };

  return (
    <div className="login-form-box">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>

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
        </div>

        <div className="input-group">
          <Lock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span className="toggle-icon" onClick={togglePassword}>
            {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleChange}
            />
            Admin
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="branch"
              checked={formData.role === "branch"}
              onChange={handleChange}
            />
            Branch
          </label>
        </div>

        {formData.role === "branch" && (
          <div className="input-group">
            <input
              type="text"
              name="branchName"
              placeholder="Branch Name"
              required
              value={formData.branchName}
              onChange={handleChange}
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
