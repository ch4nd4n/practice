import { parse } from 'node-html-parser';

export function extractIframeSrc(html: string): string | null {
  const root = parse(html);
  const iframe = root.querySelector('iframe');
  return iframe ? iframe.getAttribute('src') : null;
}
