import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import RolesCreate from "../../pages/Roles/RolesCreate";
import NewUserCreate from "../../pages/User/NewUserCreate";
import Logout from "../../pages/Auth/LogOut";
import NewUserLogin from "../../pages/Auth/NewUserLogin";

require("dotenv").config();

async function snap(page, testInfo, name) {
  await testInfo.attach(name, {
    body: await page.screenshot(),
    contentType: "image/png",
  });
}

test("CreateRoles, Create User, New User Login", async ({ page }, testInfo) => {
  const login = new Login(page);
  const rolesCreate = new RolesCreate(page);
  const userCreate = new NewUserCreate(page);
  const logout = new Logout(page);
  const newLogin = new NewUserLogin(page);

  const stamp = Date.now();
  const roleName = `Admin ${stamp}`;
  const userName = `Mansur ${stamp}`;
  const userMail = `mansurol${stamp}@co.design`;
  const userPass = process.env.pass;

  await test.step("1. Admin logs in", async () => {
    await page.goto(process.env.Url);
    await login.fillEmail(process.env.Email);
    await login.fillPassword(process.env.password);
    await login.clickSignInButton();
  });

  await test.step("2. Create new role", async () => {
    await rolesCreate.goto();
    await rolesCreate.CreateRolesButton();
    await rolesCreate.CreateRoles(roleName);
    await expect(page.getByText(roleName).first()).toBeVisible();
    await snap(page, testInfo, "Role created");
  });

  await test.step("3. Create new user with that role", async () => {
    await userCreate.goto();
    await userCreate.CreateUserButton();
    await userCreate.CreateUser(
      userName,
      userMail,
      userPass,
      userPass,
      roleName,
    );
    await expect(
      page.getByRole("heading", { level: 1, name: userName }),
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Email/ })).toHaveValue(
      userMail,
    );
    await expect(
      page.getByRole("checkbox", { name: new RegExp(roleName) }),
    ).toBeChecked();
    await snap(page, testInfo, "User created");
  });

  await test.step("4. Admin logs out", async () => {
    await logout.logout();
    await expect(page).toHaveURL(/login/);
  });

  await test.step("5. New user logs in", async () => {
    await newLogin.fillmail(userMail);
    await newLogin.fillPass(userPass);
    await newLogin.clickSignInButton();
    await expect(
      page.getByRole("link", { name: "Dashboard" }).first(),
    ).toBeVisible();
    await snap(page, testInfo, "New user dashboard");
  });
});
