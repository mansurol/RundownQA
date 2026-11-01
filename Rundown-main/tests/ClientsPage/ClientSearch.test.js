import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import Clients from "../../pages/clients/Clients";
import ClientsSearchFilter from "../../pages/clients/ClientsSearchFilter";
require("dotenv").config();

test("ClientsASearch", async ({ page }) => {
  const clients = new Clients(page);
  const login = new Login(page);
  const clientsSearch = new ClientsSearchFilter(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  await clients.goto();
  await clientsSearch.searchClient(process.env.CompanyName);
  await clientsSearch.filterClient();
});
