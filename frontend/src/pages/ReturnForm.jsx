import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "./ReturnForm.css";

const ReturnForm = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantityReturned, setQuantityReturned] = useState(1);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/returns", {
        productId,
        quantityReturned: parseInt(quantityReturned),
        reason,
      });
      setMessage(res.data.message || "Return submitted successfully.");
    } catch (error) {
      console.error("Error submitting return", error);
      setMessage(
        "Error: " +
          (error.response?.data?.message || "Failed to submit return.")
      );
    }
  };

  return (
    <div className="return-form-container">
      <h2>Return Product</h2>
      {message && <p className="return-message">{message}</p>}
      <form onSubmit={handleSubmit} className="return-form">
        <label>
          Product:
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity Returned:
          <input
            type="number"
            min="1"
            value={quantityReturned}
            onChange={(e) => setQuantityReturned(e.target.value)}
            required
          />
        </label>
        <label>
          Reason:
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Optional reason for return"
          />
        </label>
        <button type="submit">Submit Return</button>
      </form>
    </div>
  );
};

export default ReturnForm;
