// src/utils/pdfGenerator.js (Improved)
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- 1. BRAND, FONT & THEME DEFINITIONS ---

const BRAND = {
  name: 'CourseFinder',
  tagline: 'Your Gateway to Knowledge',
};

const FONTS = {
  title: 'PlayfairDisplay',
  body: 'Lato',
  bodyBold: 'Lato-Bold',
};

const THEME = {
  PRIMARY_COLOR: '#004D40', // Deep Teal
  ACCENT_COLOR: '#FFC107',  // Gold/Amber
  TEXT_COLOR: '#212121',     // Dark Gray (almost black)
  LIGHT_TEXT_COLOR: '#757575',// Medium Gray
  TABLE_HEADER_BG: '#004D40',// Deep Teal
  TABLE_HEADER_TEXT: '#FFFFFF',// White
  ROW_HIGHLIGHT_COLOR: '#E0F2F1', // Very light teal
  ALTERNATE_ROW_COLOR: '#FAFAFA',// Off-white
  LINE_COLOR: '#B2DFDB',     // Light Teal
};

/**
 * [ACTION REQUIRED]
 * Registers custom fonts with jsPDF. The Base64 strings are placeholders.
 * @param {jsPDF} doc The jsPDF instance.
 */
const registerCustomFonts = (doc) => {
  // --- PASTE YOUR BASE64 FONT STRINGS HERE ---
  const latoRegularBase64 = 'PASTE_YOUR_LATO_REGULAR_BASE64_STRING_HERE';
  const latoBoldBase64 = 'PASTE_YOUR_LATO_BOLD_BASE64_STRING_HERE';
  const playfairDisplayRegularBase64 = 'PASTE_YOUR_PLAYFAIR_DISPLAY_BASE64_STRING_HERE';

  if (latoRegularBase64.startsWith('PASTE_YOUR')) {
    console.warn("Custom fonts not configured. Using fallback Helvetica.");
    FONTS.title = 'helvetica';
    FONTS.body = 'helvetica';
    FONTS.bodyBold = 'helvetica';
  } else {
    doc.addFileToVFS('Lato-Regular.ttf', latoRegularBase64);
    doc.addFileToVFS('Lato-Bold.ttf', latoBoldBase64);
    doc.addFileToVFS('PlayfairDisplay-Regular.ttf', playfairDisplayRegularBase64);
    doc.addFont('Lato-Regular.ttf', FONTS.body, 'normal');
    doc.addFont('Lato-Bold.ttf', FONTS.bodyBold, 'normal');
    doc.addFont('PlayfairDisplay-Regular.ttf', FONTS.title, 'normal');
  }
};

/**
 * Draws a custom, vector-based logo inspired by the Gemini brand.
 * @param {jsPDF} doc - The jsPDF instance.
 * @param {number} x - The x-coordinate for the logo's center.
 * @param {number} y - The y-coordinate for the logo's center.
 * @param {number} size - The overall size of the logo.
 */
const drawGeminiLogo = (doc, x, y, size) => {
  doc.setDrawColor(THEME.ACCENT_COLOR);
  doc.setLineWidth(0.5);

  // Draw a stylized four-pointed star (gem shape)
  const half = size / 2;
  const quarter = size / 4;
  
  // Outer points
  const p1 = [x, y - half]; // Top
  const p2 = [x + half, y]; // Right
  const p3 = [x, y + half]; // Bottom
  const p4 = [x - half, y]; // Left
  
  // Inner points
  const p5 = [x, y - quarter];
  const p6 = [x + quarter, y];
  const p7 = [x, y + quarter];
  const p8 = [x - quarter, y];

  doc.line(p1[0], p1[1], p6[0], p6[1]);
  doc.line(p6[0], p6[1], p2[0], p2[1]);
  doc.line(p2[0], p2[1], p7[0], p7[1]);
  doc.line(p7[0], p7[1], p3[0], p3[1]);
  doc.line(p3[0], p3[1], p8[0], p8[1]);
  doc.line(p8[0], p8[1], p4[0], p4[1]);
  doc.line(p4[0], p4[1], p5[0], p5[1]);
  doc.line(p5[0], p5[1], p1[0], p1[1]);
};

/**
 * Draws the header for each page.
 * @param {jsPDF} doc - The jsPDF instance.
 * @param {object} data - The autoTable data object.
 */
