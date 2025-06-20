import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios.js";
import "../styles/StockPage.css";

const StockPage = () => {
  const [stockItems, setStockItems] = useState([]); // قائمة المخزون الحالية للفرع
  const [products, setProducts] = useState([]); // قائمة المنتجات للاختيار
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loadingStock, setLoadingStock] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // جلب المخزون الحالي للفرع
  const fetchStock = async () => {
    setLoadingStock(true);
    setError("");
    try {
      const res = await axiosInstance.get("/stock/my-stock");
      // res.data: مصفوفة من العناصر: كل عنصر يحتوي على { _id, branch, product: { _id, name, price }, quantity, ... }
      setStockItems(res.data);
    } catch (err) {
      console.error("Failed to fetch stock:", err);
      setError("فشل في جلب المخزون الحالي.");
    } finally {
      setLoadingStock(false);
    }
  };

  // جلب قائمة المنتجات للاختيار في التحديث
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      // لا نوقف الصفحة، لكن لا نظهر الاختيار إذا فشل
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchStock();
    fetchProducts();
  }, []);

  // معالجة إرسال نموذج تحديث المخزون
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!selectedProduct) {
      setError("يرجى اختيار المنتج.");
      return;
    }
    if (quantity === "" || isNaN(quantity)) {
      setError("يرجى إدخال كمية صحيحة.");
      return;
    }
    // يمكن أن تكون الكمية سالبة أو موجبة بناءً على احتياجك. هنا نفترض أن الكمية موجبة للإضافة.
    const qtyNumber = parseInt(quantity, 10);
    if (qtyNumber === 0) {
      setError("الكمية لا يمكن أن تكون صفر.");
      return;
    }
    try {
      const payload = {
        productId: selectedProduct,
        quantity: qtyNumber,
      };
      await axiosInstance.post("/stock/update", payload);
      setSuccessMsg("تم تحديث المخزون بنجاح.");
      // إعادة جلب المخزون مع مسافة صغيرة
      fetchStock();
      setSelectedProduct("");
      setQuantity("");
    } catch (err) {
      console.error("Failed to update stock:", err);
      // إذا استجابت API بخطأ:
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("فشل في تحديث المخزون.");
      }
    }
  };

  return (
    <div className="stock-page">
      <div className="header-row">
        <h2>المخزون الحالي</h2>
      </div>

      {/* عرض رسائل الخطأ أو النجاح */}
      {error && <p className="error-text">{error}</p>}
      {successMsg && <p className="success-text">{successMsg}</p>}

      {/* نموذج تحديث المخزون */}
      <div className="stock-form-container">
        <form onSubmit={handleUpdate} className="stock-form">
          <div className="form-group">
            <label>اختر المنتج:</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={loadingProducts || products.length === 0}
              required
            >
              <option value="">-- اختر --</option>
              {products.map((prod) => (
                <option key={prod._id} value={prod._id}>
                  {prod.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>الكمية (+ للإضافة، - للنقصان إذا مسموح):</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              تحديث المخزون
            </button>
            <button type="button" className="btn-refresh" onClick={fetchStock}>
              ↻ تحديث البيانات
            </button>
          </div>
        </form>
      </div>

      {/* عرض المخزون في جدول وبطاقات */}
      {loadingStock ? (
        <p className="loading-text">جاري جلب المخزون...</p>
      ) : (
        <>
          {/* جدول للشاشات الكبيرة */}
          <div className="table-wrapper">
            <table className="stock-table">
              <thead>
                <tr>
                  <th>اسم المنتج</th>
                  <th>السعر (ر.س)</th>
                  <th>الكمية الحالية</th>
                </tr>
              </thead>
              <tbody>
                {stockItems.length === 0 ? (
                  <tr>
                    <td colSpan="3">لا توجد بيانات مخزون.</td>
                  </tr>
                ) : (
                  stockItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.product?.name || "-"}</td>
                      <td>
                        {item.product?.price !== undefined
                          ? Number(item.product.price).toFixed(2)
                          : "-"}
                      </td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* بطاقات للشاشات الصغيرة */}
          <div className="stock-cards">
            {stockItems.length === 0 ? (
              <p className="no-data-text">لا توجد بيانات مخزون.</p>
            ) : (
              stockItems.map((item) => (
                <div className="stock-card" key={item._id}>
                  <div className="card-field">
                    <span className="card-label">المنتج:</span>
                    <span className="card-value">
                      {item.product?.name || "-"}
                    </span>
                  </div>
                  <div className="card-field">
                    <span className="card-label">السعر:</span>
                    <span className="card-value">
                      {item.product?.price !== undefined
                        ? Number(item.product.price).toFixed(2) + " ر.س"
                        : "-"}
                    </span>
                  </div>
                  <div className="card-field">
                    <span className="card-label">الكمية الحالية:</span>
                    <span className="card-value">{item.quantity}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StockPage;
