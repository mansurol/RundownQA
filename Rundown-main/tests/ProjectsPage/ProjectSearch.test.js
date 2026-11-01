import { test } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import Project from "../../pages/Project/ProjectSearch";

require("dotenv").config();

test("ProjectSearch", async ({ page }) => {
  const login = new Login(page);
  const project = new Project(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  //Navigate to Project page
  await project.goto();
  await project.createProjects(process.env.ProjectName);
});
