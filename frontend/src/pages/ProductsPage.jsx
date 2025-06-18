import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios.js";
import { Cell } from "jspdf-autotable";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Failed to fetch products: ", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("هل انت متأكد من")) return;
    try {
      await axiosInstance.delete(`products/${id}`);
    } catch (err) {
      console.error("Failed to delete product: ", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <h2>ادارة المنتجات</h2>
      <button onClick={() => navigate("/admin/product/new")}>
        ➕ منتج جديد
      </button>

      <table products-table>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>السعر</th>
            <th>اجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>
                <button
                  onClick={() => navigate(`/admin/products/edit/${prod._id}`)}
                >
                  ✏️ تعديل
                </button>{" "}
                <button onClick={deleteProduct(prod.id)}>🗑 حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProductsPage;
