/**
 * A simple markdown parser. Takes in a markdown string and converts it to HTML
 */

const headerRegex = /^#{1,6}\s+/;
const listItemRegex = /^-\s+/;

function toListItem(markdown) {
  const result = markdown.match(listItemRegex);
  return null;
}
function toHtml(markdown) {
  // Check if the text starts with "# "
  const ary = markdown.split('\n');
  const result = ary.map((line) => {
    let lineValue = line;
    if (headerRegex.test(line)) {
      const splitAry = line.split(headerRegex);
      console.log(splitAry);
      lineValue = `<${getTag(line)}>${splitAry[1]}</${getTag(line)}>`;
    }
    return lineValue;
  });
  return result.join('\n');
}

function getPoundLength(line) {
  return line.match(headerRegex)[0].trim().length;
}

function getTag(line) {
  return `h${getPoundLength(line)}`;
}

module.exports = { toHtml };
