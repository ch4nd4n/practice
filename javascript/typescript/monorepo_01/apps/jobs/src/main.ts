import * as fs from 'fs';
import * as XLSX from 'xlsx';

/**
 * Reads an XLSX file and returns the data from all sheets.
 * @param fileName - The name of the XLSX file to read.
 * @returns An object where each key is the sheet name and the value is the sheet data.
 */
function readXlsxFile(fileName: string): Record<string, any[]> {
  if (!fs.existsSync(fileName)) {
    throw new Error(`File not found: ${fileName}`);
  }

  // Read the file
  const workbook = XLSX.readFile(fileName);

  // Extract data from all sheets
  const sheetsData: Record<string, any[]> = {};
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    sheetsData[sheetName] = XLSX.utils.sheet_to_json(sheet);
  });

  return sheetsData;
}

// Example usage
const fileName =
  '/Users/chandan/Downloads/all-schemes-monthly-portfolio---as-on-28th-february-2023.xlsx'; // Replace with your file path
try {
  const data = readXlsxFile(fileName);
  //   console.log('Data from XLSX file:', data);
  // open a specific sheet
  const sheetData = data['SMEEF'];
  // iterate over the data rows 1 to 10

  sheetData.forEach((row, index) => {
    // console.log(row);
    // iterate over the columns
    const startIndex = 0;
    const endIndex = 15;
    if (index >= startIndex && index < endIndex) {
      console.log({ row });
      console.log(row[`__EMPTY_2`]);
      console.log(row[`__EMPTY_3`]);

      //   console.log({ index });
      //   Object.keys(row).forEach((key, colIdx) => {
      //     const val = row[key];
      //     console.log({ key, colIdx, val });
      //     if (val == 'SCHEME NAME :') {
      //       console.log(row[0], row[1], row[2]);
      //       console.log('SCHEME NAME :', row[colIdx]);
      //       console.log('SCHEME NAME :', row[colIdx + 1]);
      //     }
      //   });
    }
  });
} catch (error) {
  console.error('Error reading XLSX file:', error.message);
}
