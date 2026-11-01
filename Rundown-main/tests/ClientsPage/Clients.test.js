import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import Clients from "../../pages/clients/Clients";

require("dotenv").config();

test("Clients", async ({ page }) => {
  const clients = new Clients(page);
  const login = new Login(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  await clients.goto();
  await clients.createClient(
    process.env.CompanyName,
    process.env.Address,
    process.env.TIN,
    process.env.BIN,
    process.env.ContactPersonName,
    process.env.ContactPersonDesignation,
    process.env.ContactPersonEmail,
    process.env.ContactPersonPhone,
  );
  await expect(page.getByText("Client added successfully")).toBeVisible();
});
