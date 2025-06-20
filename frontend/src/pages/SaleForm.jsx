// SaleForm.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import "../styles/SaleForm.css";

const SaleForm = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantitySold, setQuantitySold] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setError("فشل في تحميل المنتجات.");
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!productId || isNaN(quantitySold) || quantitySold <= 0) {
      setError("يرجى تحديد منتج وكميّة صالحة.");
      return;
    }

    try {
      await axiosInstance.post("/sales", {
        productId,
        quantitySold: parseInt(quantitySold),
      });
      setMessage("تم تسجيل البيع بنجاح.");
      setProductId("");
      setQuantitySold(1);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "حدث خطأ أثناء تسجيل البيع.");
    }
  };

  return (
    <div className="sale-form-container">
      <h2>تسجيل عملية بيع</h2>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit} className="sale-form">
        <div className="form-group">
          <label>المنتج:</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">اختر منتجًا</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.price} ر.س
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>الكمية:</label>
          <input
            type="number"
            min="1"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          تسجيل البيع
        </button>
      </form>
    </div>
  );
};

export default SaleForm;
