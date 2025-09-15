const links = require("./dom-parser.js");
const fs = require("fs");
const path = require("path");

const outputDir = process.argv[2] || "./data/files";

async function downloadFiles() {
  const fetch = (await import("node-fetch")).default;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const link of links) {
    try {
      const response = await fetch(link);
      if (!response.ok) {
        console.error(`Failed to download ${link}: ${response.statusText}`);
        continue;
      }
      const filename = path.basename(new URL(link).pathname);
      const filePath = path.join(outputDir, filename);
      const fileStream = fs.createWriteStream(filePath);
      await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on("error", reject);
        fileStream.on("finish", resolve);
      });
      console.log(`Downloaded ${filename} to ${outputDir}`);
    } catch (error) {
      console.error(`Error downloading ${link}: ${error.message}`);
    }
  }
}

downloadFiles();