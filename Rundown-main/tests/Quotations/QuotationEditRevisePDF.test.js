import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import QuotationEdit from "../../pages/Quotations/QuotationEditRevisePDF";
require("dotenv").config();

test("EditQuotations", async ({ page }) => {
  const quotationsEdit = new QuotationEdit(page);
  const login = new Login(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  //Navigate to Quotations page
  await quotationsEdit.goto();
  await quotationsEdit.editQuotationForm(process.env.ProjectName);
  await quotationsEdit.DownloadPDF();
});
