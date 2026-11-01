import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import NewUserCreate from "../../pages/User/NewUserCreate";
require("dotenv").config();

test("UpdateUsers", async ({ page }) => {
  const userCreate = new NewUserCreate(page);
  const login = new Login(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  //Navigate to userCreate page
  await userCreate.goto();
  await userCreate.userEdit(process.env.userMail);
});
