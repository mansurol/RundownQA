import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import RolesCreate from "../../pages/Roles/RolesCreate";

require("dotenv").config();

test("UpdateRoles", async ({ page }) => {
  const rolesCreate = new RolesCreate(page);
  const login = new Login(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  //Navigate to rolesCreate page
  await rolesCreate.goto();

  await expect(page.getByText(process.env.roleName).first()).toBeVisible();
  await rolesCreate.updateRoles();
});
