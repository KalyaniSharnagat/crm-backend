const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const EXCEL_FILE = 'contacts.xlsx';

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  let workbook;
  let worksheet;

  // If file doesn't exist, create a new one
  if (!fs.existsSync(EXCEL_FILE)) {
    workbook = new ExcelJS.Workbook();
    worksheet = workbook.addWorksheet('Contacts');
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Message', key: 'message', width: 50 },
      { header: 'Date', key: 'date', width: 20 },
    ];
  } else {
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE);
    worksheet = workbook.getWorksheet('Contacts');
  }

  worksheet.addRow({
    name,
    email,
    message,
    date: new Date().toLocaleString(),
  });

  await workbook.xlsx.writeFile(EXCEL_FILE);

  res.json({ success: true, message: 'Contact saved to Excel!' });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
}); 