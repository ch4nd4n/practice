# What is this?

Trying out 11ty. This is a simple playground.

## Notes

Started off with 

```bash
npm init -y
npm install --save-dev @11ty/eleventy
echo "# yello world" > test.md # Adapt this to your OS. Like on windows.
echo "Some more content" >> test.md
echo "## Subheading sorts of H2"  >> test.md
echo "" >> test.md
echo "- list item" >> test.md
npx @11ty/eleventy # This scans folders for relevant files and converts it to HTML in _site
```

Next up open the generated content in browser.

```bash
open _site/test/index.html
```

Add following to `package.json`
