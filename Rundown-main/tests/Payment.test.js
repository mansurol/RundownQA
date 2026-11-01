import { test, expect } from "@playwright/test";
import Login from "../pages/Auth/Login";
import Payment from "../pages/Payments/Payment";
require("dotenv").config();

test("Payment", async ({ page }) => {
  const payment = new Payment(page);
  const login = new Login(page);

  await page.goto(process.env.Url);

  //Login
  await login.fillEmail(process.env.Email);
  await login.fillPassword(process.env.password);
  await login.clickSignInButton();

  await payment.goto();
  await payment.CreateInvoiceButton();
  await payment.NewPayment(process.env.ProjectName);
});
