import { parse } from 'node-html-parser';
import fs from 'fs';
// import fetch from 'node-fetch';

/**
 * Extracts the src attribute of an iframe from the given HTML and cleans up the path.
 * Removes any prefix like '../../../web/?file=' and returns only the HTTP path.
 * If savePdfPath is provided, downloads the content of the src and saves it to the specified file.
 * @param html - The HTML string to parse.
 * @param savePdfPath - The file path to save the content of the src.
 * @returns The cleaned src attribute of the iframe, or null if not found.
 */
export async function extractIframeSrc(
  html: string,
  savePdfPath?: string
): Promise<string | null> {
  const root = parse(html);
  const iframe = root.querySelector('iframe');
  if (!iframe) {
    return null;
  }

  let src = iframe.getAttribute('src');
  if (src && src.startsWith('../../../web/?file=')) {
    src = src.replace('../../../web/?file=', '');
  }

  if (src && src.startsWith('http')) {
    if (savePdfPath) {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch content from src: ${response.status} ${response.statusText}`
          );
        }

        const arrayBuffer = await response.arrayBuffer(); // Get as ArrayBuffer
        const content = Buffer.from(arrayBuffer); // Convert to Buffer
        fs.writeFileSync(savePdfPath, content); // Save the content to the file
        console.log(`Content from iframe src saved to ${savePdfPath}`);
      } catch (error) {
        console.error(
          `Failed to save content from iframe src to ${savePdfPath}: ${error.message}`
        );
      }
    }
    return src;
  }

  return null;
}

/**
 * Fetches HTML from a URL and extracts the iframe src attribute.
 * If savePdfPath is provided, downloads the content of the src and saves it to the specified file.
 * @param url - The URL to fetch the HTML from.
 * @param savePdfPath - The file path to save the content of the iframe src.
 * @returns The cleaned src attribute of the iframe, or null if not found.
 */
export async function fetchAndExtractIframeSrc(
  url: string,
  savePdfPath?: string
): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch URL: ${response.status} ${response.statusText}`
      );
    }

    const html = await response.text();
    await fs.promises
      .writeFile('last_run.log', html)
      .catch((err) => console.error('Failed to write audit log:', err));
    return extractIframeSrc(html, savePdfPath);
  } catch (error) {
    console.error(`Error fetching or processing HTML: ${error.message}`);
    return null;
  }
}
