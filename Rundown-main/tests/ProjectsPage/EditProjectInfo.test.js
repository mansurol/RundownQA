import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import EdtProjects from "../../pages/Project/EditProjectInfo";
require("dotenv").config();

test("EProject", async ({ page }) => {
  const EditProject = new EdtProjects(page);
  const login = new Login(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  //Navigate to Projects page
  await EditProject.goto();
  await EditProject.ProjectEdit(process.env.ProjectName);
});
