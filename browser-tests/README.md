# Browser Tests for chandankumar.com

Automated browser tests using Playwright to verify critical user journeys on chandankumar.com.

## Overview

This test suite automates the following user flows:
1. **Homepage loads** - Verifies page title, headings, and navigation links
2. **Blog navigation** - Clicks "Read all posts" and verifies blog page loads
3. **Blog post opening** - Opens the first blog post and verifies content
4. **Comments section** - Checks that comments section exists and is ready for interaction

## Setup

### Prerequisites
- Node.js 16+
- pnpm 8.0+ or npm 8+

### Installation

**With pnpm (recommended):**
```bash
# Install dependencies
pnpm install

# Install Playwright browsers (one-time setup)
pnpm exec playwright install chromium
```

**With npm:**
```bash
# Install dependencies
npm install

# Install Playwright browsers (one-time setup)
npx playwright install chromium
```

## Running Tests

### Run all tests
```bash
# With pnpm
pnpm test

# With npm
npm test
```

### Run in UI mode (interactive)
```bash
# With pnpm
pnpm test:ui

# With npm
npm run test:ui
```

### Run in debug mode
```bash
# With pnpm
pnpm test:debug

# With npm
npm run test:debug
```

### Run specific test file
```bash
# With pnpm
pnpm test tests/chandankumar.spec.js

# With npm
npm test -- tests/chandankumar.spec.js
```

## Test Cases

### 1. Homepage Loads Correctly
- **File**: `tests/chandankumar.spec.js`
- **Verifies**:
  - Page title is "Chandan Kumar"
  - "Latest Posts" heading is visible
  - "Read all posts" link exists

### 2. Read All Posts Navigation
- **Verifies**:
  - Clicking "Read all posts" navigates to `/blog`
  - "Blog" heading is visible on the blog page

### 3. First Blog Post Opens
- **Verifies**:
  - Clicking first post navigates to `/blog/migrating-cockroachdb-to-postgresql`
  - Post title "Migrating Data from CockroachDB to PostgreSQL" is visible
  - Publication date "10 December, 2024" is visible

### 4. Comments Section
- **Verifies**:
  - Comments section heading is visible after scrolling to bottom
  - "Add Comment" button is visible
  - No existing comments are present on the post

## Configuration

### Playwright Config (`playwright.config.js`)
- **Base URL**: https://www.chandankumar.com
- **Browser**: Chromium (headless)
- **Test Directory**: `tests/`
- **Reporter**: HTML report (generated in `playwright-report/`)

## Test Reports

After running tests, view the HTML report:
```bash
# With pnpm
pnpm exec playwright show-report

# With npm
npx playwright show-report
```

## Troubleshooting

### Tests fail with timeout
- Increase timeout in `playwright.config.js` if the website is slow
- Check your network connection

### Browser not found
```bash
# With pnpm
pnpm exec playwright install chromium

# With npm
npx playwright install chromium
```

### Selector not found
- The website layout may have changed
- Update selectors in `tests/chandankumar.spec.js` to match current DOM

## Best Practices

- Keep selectors simple and maintainable
- Use semantic HTML selectors where possible (e.g., text content instead of classes)
- Add explicit waits only when necessary
- Run tests regularly to catch regressions early

## Learn More

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test Guide](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
