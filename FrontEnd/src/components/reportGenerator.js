import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";

const getMonth = (month) =>{
    switch(month){
        case 1: return "January"
        case 2: return "February"
        case 3: return "March"
        case 4: return "April"
        case 5: return "May"
        case 6: return "June"
        case 7: return "July"
        case 8: return "August"
        case 9: return "September"
        case 10: return "October"
        case 11: return "November"
        case 12: return "December"
        default: return null
    }
}

const generatePDF = (payments,isType) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [isType ? "Type" : "Month", "No. of Payments", "Amount"];
  // define an empty array of rows
  const tableRows = [];

  // for each payment pass all its data into an array
  payments.forEach(payment => {
    const paymentData = [
      isType ? payment.yearType.type : getMonth(payment.yearMonth.month),
      payment.count,
      `Rs. ${payment.totalAmount * 180}`,
    ];
    // push each payments's info into a row
    tableRows.push(paymentData);
  });
  tableRows.push(["Total","",`Rs. ${payments.reduce((total,e) => total + e.totalAmount * 180 * 1,0)}`])


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 40 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // title. and margin-top + margin-left
  {isType ? doc.text("Package / Tour Payment History", 30, 30) 
   :
   doc.text("Monthly Payment History", 30, 30);}
  // we define the name of our PDF file.
  {isType ? doc.save(`report_Package_Tour_Payment_History__${dateStr}.pdf`) : doc.save(`report_Monthly_Payment_History__${dateStr}.pdf`)}
};

export default generatePDF;