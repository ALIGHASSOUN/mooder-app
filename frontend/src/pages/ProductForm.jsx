import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios.js";
import "../styles/ProductForm.css";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setName(res.data.name);
        setPrice(res.data.price);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("فشل في جلب بيانات المنتج.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || price === "") {
      setError("يرجى ملء جميع الحقول.");
      return;
    }
    try {
      const payload = { name: name.trim(), price: parseFloat(price) };
      if (id) {
        await axiosInstance.put(`/products/${id}`, payload);
      } else {
        await axiosInstance.post("/products", payload);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to save product:", err);
      setError("فشل في حفظ المنتج.");
    }
  };

  if (loading) {
    return <p className="loading-text">جاري التحميل...</p>;
  }

  return (
    <div className="product-form-page">
      <h2 className="form-title">{id ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>اسم المنتج:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>السعر (ر.س):</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          {id ? "تحديث" : "حفظ"}
        </button>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => navigate("/admin/products")}
        >
          إلغاء
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
