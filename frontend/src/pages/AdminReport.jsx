import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminReport.css";
import exportToPDF from "../lib/exportToPDF";

const AdminReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get("/api/dashboard/daily", {
          withCredentials: true,
        });
        setReportData(res.data);
      } catch (err) {
        setError("حدث خطأ أثناء جلب التقرير.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <p className="loading">جارٍ تحميل التقرير...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="report-container">
      <h2 className="report-title">التقرير اليومي للفروع</h2>
      <div className="table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>الفرع</th>
              <th>المنتج</th>
              <th>المرسل</th>
              <th>المباع</th>
              <th>المرتجع</th>
              <th>المتبقي</th>
              <th>الإجمالي (ر.س)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.branchName}</td>
                <td>{item.productName}</td>
                <td>{item.sentQuantity}</td>
                <td>{item.sold}</td>
                <td>{item.returned}</td>
                <td>{item.remaining}</td>
                <td>{item.totalRevenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReport;
