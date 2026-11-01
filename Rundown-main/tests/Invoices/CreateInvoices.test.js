import { test } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import Invoice from "../../pages/Invoices/CreateInvoices";

require("dotenv").config();

test("Invoices", async ({ page }) => {
  const login = new Login(page);
  const invoice = new Invoice(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  await invoice.goto();
  await invoice.CreateInvoiceButton();
  await invoice.NewInvoice(process.env.ProjectName);
  await invoice.SumitInvoice();
  await invoice.DownloadPDF();
});
