import { test, expect } from "@playwright/test";

import Login from "../../pages/Auth/Login";
import Logout from "../../pages/Auth/LogOut";
require("dotenv").config();

test("Logout", async ({ page }) => {
  const login = new Login(page);
  const logout = new Logout(page);

  await page.goto(process.env.Url);
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.Password);

  await login.clickSignInButton();
  await logout.logout();
});
