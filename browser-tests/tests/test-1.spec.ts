import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.chandankumar.com/");
  await expect(
    page.getByRole("link", { name: "Chandan Kumar - Back to home" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Activate Dark Mode" }),
  ).toBeVisible();
  await expect(page.getByText("TwitterInstagram")).toBeVisible();
  await expect(page.getByText("Yo! Personal blog by Chandan")).toBeVisible();
  await expect(page.getByText("Copyleft. WTHTheme by LekoArts")).toBeVisible();
});
