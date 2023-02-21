const { toHtml } = require('../src/markdown-parser');

test('markdown parser should render h1', () => {
  expect(toHtml('# Hello')).toBe('<h1>Hello</h1>');
});

test('markdown parser should render h2', () => {
  expect(toHtml('## Hello')).toBe('<h2>Hello</h2>');
});

test('markdown parser should render h3', () => {
  expect(toHtml('### Hello')).toBe('<h3>Hello</h3>');
});

test('markdown parser should render h4', () => {
  expect(toHtml('#### Hello')).toBe('<h4>Hello</h4>');
});

test('markdown parser should render h5', () => {
  expect(toHtml('##### Hello')).toBe('<h5>Hello</h5>');
});

test('markdown parser should render h6', () => {
  expect(toHtml('###### Hello')).toBe('<h6>Hello</h6>');
});

test('markdown parser should render multiline', () => {
  expect(toHtml('# Hello \n## world')).toBe('<h1>Hello </h1>\n<h2>world</h2>');
});
