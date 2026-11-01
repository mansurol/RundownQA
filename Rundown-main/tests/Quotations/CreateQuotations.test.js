import { test, expect } from "@playwright/test";
import Login from "../../pages/Auth/Login";
import Quotation from "../../pages/Quotations/CreateQuotations";
require("dotenv").config();

test("CreateQuotations", async ({ page }) => {
  const quotations = new Quotation(page);
  const login = new Login(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  //Navigate to Quotations page
  await quotations.goto();
  await quotations.CreateQuotations();
  await quotations.NewQuotationForm(
    process.env.CompanyName,
    process.env.dayCompleteInput,
    process.env.GroupTitle,
    process.env.TitleName,
    process.env.ItemNitPrice,
    process.env.itemQuantity,
    process.env.TitleNameTwo,
    process.env.ItemNitPriceTwo,
    process.env.itemQuantityTwo,
    process.env.Agencyfee,
    process.env.Discount,
    process.env.Vat,
  );
  await quotations.QuotationSent();
  await quotations.ApproveQuotation(process.env.ProjectName);
});
