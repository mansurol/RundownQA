import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import EditClients from "../../pages/clients/EditClients";
require("dotenv").config();

test("EditClient", async ({ page }) => {
  const EditClient = new EditClients(page);
  const login = new Login(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  //Navigate to Clients page
  await EditClient.goto();
  await EditClient.ClientEdit(process.env.CompanyName);
  await EditClient.updateClient(
    process.env.EAddress,
    process.env.EBIN,
    process.env.EContactPersonName,
  );
});
