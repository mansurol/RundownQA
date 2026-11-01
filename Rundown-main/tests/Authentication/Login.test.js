import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
require("dotenv").config();

test("Login with invalid password", async ({ page }) => {
  const login = new Login(page);

  await page.goto(process.env.Url);

  await login.fillEmail(process.env.Email);
  await login.fillPassword("WrongPassword123");

  await login.clickSignInButton();
  await expect(page.getByText("Invalid credentials")).toBeVisible();
});

test("Login with empty email", async ({ page }) => {
  const login = new Login(page);

  await page.goto(process.env.Url);

  await login.fillPassword(process.env.Password);

  await login.clickSignInButton();

  await expect(
    page.getByText("Please enter a valid email address"),
  ).toBeVisible();
});

test("Login with empty password", async ({ page }) => {
  const login = new Login(page);

  await page.goto(process.env.Url);

  await login.fillEmail(process.env.Email);

  await login.clickSignInButton();

  await expect(
    page.getByText("Password must be at least 6 characters"),
  ).toBeVisible();
});

test("Login with non-co.design email", async ({ page }) => {
  const login = new Login(page);

  await page.goto(process.env.Url);

  await login.fillEmail("test@gmail.com");

  await login.fillPassword(process.env.Password);

  await login.clickSignInButton();

  await expect(
    page.getByText("Email must be a co.design address"),
  ).toBeVisible();
});

test("Login", async ({ page }) => {
  const login = new Login(page);

  await page.goto(process.env.Url);
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.Password);
  await login.clickSignInButton();
});
