import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Regster";
import AdminDashboard from "./pages/AdminDashboard";
import ProductsPage from "./pages/ProductsPage";
import ProductForm from "./pages/ProductForm";
import StockPage from "./pages/StockPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/regster" element={<Register />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        <Route path="/branch/stock" element={<StockPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
};

export default App;
