import xss from "xss";

// Fungsi untuk sanitasi
export function sanitizeHTML(input: string): string {
  return xss(input, {
    whiteList: {
      p: [],
      b: [],
      i: [],
      strong: [],
      em: [],
      ul: [],
      ol: [],
      li: [],
      br: [],
    },
    css: false,
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script", "style", "iframe", "object", "embed"],
  });
}
