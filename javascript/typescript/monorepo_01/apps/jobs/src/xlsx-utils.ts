import * as fs from 'fs';
import * as XLSX from 'xlsx';

/**
 * Reads an XLSX file and returns the data from all sheets.
 * @param fileName - The name of the XLSX file to read.
 * @returns An object where each key is the sheet name and the value is the sheet data.
 */
export function readXlsxFile(fileName: string): Record<string, any[]> {
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

/**
 * Processes a specific sheet from the XLSX file.
 * @param fileName - The XLSX file name.
 * @param sheetName - The name of the sheet to process.
 */
export function processSheet(fileName: string, sheetName: string): void {
  try {
    const data = readXlsxFile(fileName);
    const sheetData = data[sheetName];
    if (!sheetData) {
      console.error(`Sheet "${sheetName}" not found in the file.`);
      return;
    }

    // Iterate over the first 10 rows
    sheetData.forEach((row, index) => {
      if (index < 10) {
        console.log({ row });
      }
    });
  } catch (error) {
    console.error('Error processing sheet:', error.message);
  }
}