const drawPageHeader = (doc, data) => {
  const { width: pageWidth } = doc.internal.pageSize;
  const kenyaDate = new Date().toLocaleDateString('en-KE', { timeZone: 'Africa/Nairobi' });
  
  // Draw the logo on every page
  drawGeminiLogo(doc, pageWidth - 25, 20, 12);

  if (data.pageNumber === 1) {
    // --- Main Header (First Page Only) ---
    doc.setFont(FONTS.title, 'normal');
    doc.setFontSize(26);
    doc.setTextColor(THEME.PRIMARY_COLOR);
    doc.text('Matched Course Results', 14, 22);

    doc.setFont(FONTS.body);
    doc.setFontSize(11);
    doc.setTextColor(THEME.LIGHT_TEXT_COLOR);
    doc.text(`Prepared for you by ${BRAND.name} on ${kenyaDate}`, 14, 30);

    doc.setDrawColor(THEME.ACCENT_COLOR);
    doc.setLineWidth(0.8);
    doc.line(14, 38, pageWidth - 14, 38); // Accent line
  } else {
    // --- Compact Header (Subsequent Pages) ---
    doc.setFont(FONTS.bodyBold);
    doc.setFontSize(10);
    doc.setTextColor(THEME.PRIMARY_COLOR);
    doc.text('Matched Course Results', 14, 22);
  }
};

/**
 * Draws the footer for each page.
 * @param {jsPDF} doc - The jsPDF instance.
 * @param {object} data - The autoTable data object.
 */
const drawPageFooter = (doc, data) => {
  const { width: pageWidth, height: pageHeight } = doc.internal.pageSize;
  const totalPages = doc.internal.getNumberOfPages();
  
  doc.setFont(FONTS.body);
  doc.setFontSize(9);
  doc.setTextColor(THEME.LIGHT_TEXT_COLOR);
  
  const footerText = `${BRAND.name} • Page ${data.pageNumber} of ${totalPages}`;
  doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
};

/**
 * Generates a stylish, professionally formatted PDF of course results.
 * @param {Array<Object>} courses - The array of course data.
 */
export const generateCoursePDF = (courses) => {
  if (!courses || courses.length === 0) {
    console.warn('PDF generation was cancelled because no course data was provided.');
    return;
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  registerCustomFonts(doc);

  const head = [['Institution', 'Code', 'Cutoff Points']];
  const body = courses.flatMap(course => {
    const courseTitleRow = [{ content: course.course, colSpan: 3, isCourseTitle: true }];
    if (course.universities?.length > 0) {
      const universityRows = course.universities.map(uni => [uni.name, uni.course_code || 'N/A', uni.cutoff]);
      return [courseTitleRow, ...universityRows];
    }
    return [courseTitleRow, [{ content: 'No university information available.', colSpan: 3, styles: { fontStyle: 'italic', halign: 'center' }}]];
  });

  const dateISO = new Date().toISOString().split('T')[0];

  autoTable(doc, {
    startY: 45, // Start table below the header area
    head: head,
    body: body,
    theme: 'grid',
    styles: {
      font: FONTS.body,
      fontSize: 9,
      cellPadding: 2.5,
      textColor: THEME.TEXT_COLOR,
    },
    headStyles: {
      font: FONTS.bodyBold,
      fillColor: THEME.TABLE_HEADER_BG,
      textColor: THEME.TABLE_HEADER_TEXT,
      fontSize: 10,
      halign: 'center',
    },
    columnStyles: {
      2: { halign: 'center', cellWidth: 30 }
    },
    alternateRowStyles: {
      fillColor: THEME.ALTERNATE_ROW_COLOR,
    },
    didParseCell: (data) => {
      // Style the custom course title rows
      if (data.cell.raw.isCourseTitle) {
        data.cell.styles.fillColor = THEME.ROW_HIGHLIGHT_COLOR;
        data.cell.styles.textColor = THEME.PRIMARY_COLOR;
        data.cell.styles.font = FONTS.bodyBold;
        data.cell.styles.fontStyle = 'normal'; // Override italic for empty rows
        data.cell.styles.fontSize = 11;
        data.cell.styles.valign = 'middle';
      }
    },
    // Use the modular header/footer functions
    didDrawPage: (data) => {
      drawPageHeader(doc, data);
      drawPageFooter(doc, data);
    }
  });

  doc.save(`${BRAND.name}_Results_${dateISO}.pdf`);
};