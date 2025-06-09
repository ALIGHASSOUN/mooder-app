import jsPDF from "jspdf";
import "jspdf-autotable";

const exportToPDF = (reportData) => {
  const doc = new jsPDF();
  const tableColumn = [
    "الفرع",
    "المنتج",
    "المرسل",
    "المباع",
    "المرتجع",
    "المتبقي",
    "الإجمالي",
  ];

  const tableRows = reportData.map((item) => [
    item.branchName,
    item.productName,
    item.sentQuantity,
    item.sold,
    item.returned,
    item.remaining,
    item.totalRevenue.toFixed(2),
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  });

  doc.save(`تقرير_يومي.pdf`);
};

export default exportToPDF;
