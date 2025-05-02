import { extractIframeSrc } from './html-util';

describe('extractIframeSrc', () => {
  it('should return the src attribute of the iframe if it exists', () => {
    const html =
      '<html><body><iframe src="https://example.com"></iframe></body></html>';
    const result = extractIframeSrc(html);
    expect(result).toBe('https://example.com');
  });

  it('should return null if there is no iframe in the HTML', () => {
    const html = '<html><body><div>No iframe here</div></body></html>';
    const result = extractIframeSrc(html);
    expect(result).toBeNull();
  });

  it('should return null if the iframe does not have a src attribute', () => {
    const html = '<html><body><iframe></iframe></body></html>';
    const result = extractIframeSrc(html);
    expect(result).toBeFalsy();
  });

  it('should handle empty HTML string and return null', () => {
    const html = '';
    const result = extractIframeSrc(html);
    expect(result).toBeNull();
  });

  it('should handle malformed HTML and still return the correct src', () => {
    const html = '<html><body><iframe src="https://example.com"></iframe>';
    const result = extractIframeSrc(html);
    expect(result).toBe('https://example.com');
  });
});
