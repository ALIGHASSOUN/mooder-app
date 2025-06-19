import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // إذا كان هناك id، نجلب بيانات المنتج للتعديل
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setName(res.data.name);
        setPrice(res.data.price);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, price };
      if (id) {
        await axiosInstance.put(`/products/${id}`, payload);
      } else {
        await axiosInstance.post("/products", payload);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to save product:", err);
      // يمكنك هنا عرض رسالة خطأ للمستخدم
    }
  };

  return (
    <div className="product-form-page">
      <h2>{id ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
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
        <button type="submit">{id ? "تحديث" : "حفظ"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
