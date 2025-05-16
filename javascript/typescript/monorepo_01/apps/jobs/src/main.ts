import { fetchAndExtractIframeSrc } from './html-util';
import { readXlsxFile, processSheet } from './xlsx-utils';

/**
 * Main function to handle CLI arguments and call relevant functions.
 */
async function main() {
  const args = process.argv.slice(2); // Get CLI arguments
  console.log({ args });
  if (args.length < 1) {
    console.error('Usage: node main.js <command> [options]');
    console.error('Commands:');
    console.error(
      '  read-xlsx <fileName> - Reads an XLSX file and prints its data.'
    );
    console.error(
      '  process-sheet <fileName> <sheetName> - Processes a specific sheet.'
    );
    process.exit(1);
  }

  const command = args[0];
  switch (command) {
    case 'read-xlsx': {
      const fileName = args[1];
      if (!fileName) {
        console.error('Error: Missing fileName argument.');
        process.exit(1);
      }
      try {
        const data = readXlsxFile(fileName);
        console.log('Data from XLSX file:', data);
      } catch (error) {
        console.error('Error reading XLSX file:', error.message);
      }
      break;
    }
    case 'process-sheet': {
      const fileName = args[1];
      const sheetName = args[2];
      if (!fileName || !sheetName) {
        console.error('Error: Missing fileName or sheetName argument.');
        process.exit(1);
      }
      processSheet(fileName, sheetName);
      break;
    }
    case 'sebi-pdf-download': {
      const url = args[1];
      const savePdfPath = args[2];
      console.log({ url, savePdfPath });
      const pdfUrl = await fetchAndExtractIframeSrc(url, savePdfPath);
      console.log(pdfUrl);
      break;
    }
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Usage: node main.js <command> [options]');
      process.exit(1);
  }
}

// Call the main function
main();
