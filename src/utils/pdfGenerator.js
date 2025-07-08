// src/utils/pdfGenerator.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- BRAND CONFIGURATION ---
const BRAND = {
  name: 'CourseFinder',
  tagline: 'Your Gateway to Knowledge',
  website: 'www.coursefinder.ac.ke',
};

// --- LOGO (Base64) ---
const LOGO_BASE64 = '';

/**
 * Generate a course PDF result document.
 * @param {string} studentName - The student's name.
 * @param {Array} courseResults - Array of course objects { courseName, university, code }.
 */
export const generateCoursePDF = (studentName, courseResults = []) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // --- Header Styling ---
  const marginLeft = 15;
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- Logo ---
  if (LOGO_BASE64) {
    doc.addImage(LOGO_BASE64, 'JPEG', marginLeft, 10, 30, 30);
  }

  // --- Brand Title & Info ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(BRAND.name, marginLeft + 35, 18);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(BRAND.tagline, marginLeft + 35, 25);
  doc.text(BRAND.website, marginLeft + 35, 32);

  // --- Line Divider ---
  doc.setDrawColor(200);
  doc.line(marginLeft, 42, pageWidth - marginLeft, 42);

  // --- Student Info ---
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Student Name:`, marginLeft, 52);
  doc.setFont('helvetica', 'normal');
  doc.text(studentName, marginLeft + 35, 52);

  // --- Report Title ---
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommended Courses', marginLeft, 65);

  // --- Course Table ---
  const tableBody = courseResults.map((item, index) => [
    index + 1,
    item.courseName,
    item.university,
    item.code,
  ]);

  autoTable(doc, {
    startY: 70,
    head: [['#', 'Course Name', 'University', 'Code']],
    body: tableBody,
    theme: 'striped',
    headStyles: { fillColor: [22, 160, 133] },
    styles: { fontSize: 10, cellPadding: 3 },
    margin: { left: marginLeft, right: marginLeft },
  });

  // --- Footer ---
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, marginLeft, pageHeight - 10);
  doc.text(`© ${new Date().getFullYear()} ${BRAND.name}`, pageWidth - 60, pageHeight - 10);

  // --- Save PDF ---
  doc.save(`CourseFinder_Recommendations.pdf`);
};
