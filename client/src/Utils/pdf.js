// src/Utils/pdf.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (employees, periodFrom, periodTo, grandTotalSalary, grandTotalTax, institution = "Your Institution Name") => {
    if (!periodFrom || !periodTo) {
        alert('Please select both From and To dates.');
        return;
    }

    const doc = new jsPDF();
    const fromDate = periodFrom.toLocaleString('default', { month: 'long', year: 'numeric' });
    const toDate = periodTo.toLocaleString('default', { month: 'long', year: 'numeric' });

    doc.setFontSize(18);
    doc.text(`${institution} - Professional Tax Report`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Period: ${fromDate} to ${toDate}`, 14, 30);

    const tableData = employees.map(emp => [
        emp.name,
        emp.designation,
        emp.grossSalary || '0',
        emp.additionalSalary || '0',
        emp.total || '0',
        emp.tax || '0'
    ]);
    doc.autoTable({
        startY: 40,
        head: [['Name', 'Designation', 'Gross Salary', 'Additional Salary', 'Total', 'Tax']],
        body: tableData,
        theme: 'striped',
        styles: { fontSize: 10 },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Grand Total Salary: ${grandTotalSalary}`, 14, finalY);
    doc.text(`Grand Total Tax: ${grandTotalTax}`, 14, finalY + 10);

    doc.save(`ProfTax_${fromDate}_to_${toDate}.pdf`);
};