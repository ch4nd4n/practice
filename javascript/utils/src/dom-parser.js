const { JSDOM } = require("jsdom");
const fs = require("fs");

const inputFile = process.argv[2] || "./data/aditya.html";
const html = fs.readFileSync(inputFile, "utf-8");

const dom = new JSDOM(html);
const document = dom.window.document;

const links = Array.from(document.querySelectorAll("a")).map((a) =>
  `https://mutualfund.adityabirlacapital.com${a.getAttribute("href")}`
);

module.exports = links;
