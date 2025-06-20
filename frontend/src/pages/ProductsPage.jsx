import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios.js";
import "../styles/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف المنتج؟")) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <div className="header-row">
        <h2>إدارة المنتجات</h2>
        <button
          className="btn-add"
          onClick={() => navigate("/admin/products/new")}
        >
          ➕ منتج جديد
        </button>
      </div>

      {/* جدول للشاشات الكبيرة */}
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>السعر (ر.س)</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{Number(prod.price).toFixed(2)}</td>
                <td className="actions-cell">
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/admin/products/edit/${prod._id}`)}
                  >
                    ✏️ تعديل
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteProduct(prod._id)}
                  >
                    🗑 حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* بطاقات للشاشات الصغيرة */}
      <div className="product-cards">
        {products.map((prod) => (
          <div className="product-card" key={prod._id}>
            <div className="card-field">
              <span className="card-label">الاسم:</span>
              <span className="card-value">{prod.name}</span>
            </div>
            <div className="card-field">
              <span className="card-label">السعر:</span>
              <span className="card-value">
                {Number(prod.price).toFixed(2)} ر.س
              </span>
            </div>
            <div className="card-actions">
              <button
                className="btn-edit"
                onClick={() => navigate(`/admin/products/edit/${prod._id}`)}
              >
                ✏️
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteProduct(prod._id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
