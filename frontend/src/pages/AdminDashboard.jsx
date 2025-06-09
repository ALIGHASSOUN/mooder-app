import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css"; // تأكد من ربط ملف CSS

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate("/admin/report");
  };

  return (
    <div className="dashboard-container">
      {/* القسم الأيسر */}
      <div className="dashboard-left">
        <div className="report-card" onClick={handleReportClick}>
          <div className="line header-line"></div>
          <div className="line"></div>
          <div className="line short"></div>
          <div className="line medium"></div>
          <div className="line short"></div>
          <div className="line"></div>
          <div className="line medium"></div>
          <div className="line footer-line"></div>
          <p className="report-text">عرض التقرير اليومي</p>
        </div>
      </div>

      {/* القسم الأيمن (فارغ حاليًا) */}
      <div className="dashboard-right">
        <p className="placeholder-text">👈 اختر عرض التقرير من اليسار</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
