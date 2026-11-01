import { test } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import CreateNewProject from "../../pages/Project/CreateNewProject";

require("dotenv").config();

test("CreateProject", async ({ page }) => {
  const login = new Login(page);
  const createNewProject = new CreateNewProject(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  await createNewProject.goto();
  await createNewProject.createNewProject();
  await createNewProject.NewProjectForm(
    process.env.ProjectName,
    process.env.EProjectBrief,
    process.env.CompanyName,
  );
});
