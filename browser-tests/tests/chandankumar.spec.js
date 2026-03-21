import { test, expect } from '@playwright/test';

test.describe('chandankumar.com', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');

    // Assert page title
    await expect(page).toHaveTitle('Chandan Kumar');

    // Assert "Latest Posts" heading is visible
    await expect(page.locator('h2:has-text("Latest Posts")')).toBeVisible();

    // Assert "Read all posts" link exists
    const readAllPostsLink = page.locator('a:has-text("Read all posts")');
    await expect(readAllPostsLink).toBeVisible();
  });

  test('"Read all posts" navigates to blog', async ({ page }) => {
    await page.goto('/');

    // Click "Read all posts"
    const readAllPostsLink = page.locator('a:has-text("Read all posts")');
    await readAllPostsLink.click();

    // Assert URL becomes /blog
    await expect(page).toHaveURL(/\/blog$/);

    // Assert "Blog" heading is visible
    await expect(page.locator('h1:has-text("Blog")')).toBeVisible();
  });

  test('first blog post opens correctly', async ({ page }) => {
    await page.goto('/blog');

    // Click first post link
    const firstPostLink = page.locator('a:has-text("Migrating Data from CockroachDB to PostgreSQL")').first();
    await firstPostLink.click();

    // Assert URL contains the expected path
    await expect(page).toHaveURL(/\/blog\/migrating-cockroachdb-to-postgresql/);

    // Assert post title is visible
    await expect(page.locator('h1:has-text("Migrating Data from CockroachDB to PostgreSQL")')).toBeVisible();

    // Assert date "10 December, 2024" is visible
    await expect(page.locator('text=10 December, 2024')).toBeVisible();
  });

  test('comments section exists with no comments', async ({ page }) => {
    await page.goto('/blog/migrating-cockroachdb-to-postgresql');

    // Scroll to bottom of post
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Assert "Comments" heading is visible
    await expect(page.locator('h2:has-text("Comments"), h3:has-text("Comments")')).toBeVisible();

    // Assert "Add Comment" button is visible
    const addCommentButton = page.locator('button:has-text("Add Comment"), a:has-text("Add Comment")');
    await expect(addCommentButton).toBeVisible();

    // Assert no existing comment entries are present
    const comments = page.locator('[data-testid="comment"], .comment, .comments-list > div');
    const commentCount = await comments.count();
    expect(commentCount).toBe(0);
  });
});
