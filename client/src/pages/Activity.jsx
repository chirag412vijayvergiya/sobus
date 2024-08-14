import { useState } from 'react';
import * as XLSX from 'xlsx';
import Button from '../ui/Button';
import { useSaveExcel } from '../components/activities/useSaveExcel';

function Activity() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const { CreateExcel, isBooking } = useSaveExcel();

  // Use the hook

  // Handle file upload and parse Excel
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile); // Save the file to state
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setColumns(jsonData[0] || []);
      setData(jsonData.slice(1));
    };

    reader.readAsBinaryString(uploadedFile);
  };

  // Handle input change in the table
  const handleInputChange = (rowIndex, columnIndex, value) => {
    const newData = [...data];
    newData[rowIndex][columnIndex] = value;
    setData(newData);
  };

  // Handle save operation using react-query
  const handleSave = () => {
    if (!file) {
      alert('Please upload an Excel file before saving.');
      return;
    }

    CreateExcel({ file, columns, data }); // Call the mutation function
  };

  return (
    <div className="relative flex-1 bg-green-100 p-[8rem_1rem] dark:bg-slate-800 md:p-[8rem_6rem]">
      <input type="file" onChange={handleFileUpload} />
      {columns.length > 0 && (
        <table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex}>
                    <input
                      value={cell || ''}
                      onChange={(e) =>
                        handleInputChange(rowIndex, columnIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Button type="primary" onClick={handleSave} disabled={isBooking}>
        {isBooking ? 'Saving...' : 'Save'}
      </Button>
    </div>
  );
}

export default Activity;
